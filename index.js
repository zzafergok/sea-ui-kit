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

    // Yeni bağımlılık listelerini oluştur
    packageJson.dependencies = {
      next: '^16.0.0',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      '@reduxjs/toolkit': '^2.0.0',
      axios: '^1.6.0',
      'class-variance-authority': '^0.7.1',
      clsx: '^2.1.1',
      i18next: '^25.1.3',
      'i18next-browser-languagedetector': '^8.1.0',
      'lucide-react': '^0.483.0',
      'react-hook-form': '^7.53.0',
      'react-i18next': '^15.5.1',
      'react-redux': '^9.0.0',
      'tailwind-merge': '^2.0.0',
      zod: '^3.23.8',
      '@hookform/resolvers': '^5.0.1',
      '@radix-ui/react-checkbox': '^1.0.4',
      '@radix-ui/react-dialog': '^1.0.5',
      '@radix-ui/react-select': '^2.0.0',
      '@radix-ui/react-switch': '^1.0.3',
      '@radix-ui/react-tabs': '^1.0.4',
      '@radix-ui/react-toast': '^1.1.5',
    }

    packageJson.devDependencies = {
      '@types/node': '^20.8.9',
      '@types/react': '^18.2.33',
      '@types/react-dom': '^18.2.14',
      autoprefixer: '^10.4.21',
      eslint: '^8.57.1',
      'eslint-config-next': '^14.0.0',
      'eslint-config-prettier': '^10.1.5',
      'eslint-plugin-prettier': '^5.4.0',
      postcss: '^8.5.3',
      'postcss-nesting': '^13.0.1',
      prettier: '^3.5.3',
      sass: '^1.89.0',
      tailwindcss: '^3.3.5',
      typescript: '^5.2.2',
      '@typescript-eslint/eslint-plugin': '^8.32.1',
      '@typescript-eslint/parser': '^8.32.1',
      'eslint-plugin-react': '^7.37.5',
      'eslint-plugin-react-hooks': '^5.2.0',
    }

    // Scripts güncelleme - sadece Next.js projeleri için gerekli olanları bırak
    packageJson.scripts = {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'eslint "{**/*,*}.{js,ts,jsx,tsx}"',
      prettier: 'prettier --write "{src,tests}/**/*.{js,ts,jsx,tsx}"',
    }

    // CLI'a özgü bağımlılıkları kaldır
    delete packageJson.dependencies?.chalk
    delete packageJson.dependencies?.commander
    delete packageJson.dependencies?.degit
    delete packageJson.dependencies?.prompts

    // Proje adını güzelleştir
    packageJson.name = projectDir.toLowerCase().replace(/\s+/g, '-')
    packageJson.version = '0.1.0'
    packageJson.description = 'Next.js project with Sea UI Kit'

    // Güncellenmiş package.json'ı kaydet
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
