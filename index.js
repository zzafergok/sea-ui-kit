#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const degit = require('degit')
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

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
