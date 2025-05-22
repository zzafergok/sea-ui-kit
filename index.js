#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const degit = require('degit')
const { program } = require('commander')

// Minimum Node.js sürüm kontrolü
const nodeVersion = process.versions.node
const [major] = nodeVersion.split('.')
if (parseInt(major, 10) < 16) {
  console.error(chalk.red('Hata: Node.js v16 veya daha üst sürüm gereklidir.'))
  process.exit(1)
}

// İstenmeyen hataları yakalamak için
process.on('unhandledRejection', (reason) => {
  console.error('İşlenmeyen rejection:', reason)
  process.exit(1)
})

// Next.js yapılandırma dosyası oluştur
const createNextConfig = (targetDir) => {
  const configContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = nextConfig;
`
  fs.writeFileSync(path.join(targetDir, 'next.config.js'), configContent)
  console.log(chalk.green('✅ next.config.js oluşturuldu'))
}

// Kurulum sonrası temizleme işlevi
const cleanupInstallationFiles = (projectDir) => {
  console.log(chalk.blue('Kurulum dosyaları temizleniyor...'))

  const targetDir = path.resolve(process.cwd(), projectDir)

  // Temizlenecek dosyalar ve klasörler
  const filesToRemove = ['index.js', '.git', 'template', 'LICENSE-cli', 'tsconfig.cjs.json', 'tsup.config.ts']

  // package.json düzenlemeleri
  const packageJsonPath = path.join(targetDir, 'package.json')

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    // Kütüphane alanlarını temizle
    delete packageJson.main
    delete packageJson.module
    delete packageJson.types
    delete packageJson.sideEffects
    delete packageJson.files
    delete packageJson.bin
    delete packageJson.repository
    delete packageJson.keywords
    delete packageJson.author

    // Next.js projesi olarak işaretle
    packageJson.private = true

    // Scripts güncelleme
    packageJson.scripts = {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'eslint "{**/*,*}.{js,ts,jsx,tsx}"',
      prettier: 'prettier --write "{src,tests}/**/*.{js,ts,jsx,tsx}"',
    }

    // PeerDependencies'leri dependencies'e taşı
    if (packageJson.peerDependencies) {
      if (!packageJson.dependencies) {
        packageJson.dependencies = {}
      }

      // Tüm peerDependencies'leri dependencies'e kopyala
      Object.assign(packageJson.dependencies, packageJson.peerDependencies)

      // peerDependencies'i sil
      delete packageJson.peerDependencies
    }

    // CLI'a özgü bağımlılıkları kaldır
    if (packageJson.dependencies) {
      delete packageJson.dependencies.chalk
      delete packageJson.dependencies.commander
      delete packageJson.dependencies.degit
      delete packageJson.dependencies.prompts
    }

    // Proje adını güzelleştir
    packageJson.name = projectDir.toLowerCase().replace(/\s+/g, '-')
    packageJson.version = '0.1.0'
    packageJson.description = 'Next.js project with Sea UI Kit'

    // Güncellenmiş package.json'ı kaydet
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    console.log(chalk.green('✅ package.json güncellendi'))
  } catch (error) {
    console.warn(chalk.yellow('package.json düzenlenemedi. Manuel olarak düzenlemeniz gerekebilir.'))
    console.error(error)
  }

  // Providers.tsx düzenle
  try {
    const providersPath = path.join(targetDir, 'src/providers/Providers.tsx')
    if (fs.existsSync(providersPath)) {
      let providersContent = fs.readFileSync(providersPath, 'utf8')
      providersContent = providersContent.replace(
        /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?}\s*,\s*\[\]\s*\)/,
        '// Sayfa yenileme mantığı kaldırıldı',
      )
      fs.writeFileSync(providersPath, providersContent)
      console.log(chalk.green('✅ Providers.tsx düzenlendi'))
    }
  } catch (error) {
    console.warn(chalk.yellow('Providers.tsx düzenlenemedi. Manuel olarak düzenlemeniz gerekebilir.'), error)
  }

  // Dosyaları temizle
  filesToRemove.forEach((file) => {
    const filePath = path.join(targetDir, file)

    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true })
        } else {
          fs.unlinkSync(filePath)
        }
      } catch (error) {
        console.warn(chalk.yellow(`'${file}' silinemedi. Manuel olarak silmeniz gerekebilir.`), error)
      }
    }
  })

  // Yeni yapılandırma dosyalarını oluştur
  createNextConfig(targetDir)

  console.log(chalk.green('✅ Kurulum dosyaları başarıyla temizlendi!'))
}

program
  .name('create-sea-ui-kit')
  .description('Create a Next.js project with Sea UI Kit')
  .argument('[project-directory]', 'The directory to create the project in')
  .action(async (projectDir) => {
    console.log(chalk.bold.blue('🌊 Sea UI Kit projesi oluşturuluyor...'))

    if (!projectDir) {
      projectDir = 'my-sea-ui-app'
      console.log(chalk.blue(`Proje dizini belirtilmedi. Varsayılan olarak "${projectDir}" kullanılıyor.`))
    }

    const targetDir = path.resolve(process.cwd(), projectDir)

    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
      console.log(chalk.yellow(`Uyarı: "${projectDir}" dizini zaten var ve boş değil. Dosyalar üzerine yazılabilir.`))
    }

    console.log(chalk.blue('Template indiriliyor...'))

    const emitter = degit('zzafergok/sea-ui-kit', {
      force: true,
      verbose: true,
    })

    try {
      await emitter.clone(targetDir)
      cleanupInstallationFiles(projectDir)

      console.log(chalk.green.bold('✅ Başarılı!'))
      console.log(chalk.green("Sea UI Kit template'i indirildi:"), chalk.cyan(targetDir))
      console.log('')
      console.log('Başlamak için:')
      console.log(chalk.cyan(`  cd ${projectDir}`))
      console.log(chalk.cyan('  npm install'))
      console.log(chalk.cyan('  npm run dev'))
      console.log('')
      console.log(chalk.blue('Keyifli kodlamalar! 🎉'))
    } catch (error) {
      console.error(chalk.red('Template indirme hatası:'))
      console.error(error)
      process.exit(1)
    }
  })

program.parse(process.argv)
