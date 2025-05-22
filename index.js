#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const degit = require('degit')
const { program } = require('commander')

// Chalk'ı dinamik import ile yükle
let chalk
;(async () => {
  try {
    chalk = (await import('chalk')).default
  } catch {
    // Fallback: chalk yoksa basit renkli çıktı
    chalk = {
      red: (text) => `\x1b[31m${text}\x1b[0m`,
      green: (text) => `\x1b[32m${text}\x1b[0m`,
      blue: (text) => `\x1b[34m${text}\x1b[0m`,
      yellow: (text) => `\x1b[33m${text}\x1b[0m`,
      cyan: (text) => `\x1b[36m${text}\x1b[0m`,
      bold: {
        blue: (text) => `\x1b[1m\x1b[34m${text}\x1b[0m`,
      },
    }
  }
})()

// Minimum Node.js sürüm kontrolü
const nodeVersion = process.versions.node
const [major] = nodeVersion.split('.')
if (parseInt(major, 10) < 16) {
  console.error('\x1b[31mHata: Node.js v16 veya daha üst sürüm gereklidir.\x1b[0m')
  process.exit(1)
}

// İstenmeyen hataları yakalamak için
process.on('unhandledRejection', (reason) => {
  console.error('İşlenmeyen rejection:', reason)
  process.exit(1)
})

// Güvenli chalk kullanımı için yardımcı fonksiyonlar
const safeChalk = {
  red: (text) => (chalk?.red ? chalk.red(text) : `\x1b[31m${text}\x1b[0m`),
  green: (text) => (chalk?.green ? chalk.green(text) : `\x1b[32m${text}\x1b[0m`),
  blue: (text) => (chalk?.blue ? chalk.blue(text) : `\x1b[34m${text}\x1b[0m`),
  yellow: (text) => (chalk?.yellow ? chalk.yellow(text) : `\x1b[33m${text}\x1b[0m`),
  cyan: (text) => (chalk?.cyan ? chalk.cyan(text) : `\x1b[36m${text}\x1b[0m`),
  boldBlue: (text) => (chalk?.bold?.blue ? chalk.bold.blue(text) : `\x1b[1m\x1b[34m${text}\x1b[0m`),
  greenBold: (text) => (chalk?.green?.bold ? chalk.green.bold(text) : `\x1b[1m\x1b[32m${text}\x1b[0m`),
}

// Next.js yapılandırma dosyası oluştur
const createNextConfig = (targetDir) => {
  const configContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = nextConfig;
`
  fs.writeFileSync(path.join(targetDir, 'next.config.js'), configContent)
  console.log(safeChalk.green('✅ next.config.js oluşturuldu'))
}

// Kurulum sonrası temizleme işlevi
const cleanupInstallationFiles = (projectDir) => {
  console.log(safeChalk.blue('Kurulum dosyaları temizleniyor...'))

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
    console.log(safeChalk.green('✅ package.json güncellendi'))
  } catch (error) {
    console.warn(safeChalk.yellow('package.json düzenlenemedi. Manuel olarak düzenlemeniz gerekebilir.'))
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
      console.log(safeChalk.green('✅ Providers.tsx düzenlendi'))
    }
  } catch (error) {
    console.warn(safeChalk.yellow('Providers.tsx düzenlenemedi. Manuel olarak düzenlemeniz gerekebilir.'), error)
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
        console.warn(safeChalk.yellow(`'${file}' silinemedi. Manuel olarak silmeniz gerekebilir.`), error)
      }
    }
  })

  // Yeni yapılandırma dosyalarını oluştur
  createNextConfig(targetDir)

  console.log(safeChalk.green('✅ Kurulum dosyaları başarıyla temizlendi!'))
}

// Ana program fonksiyonu
const createProject = async (projectDir) => {
  console.log(safeChalk.boldBlue('🌊 Sea UI Kit projesi oluşturuluyor...'))

  if (!projectDir) {
    projectDir = 'my-sea-ui-app'
    console.log(safeChalk.blue(`Proje dizini belirtilmedi. Varsayılan olarak "${projectDir}" kullanılıyor.`))
  }

  const targetDir = path.resolve(process.cwd(), projectDir)

  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.log(safeChalk.yellow(`Uyarı: "${projectDir}" dizini zaten var ve boş değil. Dosyalar üzerine yazılabilir.`))
  }

  console.log(safeChalk.blue('Template indiriliyor...'))

  const emitter = degit('zzafergok/sea-ui-kit', {
    force: true,
    verbose: true,
  })

  try {
    await emitter.clone(targetDir)
    cleanupInstallationFiles(projectDir)

    console.log(safeChalk.greenBold('✅ Başarılı!'))
    console.log(safeChalk.green("Sea UI Kit template'i indirildi:"), safeChalk.cyan(targetDir))
    console.log('')
    console.log('Başlamak için:')
    console.log(safeChalk.cyan(`  cd ${projectDir}`))
    console.log(safeChalk.cyan('  npm install'))
    console.log(safeChalk.cyan('  npm run dev'))
    console.log('')
    console.log(safeChalk.blue('Keyifli kodlamalar! 🎉'))
  } catch (error) {
    console.error(safeChalk.red('Template indirme hatası:'))
    console.error(error)
    process.exit(1)
  }
}

// Program yapılandırması
program
  .name('create-sea-ui-kit')
  .description('Create a Next.js project with Sea UI Kit')
  .argument('[project-directory]', 'The directory to create the project in')
  .action(createProject)

// 100ms gecikme ile programı başlat (chalk'ın yüklenmesi için)
setTimeout(() => {
  program.parse(process.argv)
}, 100)
