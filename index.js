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

// Environment utility fonksiyonları
const createEnvironmentUtilsFile = (targetDir) => {
  const envUtilsPath = path.join(targetDir, 'src/utils')

  // utils klasörü yoksa oluştur
  if (!fs.existsSync(envUtilsPath)) {
    fs.mkdirSync(envUtilsPath, { recursive: true })
  }

  // environment.ts dosyasını oluştur
  const envUtilsFile = path.join(envUtilsPath, 'environment.ts')
  const envUtilsContent = `/**
 * Ortam değişkenlerine güvenli erişim sağlayan yardımcı fonksiyonlar
 * Browser ve server ortamlarında tutarlı davranış için tasarlanmıştır
 */
export const isServer = typeof window === 'undefined'
export const isDevelopment = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production'

/**
 * Ortam değişkenine güvenli erişim sağlar
 * @param key - Ortam değişkeni adı
 * @param defaultValue - Değişken tanımlı değilse kullanılacak varsayılan değer
 */
export const getEnvironmentVariable = (key: string, defaultValue: string = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string
  }
  return defaultValue
}
`
  fs.writeFileSync(envUtilsFile, envUtilsContent)
  console.log(chalk.green('✅ Environment utility dosyası oluşturuldu:', envUtilsFile))
}

// Node.js için tip tanımlamalarını içeren dosya oluşturma
const createNodeTypesFile = (targetDir) => {
  const typesDir = path.join(targetDir, 'src/types')

  // types klasörü yoksa oluştur
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true })
  }

  // environment.d.ts dosyasını oluştur
  const envTypesFile = path.join(typesDir, 'environment.d.ts')
  const envTypesContent = `declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_API_URL?: string
    // Projenizde kullanılan diğer ortam değişkenlerini burada tanımlayın
  }
}
`
  fs.writeFileSync(envTypesFile, envTypesContent)
  console.log(chalk.green('✅ Node.js tip tanımlamaları oluşturuldu:', envTypesFile))
}

// Sorunlu dosyaları düzeltme
const fixProblemFiles = (targetDir) => {
  // 1. src/store/index.ts dosyasını düzelt
  const storeIndexPath = path.join(targetDir, 'src/store/index.ts')
  if (fs.existsSync(storeIndexPath)) {
    let storeContent = fs.readFileSync(storeIndexPath, 'utf8')

    // İçe aktarma ekle
    if (!storeContent.includes('import { isDevelopment }')) {
      storeContent = storeContent.replace(
        'import type { ThemeState } from',
        "import { isDevelopment } from '../utils/environment'\nimport type { ThemeState } from",
      )
    }

    // devTools için process.env.NODE_ENV kullanımını değiştir
    storeContent = storeContent.replace(
      /devTools: process\.env\.NODE_ENV !== ['"]production['"]/,
      'devTools: isDevelopment',
    )

    fs.writeFileSync(storeIndexPath, storeContent)
    console.log(chalk.green('✅ Store dosyası düzeltildi:', storeIndexPath))
  }

  // 2. src/locales/index.ts dosyasını düzelt
  const localesIndexPath = path.join(targetDir, 'src/locales/index.ts')
  if (fs.existsSync(localesIndexPath)) {
    let localesContent = fs.readFileSync(localesIndexPath, 'utf8')

    // İçe aktarma ekle
    if (!localesContent.includes('import { isDevelopment }')) {
      localesContent = localesContent.replace(
        'import i18n from',
        "import { isDevelopment } from '../utils/environment'\nimport i18n from",
      )
    }

    // debug için process.env.NODE_ENV kullanımını değiştir
    localesContent = localesContent.replace(
      /debug: process\.env\.NODE_ENV === ['"]development['"]/,
      'debug: isDevelopment',
    )

    fs.writeFileSync(localesIndexPath, localesContent)
    console.log(chalk.green('✅ i18n dosyası düzeltildi:', localesIndexPath))
  }
}

// tsconfig.json dosyasını güncelleme
const updateTsConfig = (targetDir) => {
  const tsconfigPath = path.join(targetDir, 'tsconfig.json')
  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'))

    // types eklemek için compilerOptions'ı kontrol et
    if (!tsconfig.compilerOptions) {
      tsconfig.compilerOptions = {}
    }

    // types dizisini oluştur veya güncelle
    if (!tsconfig.compilerOptions.types) {
      tsconfig.compilerOptions.types = ['node']
    } else if (!tsconfig.compilerOptions.types.includes('node')) {
      tsconfig.compilerOptions.types.push('node')
    }

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2))
    console.log(chalk.green('✅ tsconfig.json güncellendi:', tsconfigPath))
  }
}

// tsup.config.ts dosyasını güncelleme
const updateTsupConfig = (targetDir) => {
  const tsupConfigPath = path.join(targetDir, 'tsup.config.ts')
  if (fs.existsSync(tsupConfigPath)) {
    let tsupConfig = fs.readFileSync(tsupConfigPath, 'utf8')

    // esbuildOptions'a define eklemek
    if (!tsupConfig.includes('define: {')) {
      tsupConfig = tsupConfig.replace(
        'esbuildOptions(options) {',
        `esbuildOptions(options) {
    // Node.js API'lerini browserda kullanabilmek için polyfill ekleyelim
    options.define = {
      ...options.define,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }`,
      )
    }

    fs.writeFileSync(tsupConfigPath, tsupConfig)
    console.log(chalk.green('✅ tsup.config.ts güncellendi:', tsupConfigPath))
  }
}

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
    const emitter = degit('zzafergok/sea-ui-kit', {
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
          } catch (err) {
            console.log(chalk.yellow('Local React sürümü tespit edilemedi, varsayılan sürüm kullanılıyor.'), err)
          }
        }

        console.log(chalk.blue(`React sürümü tespit edildi: ${userReactVersion}`))
      } catch (error) {
        console.log(chalk.yellow('React sürümü tespit edilemedi, varsayılan sürüm kullanılıyor.'), error)
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

        // @types/node'u devDependencies'e ekleyelim
        if (!templatePkg.devDependencies) {
          templatePkg.devDependencies = {}
        }

        // @types/node zaten yüklüyse kontrol edilmesi
        if (!templatePkg.devDependencies['@types/node']) {
          templatePkg.devDependencies['@types/node'] = '^20.8.9'
        }

        // Güncellenmiş package.json'ı yaz
        fs.writeFileSync(templatePkgPath, JSON.stringify(templatePkg, null, 2))

        console.log(chalk.green('✅ package.json başarıyla güncellendi.'))
      }

      // Node.js tipi ile ilgili sorunları çözmek için gerekli dosyaları oluştur
      console.log(chalk.blue('Tip tanımlamaları ve ortam değişkenleri için gerekli dosyalar oluşturuluyor...'))
      createNodeTypesFile(targetDir)
      createEnvironmentUtilsFile(targetDir)
      updateTsConfig(targetDir)
      updateTsupConfig(targetDir)
      fixProblemFiles(targetDir)

      // Tip tanımlamalarını yükle
      console.log(chalk.blue('Tip tanımlamaları yükleniyor...'))
      try {
        execSync('npm install --save-dev @types/node', { stdio: 'inherit', cwd: targetDir })
        console.log(chalk.green('✅ Tip tanımlamaları başarıyla yüklendi.'))
      } catch (error) {
        console.warn(
          chalk.yellow('Tip tanımlamaları yüklenirken bir sorun oluştu, manuel olarak yüklemeniz gerekebilir.'),
        )
        console.warn(chalk.yellow('Komutu çalıştırabilirsiniz: npm install --save-dev @types/node'), error)
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
