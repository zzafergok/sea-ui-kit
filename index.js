#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const degit = require('degit')
const prompts = require('prompts')
const { program } = require('commander')
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

// TS -> JS Dönüşümü
const convertTsToJs = (targetDir) => {
  console.log(chalk.blue("TypeScript dosyaları JavaScript'e dönüştürülüyor..."))

  // Tüm .ts ve .tsx dosyalarını bul
  const tsFiles = glob.sync(path.join(targetDir, 'src/**/*.{ts,tsx}'))

  tsFiles.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8')

    // TypeScript'e özgü syntax'ı kaldır
    content = content
      // Type tanımlamalarını ve import'larını kaldır
      .replace(/import\s+type\s+.*?from\s+.*?;?/g, '')
      .replace(/import\s+{\s*.*?type.*?\s*}\s+from\s+.*?;?/g, '')
      // Tip tanımlamalarını kaldır
      .replace(/:\s*[A-Za-z0-9_<>[\](){}|&,'"\s.*]+(?=\s*[=,);]|$)/g, '')
      .replace(/<[A-Za-z0-9_<>[\](){}|&,'"\s.*]+>/g, '')
      // Interface ve type tanımlamalarını kaldır
      .replace(/interface\s+[^{]+{[^}]*}/g, '')
      .replace(/type\s+[^=]+=\s*[^;]+;?/g, '')
      // Generic tipleri kaldır
      .replace(/<[^<>]*>(?=\()/g, '')
      // "as" type assertion'ları kaldır
      .replace(/\s+as\s+[A-Za-z0-9_<>[\](){}|&,'"\s.*]+/g, '')
      // export type ifadelerini kaldır
      .replace(/export\s+type\s+[^=]+=\s*[^;]+;?/g, '')
      .replace(/export\s+interface\s+[^{]+{[^}]*}/g, '')
      // Boş satırları temizle
      .replace(/\n\s*\n\s*\n/g, '\n\n')

    // Dosya uzantısını değiştir
    const jsFile = file.replace(/\.tsx?$/, file.endsWith('.tsx') ? '.jsx' : '.js')

    // Yeni içeriği yaz
    fs.writeFileSync(jsFile, content)

    // Orijinal TS dosyasını sil
    fs.unlinkSync(file)

    console.log(chalk.green(`  ${path.basename(file)} -> ${path.basename(jsFile)}`))
  })

  // tsconfig dosyalarını sil
  const tsconfigFiles = glob.sync(path.join(targetDir, 'tsconfig*.json'))
  tsconfigFiles.forEach((file) => {
    fs.unlinkSync(file)
    console.log(chalk.green(`  ${path.basename(file)} silindi`))
  })

  // Basit bir jsconfig.json oluştur
  const jsConfigPath = path.join(targetDir, 'jsconfig.json')
  const jsConfigContent = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
`
  fs.writeFileSync(jsConfigPath, jsConfigContent)
  console.log(chalk.green('✅ jsconfig.json oluşturuldu'))

  console.log(chalk.green('✅ TypeScript -> JavaScript dönüşümü tamamlandı!'))
}

// Dark mode desteğini kaldır
const removeDarkModeSupport = (targetDir) => {
  console.log(chalk.blue('Dark mode desteği kaldırılıyor...'))

  // 1. themeSlice.ts dosyasını kaldır
  const themeSlicePath = path.join(targetDir, 'src/store/slices/themeSlice.ts')
  if (fs.existsSync(themeSlicePath)) {
    fs.unlinkSync(themeSlicePath)
    console.log(chalk.green('  themeSlice.ts silindi'))
  }

  // 2. useTheme.ts hook'unu kaldır
  const useThemePath = path.join(targetDir, 'src/hooks/useTheme.ts')
  if (fs.existsSync(useThemePath)) {
    fs.unlinkSync(useThemePath)
    console.log(chalk.green('  useTheme.ts silindi'))
  }

  // 3. ThemeToggle.tsx bileşenini kaldır
  const themeTogglePath = path.join(targetDir, 'src/components/ThemeToggle/ThemeToggle.tsx')
  if (fs.existsSync(themeTogglePath)) {
    fs.rmdirSync(path.dirname(themeTogglePath), { recursive: true })
    console.log(chalk.green('  ThemeToggle bileşeni silindi'))
  }

  // 4. CSS'den dark mode stillerini kaldır
  const globalScssPath = path.join(targetDir, 'src/styles/global.scss')
  if (fs.existsSync(globalScssPath)) {
    let cssContent = fs.readFileSync(globalScssPath, 'utf8')
    // Dark mode ile ilgili CSS kısmını kaldır
    cssContent = cssContent.replace(/\/\/ Dark theme[\s\S]*?}\n/g, '')
    // Dark class referanslarını kaldır
    cssContent = cssContent.replace(/dark:[^;]*;/g, '')
    fs.writeFileSync(globalScssPath, cssContent)
    console.log(chalk.green("  global.scss'ten dark mode stilleri kaldırıldı"))
  }

  // 5. tailwind.config.js'den darkMode ayarını kaldır
  const tailwindConfigPath = path.join(targetDir, 'tailwind.config.js')
  if (fs.existsSync(tailwindConfigPath)) {
    let tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8')
    tailwindConfig = tailwindConfig.replace(/darkMode:\s*['"]class['"],?\n?/g, '')
    fs.writeFileSync(tailwindConfigPath, tailwindConfig)
    console.log(chalk.green("  tailwind.config.js'den darkMode ayarı kaldırıldı"))
  }

  // 6. Store'dan theme ile ilgili referansları kaldır
  const storeIndexPath = path.join(targetDir, 'src/store/index.ts')
  if (fs.existsSync(storeIndexPath)) {
    let storeContent = fs.readFileSync(storeIndexPath, 'utf8')
    // themeReducer import'unu kaldır
    storeContent = storeContent.replace(/import themeReducer.*\n/g, '')
    // ThemeState import'unu kaldır
    storeContent = storeContent.replace(/import type { ThemeState }.*\n/g, '')
    // Store tipinde theme'i kaldır
    storeContent = storeContent.replace(/theme: ThemeState,\n?/g, '')
    // Reducer'dan theme'i kaldır
    storeContent = storeContent.replace(/theme: themeReducer,\n?/g, '')
    fs.writeFileSync(storeIndexPath, storeContent)
    console.log(chalk.green("  store/index.ts'ten theme ile ilgili kodlar kaldırıldı"))
  }

  console.log(chalk.green('✅ Dark mode desteği başarıyla kaldırıldı!'))
}

// i18n desteğini kaldır
const removeI18nSupport = (targetDir) => {
  console.log(chalk.blue('i18n desteği kaldırılıyor...'))

  // 1. Dil dosyalarını içeren klasörü kaldır
  const localesPath = path.join(targetDir, 'src/locales')
  if (fs.existsSync(localesPath)) {
    fs.rmdirSync(localesPath, { recursive: true })
    console.log(chalk.green('  locales klasörü silindi'))
  }

  // 2. langSlice.ts dosyasını kaldır
  const langSlicePath = path.join(targetDir, 'src/store/slices/langSlice.ts')
  if (fs.existsSync(langSlicePath)) {
    fs.unlinkSync(langSlicePath)
    console.log(chalk.green('  langSlice.ts silindi'))
  }

  // 3. LanguageToggle.tsx bileşenini kaldır
  const langTogglePath = path.join(targetDir, 'src/components/LanguageToggle/LanguageToggle.tsx')
  if (fs.existsSync(langTogglePath)) {
    fs.rmdirSync(path.dirname(langTogglePath), { recursive: true })
    console.log(chalk.green('  LanguageToggle bileşeni silindi'))
  }

  // 4. Providers.tsx'ten i18n ile ilgili kodları kaldır
  const providersPath = path.join(targetDir, 'src/providers/Providers.tsx')
  if (fs.existsSync(providersPath)) {
    let providersContent = fs.readFileSync(providersPath, 'utf8')
    // i18n import'larını kaldır
    providersContent = providersContent.replace(/import { I18nextProvider } from 'react-i18next'\n/g, '')
    providersContent = providersContent.replace(/import i18n from '@\/locales'\n/g, '')
    // i18n ile ilgili kodu kaldır
    providersContent = providersContent.replace(/if \(typeof window !== 'undefined'\) {[\s\S]*?}\n/g, '')
    // I18nextProvider'ı kaldır
    providersContent = providersContent.replace(/<I18nextProvider i18n={i18n}>(.*?)<\/I18nextProvider>/s, '$1')
    fs.writeFileSync(providersPath, providersContent)
    console.log(chalk.green("  Providers.tsx'ten i18n ile ilgili kodlar kaldırıldı"))
  }

  // 5. Store'dan lang ile ilgili referansları kaldır
  const storeIndexPath = path.join(targetDir, 'src/store/index.ts')
  if (fs.existsSync(storeIndexPath)) {
    let storeContent = fs.readFileSync(storeIndexPath, 'utf8')
    // langReducer import'unu kaldır
    storeContent = storeContent.replace(/import langReducer.*\n/g, '')
    // LangState import'unu kaldır
    storeContent = storeContent.replace(/import type { LangState }.*\n/g, '')
    // Store tipinde lang'i kaldır
    storeContent = storeContent.replace(/lang: LangState,\n?/g, '')
    // Reducer'dan lang'i kaldır
    storeContent = storeContent.replace(/lang: langReducer,\n?/g, '')
    fs.writeFileSync(storeIndexPath, storeContent)
    console.log(chalk.green("  store/index.ts'ten lang ile ilgili kodlar kaldırıldı"))
  }

  // 6. Bileşenlerden useTranslation kullanımını kaldır
  const componentFiles = glob.sync(path.join(targetDir, 'src/components/**/*.{ts,tsx,js,jsx}'))
  componentFiles.forEach((file) => {
    let content = fs.readFileSync(file, 'utf8')
    // i18n import'larını kaldır
    content = content.replace(/import { useTranslation } from 'react-i18next'\n/g, '')
    // useTranslation kullanımını kaldır
    content = content.replace(/const { t } = useTranslation\(\);?\n/g, '')
    // t() fonksiyonunu string ile değiştir
    content = content.replace(/t\(['"]([^'"]*)['"](,\s*{[^}]*})?\)/g, (match, p1) => {
      // Alt alan referanslarını (auth.login gibi) sadece son kısmını al
      const parts = p1.split('.')
      const lastPart = parts[parts.length - 1]
      // İlk harfi büyüt
      return `'${lastPart.charAt(0).toUpperCase() + lastPart.slice(1)}'`
    })
    fs.writeFileSync(file, content)
  })
  console.log(chalk.green('  Bileşenlerden i18n kullanımı kaldırıldı'))

  console.log(chalk.green('✅ i18n desteği başarıyla kaldırıldı!'))
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
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
          // Dark mode kodlarını gerçekten kaldır
          removeDarkModeSupport(targetDir)
        }

        if (!projectConfig.i18n && templatePkg.dependencies) {
          console.log(chalk.blue('i18n desteği kaldırılıyor...'))
          // i18n ile ilgili paketleri kaldır
          delete templatePkg.dependencies['i18next']
          delete templatePkg.dependencies['react-i18next']
          delete templatePkg.dependencies['i18next-browser-languagedetector']

          // i18n kodlarını gerçekten kaldır
          removeI18nSupport(targetDir)
        }

        // Dil seçimine göre projeyi ayarla
        if (projectConfig.language === 'javascript' && templatePkg.dependencies) {
          console.log(chalk.blue('JavaScript ayarlanıyor...'))
          // TypeScript bağımlılıklarını kaldır
          delete templatePkg.devDependencies?.typescript
          delete templatePkg.devDependencies?.['@types/react']
          delete templatePkg.devDependencies?.['@types/react-dom']
          delete templatePkg.devDependencies?.['@types/node']

          // TypeScript dosyalarını JavaScript'e çevir
          convertTsToJs(targetDir)
        }

        // @types/node'u devDependencies'e ekleyelim
        if (!templatePkg.devDependencies) {
          templatePkg.devDependencies = {}
        }

        // @types/node zaten yüklüyse kontrol edilmesi
        if (!templatePkg.devDependencies['@types/node'] && projectConfig.language === 'typescript') {
          templatePkg.devDependencies['@types/node'] = '^20.8.9'
        }

        // glob kütüphanesini devDependencies'e ekle (dosya işlemleri için)
        templatePkg.devDependencies['glob'] = '^10.3.10'

        // Güncellenmiş package.json'ı yaz
        fs.writeFileSync(templatePkgPath, JSON.stringify(templatePkg, null, 2))

        console.log(chalk.green('✅ package.json başarıyla güncellendi.'))
      }

      // Node.js tipi ile ilgili sorunları çözmek için gerekli dosyaları oluştur
      console.log(chalk.blue('Tip tanımlamaları ve ortam değişkenleri için gerekli dosyalar oluşturuluyor...'))
      createEnvironmentUtilsFile(targetDir)

      if (projectConfig.language === 'typescript') {
        updateTsConfig(targetDir)
        updateTsupConfig(targetDir)
      }

      fixProblemFiles(targetDir)

      // Bağımlılıkları yükle
      console.log(chalk.blue('Bağımlılıklar yükleniyor...'))
      try {
        execSync('npm install', { stdio: 'inherit', cwd: targetDir })
        console.log(chalk.green('✅ Bağımlılıklar başarıyla yüklendi.'))
      } catch (error) {
        console.warn(
          chalk.yellow(
            'Bağımlılıklar yüklenirken bir sorun oluştu, manuel olarak "npm install" komutunu çalıştırmanız gerekebilir.',
          ),
        )
        console.error(error)
      }

      console.log(chalk.green.bold('✅ Başarılı!'))
      console.log(chalk.green('Sea UI Kit projeniz kullanıcı tercihlerinize göre hazır:'), chalk.cyan(targetDir))
      console.log('')
      console.log(chalk.cyan('Tercihleriniz:'))
      console.log(chalk.cyan(`  - Dil: ${projectConfig.language === 'typescript' ? 'TypeScript' : 'JavaScript'}`))
      console.log(chalk.cyan(`  - Dark Mode: ${projectConfig.darkMode ? 'Aktif' : 'Devre dışı'}`))
      console.log(chalk.cyan(`  - i18n Desteği: ${projectConfig.i18n ? 'Aktif' : 'Devre dışı'}`))
      console.log('')
      console.log('Başlamak için:')
      console.log(chalk.cyan(`  cd ${projectDir}`))
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
