#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import degit from 'degit'
import { program } from 'commander'

console.log('✅ Sea UI CLI çalıştırıldı')

// Chalk'ı dinamik import ile yükle
let chalk
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

// Ana program fonksiyonu (ESM uyumlu)
const createProject = async (projectDir) => {
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

    console.log(chalk.green('✅ Başarılı!'))
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
}

// Program yapılandırması
program
  .name('create-sea-ui-kit')
  .description('Create a Next.js project with Sea UI Kit')
  .argument('[project-directory]', 'The directory to create the project in')
  .action(createProject)

program.parse(process.argv)
