#!/usr/bin/env node

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { program } from 'commander'
import prompts from 'prompts'
import ora from 'ora'

// ES modules için __dirname alternatifi
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    magenta: (text) => `\x1b[35m${text}\x1b[0m`,
    gray: (text) => `\x1b[90m${text}\x1b[0m`,
    bold: {
      blue: (text) => `\x1b[1m\x1b[34m${text}\x1b[0m`,
      green: (text) => `\x1b[1m\x1b[32m${text}\x1b[0m`,
      red: (text) => `\x1b[1m\x1b[31m${text}\x1b[0m`,
    },
  }
}

/**
 * Proje adını validate eden fonksiyon
 */
function validateProjectName(name) {
  if (!name || name.trim() === '') {
    return 'Proje adı boş olamaz'
  }

  const validationRegex = /^[a-zA-Z0-9._-]+$/
  if (!validationRegex.test(name)) {
    return 'Proje adı sadece harf, rakam, nokta, tire ve alt çizgi içerebilir'
  }

  const reservedNames = ['test', 'react', 'node_modules', '.git', 'src', 'public']
  if (reservedNames.includes(name.toLowerCase())) {
    return `"${name}" adı rezerve edilmiştir, farklı bir ad seçin`
  }

  return true
}

/**
 * Package.json dosyasını proje için özelleştiren fonksiyon
 */
async function customizePackageJson(targetDir, projectName) {
  const packageJsonPath = path.join(targetDir, 'package.json')

  try {
    const packageJson = await fs.readJson(packageJsonPath)

    // Proje bilgilerini güncelle
    packageJson.name = projectName
    packageJson.version = '0.1.0'
    packageJson.description = `${projectName} - Sea UI Kit ile oluşturulmuş Next.js projesi`
    packageJson.private = true

    // CLI specific alanları kaldır
    delete packageJson.bin
    delete packageJson.files
    delete packageJson.main
    delete packageJson.module
    delete packageJson.types
    delete packageJson.sideEffects

    // Build ve dev script'lerini güncelle
    packageJson.scripts = {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'type-check': 'tsc --noEmit',
      prettier: 'prettier --write "src/**/*.{js,ts,jsx,tsx}"',
      'prettier:check': 'prettier --check "src/**/*.{js,ts,jsx,tsx}"',
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })

    return true
  } catch (error) {
    console.error(chalk.red('Package.json güncellenirken hata oluştu:'), error.message)
    return false
  }
}

/**
 * Template dosyalarını kopyalayan fonksiyon
 */
async function copyTemplateFiles(targetDir) {
  const templateDir = path.join(__dirname)

  try {
    // Kopyalanmayacak dosyalar
    const excludeFiles = [
      'index.js',
      'node_modules',
      '.git',
      '.next',
      'dist',
      'coverage',
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
    ]

    // Template dosyalarını kopyala
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        const relativePath = path.relative(templateDir, src)
        const fileName = path.basename(src)

        // Exclude listesindeki dosyaları atla
        return !excludeFiles.some((exclude) => relativePath.startsWith(exclude) || fileName === exclude)
      },
    })

    return true
  } catch (error) {
    console.error(chalk.red('Template dosyaları kopyalanırken hata oluştu:'), error.message)
    return false
  }
}

/**
 * Git repository'sini initialize eden fonksiyon
 */
async function initializeGit(targetDir) {
  try {
    const { execSync } = await import('child_process')

    // Git repo'yu initialize et
    execSync('git init', {
      cwd: targetDir,
      stdio: 'ignore',
    })

    // Initial commit
    execSync('git add .', {
      cwd: targetDir,
      stdio: 'ignore',
    })

    execSync('git commit -m "feat: initial commit with Sea UI Kit"', {
      cwd: targetDir,
      stdio: 'ignore',
    })

    return true
  } catch {
    // Git yüklü değilse sessizce devam et
    return false
  }
}

/**
 * Ana proje oluşturma fonksiyonu
 */
