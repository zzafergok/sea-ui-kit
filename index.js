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

// Kurulum sonrası temizleme işlevi
const cleanupInstallationFiles = (projectDir) => {
  console.log(chalk.blue('Kurulum dosyaları temizleniyor...'))

  const targetDir = path.resolve(process.cwd(), projectDir)

  // Temizlenecek dosyalar ve klasörler
  const filesToRemove = [
    'index.js', // CLI giriş dosyası
    '.git', // Git klasörü (kullanıcı kendi git repo'sunu başlatabilsin)
    'template', // Varsa template klasörü
    'LICENSE-cli', // CLI lisansı (eğer varsa)
    'tsconfig.cjs.json', // CommonJS derleme yapılandırması
    'tsup.config.ts', // Paket derleyici yapılandırması
  ]

  // package.json düzenlemeleri
  const packageJsonPath = path.join(targetDir, 'package.json')

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    // CLI'a özgü bağımlılıkları ve yapılandırmaları kaldıralım
    delete packageJson.bin
    delete packageJson.dependencies?.chalk
    delete packageJson.dependencies?.commander
    delete packageJson.dependencies?.degit
    delete packageJson.dependencies?.prompts

    // Kütüphane yapılandırmasına ait betikleri kaldıralım
    if (packageJson.scripts) {
      delete packageJson.scripts.build
      delete packageJson.scripts['build:esm']
      delete packageJson.scripts['build:cjs']
      delete packageJson.scripts['dev:lib']
    }

    // Proje adını güzelleştirelim (dizin adını kullanarak)
    packageJson.name = projectDir.toLowerCase().replace(/\s+/g, '-')
    packageJson.version = '0.1.0' // Yeni projelerin sürümünü sıfırlayalım

    // Güncellenmiş package.json'ı kaydedelim
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  } catch (error) {
    console.warn(chalk.yellow('package.json düzenlenemedi. Manuel olarak düzenlemeniz gerekebilir.'))
    console.error(error)
  }

  // Dosyaları temizleyelim
  filesToRemove.forEach((file) => {
    const filePath = path.join(targetDir, file)

    if (fs.existsSync(filePath)) {
      try {
        // Klasör mü, dosya mı kontrol edelim
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
          // Klasörü rekürsif olarak silelim
          fs.rmSync(filePath, { recursive: true, force: true })
        } else {
          // Dosyayı silelim
          fs.unlinkSync(filePath)
        }
      } catch (error) {
        console.warn(chalk.yellow(`'${file}' silinemedi. Manuel olarak silmeniz gerekebilir.`), error)
      }
    }
  })

  console.log(chalk.green('✅ Kurulum dosyaları başarıyla temizlendi!'))
}

program
  .name('create-sea-ui-kit')
  .description('Create a Next.js project with Sea UI Kit')
  .argument('[project-directory]', 'The directory to create the project in')
  .action(async (projectDir) => {
    console.log(chalk.bold.blue('🌊 Sea UI Kit projesi oluşturuluyor...'))

    // Proje dizini belirtilmemişse varsayılan olarak 'my-sea-ui-app' kullan
    if (!projectDir) {
      projectDir = 'my-sea-ui-app'
      console.log(chalk.blue(`Proje dizini belirtilmedi. Varsayılan olarak "${projectDir}" kullanılıyor.`))
    }

    const targetDir = path.resolve(process.cwd(), projectDir)

    // Dizin varsa ve boş değilse uyar, ancak devam et
    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
      console.log(chalk.yellow(`Uyarı: "${projectDir}" dizini zaten var ve boş değil. Dosyalar üzerine yazılabilir.`))
    }

    console.log(chalk.blue('Template indiriliyor...'))

    // Template indirme işlemi
    const emitter = degit('zzafergok/sea-ui-kit', {
      force: true,
      verbose: true,
    })

    try {
      // Şablonu hedef dizine klonla
      await emitter.clone(targetDir)

      // Kurulum dosyalarını temizle
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
