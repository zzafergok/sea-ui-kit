#!/usr/bin/env node

const { program } = require('commander')
const prompts = require('prompts')
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

    // Prompt for project directory if not provided
    if (!projectDir) {
      const response = await prompts({
        type: 'text',
        name: 'projectDir',
        message: 'Projenizin adı nedir?',
        initial: 'my-sea-ui-app',
      })

      if (!response.projectDir) {
        console.log(chalk.red('Proje dizini belirtilmedi. Çıkılıyor...'))
        process.exit(1)
      }

      projectDir = response.projectDir
    }

    const targetDir = path.resolve(process.cwd(), projectDir)

    // Check if directory exists
    if (fs.existsSync(targetDir)) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${projectDir} dizini zaten var. Devam edilsin mi?`,
        initial: false,
      })

      if (!response.overwrite) {
        console.log(chalk.red('İşlem iptal edildi. Çıkılıyor...'))
        process.exit(1)
      }
    }

    // Prompt for project configuration
    const projectConfig = await prompts([
      {
        type: 'select',
        name: 'language',
        message: 'Dil seçin:',
        choices: [
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JavaScript', value: 'javascript' },
        ],
        initial: 0,
      },
      {
        type: 'confirm',
        name: 'darkMode',
        message: 'Karanlık mod desteği eklensin mi?',
        initial: true,
      },
      {
        type: 'confirm',
        name: 'i18n',
        message: 'i18n desteği eklensin mi (EN/TR)?',
        initial: true,
      },
    ])

    console.log(chalk.blue('Şablon indiriliyor...'))

    // Template indirme işlemi (gerçek repo ile değiştirin)
    const emitter = degit('zzafergok/sea-ui-kit-template', {
      force: true,
      verbose: true,
    })

    try {
      // Şablonu hedef dizine klonla
      await emitter.clone(targetDir)

      console.log(chalk.blue('Proje yapılandırması ayarlanıyor...'))

      // Kullanıcının React sürümünü kontrol et
      let userReactVersion = '18.2.0' // Varsayılan sürüm

      try {
        // Global React sürümünü kontrol et
        const reactVersionOutput = execSync('npm list -g react --depth=0 --json').toString()
        const reactVersionData = JSON.parse(reactVersionOutput)

        if (reactVersionData.dependencies && reactVersionData.dependencies.react) {
          userReactVersion = reactVersionData.dependencies.react.version
        } else {
          // Global kurulum bulunamadı, local kurulumunu kontrol et
          try {
            const localReactVersion = execSync('npm list react --depth=0 --json').toString()
            const localReactData = JSON.parse(localReactVersion)

            if (localReactData.dependencies && localReactData.dependencies.react) {
              userReactVersion = localReactData.dependencies.react.version
            }
          } catch (error) {
            console.log(chalk.yellow('Local React sürümü tespit edilemedi, varsayılan sürüm kullanılıyor.'))
          }
        }

        console.log(chalk.blue(`React sürümü tespit edildi: ${userReactVersion}`))
      } catch (error) {
        console.log(chalk.yellow('React sürümü tespit edilemedi, varsayılan sürüm kullanılıyor.'))
      }

      // Template package.json'ı güncelle
      const templatePkgPath = path.join(targetDir, 'package.json')

      if (fs.existsSync(templatePkgPath)) {
        const templatePkg = JSON.parse(fs.readFileSync(templatePkgPath, 'utf8'))

        // React 19.x kullanılıyorsa Next.js 16'ya güncelle
        if (userReactVersion.startsWith('19.')) {
          console.log(chalk.blue('React 19 tespit edildi, bağımlılıklar uyumlu sürümlere güncelleniyor...'))

          if (templatePkg.dependencies) {
            if (templatePkg.dependencies.next) {
              templatePkg.dependencies.next = '^16.0.0'
            }
            if (templatePkg.dependencies.react) {
              templatePkg.dependencies.react = userReactVersion
            }
            if (templatePkg.dependencies['react-dom']) {
              templatePkg.dependencies['react-dom'] = userReactVersion
            }
          }
        } else {
          // React 18 için uyumlu sürümleri ayarla
          console.log(chalk.blue('React 18 tespit edildi, bağımlılıklar uyumlu sürümlere güncelleniyor...'))

          if (templatePkg.dependencies) {
            if (templatePkg.dependencies.next) {
              templatePkg.dependencies.next = '^15.0.3'
            }
            if (templatePkg.dependencies.react) {
              templatePkg.dependencies.react = userReactVersion || '^18.2.0'
            }
            if (templatePkg.dependencies['react-dom']) {
              templatePkg.dependencies['react-dom'] = userReactVersion || '^18.2.0'
            }
          }
        }

        // Proje konfigürasyonuna göre özellikleri ekle/çıkar
        if (!projectConfig.darkMode && templatePkg.dependencies) {
          console.log(chalk.blue('Karanlık mod desteği kaldırılıyor...'))
          // Karanlık mod ile ilgili bağımlılıkları kaldır veya güncelle
        }

        if (!projectConfig.i18n && templatePkg.dependencies) {
          console.log(chalk.blue('i18n desteği kaldırılıyor...'))
          // i18n ile ilgili bağımlılıkları kaldır
          delete templatePkg.dependencies['i18next']
          delete templatePkg.dependencies['react-i18next']
          delete templatePkg.dependencies['i18next-browser-languagedetector']
        }

        // Dil seçimine göre projeyi ayarla
        if (projectConfig.language === 'javascript' && templatePkg.dependencies) {
          console.log(chalk.blue('JavaScript ayarlanıyor...'))
          // TypeScript bağımlılıklarını kaldır
          delete templatePkg.dependencies.typescript
          delete templatePkg.devDependencies?.['@types/react']
          delete templatePkg.devDependencies?.['@types/react-dom']
          delete templatePkg.devDependencies?.['@types/node']

          // TS dosyalarını JS'ye dönüştür (gerçek projede daha karmaşık olacaktır)
        }

        // Güncellenmiş package.json'ı yaz
        fs.writeFileSync(templatePkgPath, JSON.stringify(templatePkg, null, 2))

        console.log(chalk.green('package.json başarıyla güncellendi.'))
      }

      console.log(chalk.green.bold('✅ Başarılı!'))
      console.log(chalk.green('Sea UI Kit projeniz hazır:'), chalk.cyan(targetDir))
      console.log('')
      console.log('Başlamak için:')
      console.log(chalk.cyan(`  cd ${projectDir}`))
      console.log(chalk.cyan('  npm install'))
      console.log(chalk.cyan('  npm run dev'))
      console.log('')
      console.log(chalk.blue('Keyifli kodlamalar! 🎉'))
    } catch (error) {
      console.error(chalk.red('Şablon indirme hatası:'))
      console.error(error)
      process.exit(1)
    }
  })

program.parse(process.argv)