async function createProject(projectDir, options = {}) {
  console.log(chalk.bold.blue('🌊 Sea UI Kit ile yeni proje oluşturuluyor...\n'))

  let projectName = projectDir

  // Proje adı verilmemişse kullanıcıdan al
  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Proje adını girin:',
      initial: 'my-sea-ui-app',
      validate: validateProjectName,
    })

    if (!response.projectName) {
      console.log(chalk.yellow('\nİşlem iptal edildi.'))
      process.exit(0)
    }

    projectName = response.projectName
  }

  // Proje adını validate et
  const validation = validateProjectName(projectName)
  if (validation !== true) {
    console.error(chalk.red(`Hata: ${validation}`))
    process.exit(1)
  }

  const targetDir = path.resolve(process.cwd(), projectName)

  // Dizin mevcut mu kontrol et
  if (await fs.pathExists(targetDir)) {
    const files = await fs.readdir(targetDir)
    if (files.length > 0) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `"${projectName}" dizini zaten var ve boş değil. Devam edilsin mi?`,
        initial: false,
      })

      if (!response.overwrite) {
        console.log(chalk.yellow('İşlem iptal edildi.'))
        process.exit(0)
      }
    }
  }

  console.log(chalk.blue(`📁 Proje dizini: ${chalk.cyan(targetDir)}\n`))

  // Spinner başlat
  const spinner = ora('Template dosyaları kopyalanıyor...').start()

  try {
    // Hedef dizini oluştur
    await fs.ensureDir(targetDir)

    // Template dosyalarını kopyala
    spinner.text = 'Template dosyaları kopyalanıyor...'
    const copySuccess = await copyTemplateFiles(targetDir)

    if (!copySuccess) {
      throw new Error('Template dosyaları kopyalanamadı')
    }

    // Package.json'ı özelleştir
    spinner.text = 'Package.json dosyası özelleştiriliyor...'
    const packageSuccess = await customizePackageJson(targetDir, projectName)

    if (!packageSuccess) {
      throw new Error('Package.json güncellenemedi')
    }

    // Git repo'yu initialize et
    if (!options.skipGit) {
      spinner.text = 'Git repository initialize ediliyor...'
      await initializeGit(targetDir)
    }

    spinner.succeed(chalk.green('✅ Proje başarıyla oluşturuldu!'))

    // Başarı mesajları
    console.log('\n' + chalk.bold.green('🎉 Sea UI Kit projesi hazır!'))
    console.log('\nBaşlamak için aşağıdaki komutları çalıştırın:\n')
    console.log(chalk.cyan(`  cd ${projectName}`))
    console.log(chalk.cyan('  npm install'))
    console.log(chalk.cyan('  npm run dev'))

    console.log('\n' + chalk.gray('Alternatif olarak yarn kullanabilirsiniz:'))
    console.log(chalk.gray(`  cd ${projectName}`))
    console.log(chalk.gray('  yarn install'))
    console.log(chalk.gray('  yarn dev'))

    console.log('\n' + chalk.blue('📚 Daha fazla bilgi için: https://github.com/zzafergok/sea-ui-kit'))
    console.log(chalk.magenta('✨ Keyifli kodlamalar!'))
  } catch (error) {
    spinner.fail(chalk.red('Proje oluşturulurken hata oluştu'))
    console.error('\n' + chalk.red('Hata detayı:'), error.message)

    // Cleanup
    try {
      await fs.remove(targetDir)
    } catch (cleanupError) {
      console.error(chalk.red('Cleanup hatası:'), cleanupError.message)
    }

    process.exit(1)
  }
}

/**
 * Program konfigürasyonu
 */
program
  .name('sea-ui-kit-stark')
  .description('🌊 Sea UI Kit ile modern Next.js projesi oluşturun')
  .version('0.1.40')
  .argument('[project-directory]', 'Projenin oluşturulacağı dizin adı')
  .option('--skip-git', 'Git repository initialize etme')
  .option('--verbose', 'Detaylı çıktı göster')
  .action(async (projectDir, options) => {
    try {
      await createProject(projectDir, options)
    } catch (error) {
      console.error(chalk.bold.red('\n💥 Beklenmeyen hata oluştu:'))
      console.error(chalk.red(error.message))

      if (options.verbose) {
        console.error('\n' + chalk.gray('Stack trace:'))
        console.error(chalk.gray(error.stack))
      }

      process.exit(1)
    }
  })

// Help komutunu özelleştir
program.on('--help', () => {
  console.log('')
  console.log(chalk.bold('Örnekler:'))
  console.log('  $ npx sea-ui-kit-stark my-app')
  console.log('  $ npx sea-ui-kit-stark my-project --skip-git')
  console.log('')
  console.log(chalk.blue('🌊 Sea UI Kit ile modern React uygulamaları oluşturun!'))
})

// Program'ı çalıştır
program.parse(process.argv)
