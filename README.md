# 🌊 Sea UI Kit - Enterprise React Component Library

## Giriş

Sea UI Kit, Radix UI primitifleri üzerine inşa edilmiş kapsamlı bir React component kütüphanesidir. Modern Next.js ve React uygulamaları için deniz mavisi temasıyla tasarlanmış, enterprise seviyede bir tasarım sistemi sunar.

## Hızlı Başlangıç

### Yeni Proje Oluşturma

```bash
npx sea-ui-kit-stark my-app
cd my-app
npm install
npm run dev

```

Bu komut, Sea UI Kit ile tam olarak yapılandırılmış yeni bir Next.js projesi oluşturur.

### Mevcut Projeye Kurulum

```bash
npm install sea-ui-kit-stark

```

## Ana Özellikler

### 🎨 Tasarım Sistemi

- **Deniz Mavisi Teması**: Özel renk paleti ile tutarlı görsel kimlik
- **Karanlık Mod Desteği**: Otomatik sistem tercihi algılama
- **Responsive Tasarım**: Tüm ekran boyutlarında mükemmel görünüm
- **CSS Variables**: Kolay tema özelleştirmesi

### 🌐 Uluslararasılaştırma

- **Çoklu Dil Desteği**: İngilizce ve Türkçe hazır çeviriler
- **React i18next Entegrasyonu**: Dinamik dil değiştirme
- **RTL Desteği**: Sağdan sola yazılan diller için hazır altyapı

### 📝 Form Yönetimi

- **React Hook Form Entegrasyonu**: Performanslı form yönetimi
- **Zod Validation**: TypeScript-first şema doğrulama
- **Özelleştirilmiş Hook'lar**: `useForm`, `useFormValidation`
- **Otomatik Hata Çevirileri**: Çoklu dil hata mesajları

### 🔄 State Management

- **Redux Toolkit**: Modern state yönetimi
- **Redux Persist**: Otomatik state kalıcılığı
- **RTK Query**: API state yönetimi
- **Özel Slice'lar**: Theme, dil, kullanıcı, toast, loading

### 🔐 Güvenlik ve Authentication

- **JWT Token Yönetimi**: Otomatik token yenileme
- **Güvenli Local Storage**: Şifrelenmiş veri saklama
- **CSRF Koruması**: Cross-site request forgery koruması
- **XSS Koruması**: Cross-site scripting koruması
- **Rate Limiting**: API çağrı sınırlaması

### 📊 Performans ve Monitoring

- **Error Boundary**: Kapsamlı hata yönetimi
- **Performance Monitoring**: Render performance takibi
- **Loading States**: Global ve component seviyesi loading
- **Virtualization**: Büyük liste performansı

## Proje Yapısı

```
sea-ui-kit/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Korumalı sayfalar
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   ├── settings/
│   │   │   └── users/
│   │   ├── (public)/           # Genel erişim sayfalar
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── pricing/
│   │   ├── auth/               # Authentication sayfaları
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── globals.css         # Global stiller
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Ana sayfa
│   │   ├── not-found.tsx       # 404 sayfası
│   │   └── client-root.tsx     # Client provider wrapper
│   │
│   ├── components/             # UI Komponenleri
│   │   ├── auth/              # Authentication bileşenleri
│   │   │   └── LoginForm.tsx
│   │   ├── Button/            # Button bileşeni
│   │   ├── Checkbox/          # Checkbox bileşeni
│   │   ├── DataTable/         # Veri tablosu bileşeni
│   │   ├── Dialog/            # Modal dialog bileşeni
│   │   ├── ErrorBoundary/     # Hata yakalama bileşeni
│   │   ├── Form/              # Form bileşenleri
│   │   ├── FormBuilder/       # Dinamik form oluşturucu
│   │   ├── Input/             # Input bileşeni
│   │   ├── LanguageToggle/    # Dil değiştirici
│   │   ├── Loading/           # Loading bileşenleri
│   │   ├── Select/            # Select dropdown bileşeni
│   │   ├── Skeleton/          # Loading skeleton bileşeni
│   │   ├── Switch/            # Toggle switch bileşeni
│   │   ├── Tabs/              # Tab navigation bileşeni
│   │   ├── Textarea/          # Textarea bileşeni
│   │   ├── ThemeToggle/       # Tema değiştirici
│   │   └── Toast/             # Bildirim bileşeni
│   │
│   ├── hooks/                 # Özel React Hook'ları
│   │   ├── useAuth.ts         # Authentication hook
│   │   ├── useErrorHandler.ts # API error handling hook
│   │   ├── useForm.ts         # Form management hook
│   │   ├── useFormValidation.ts # Form validation hook
│   │   ├── useTheme.ts        # Theme management hook
│   │   └── useTokenManager.tsx # Token management hook
│   │
│   ├── lib/                   # Utility kütüphaneleri
│   │   ├── utils.ts           # Genel utility fonksiyonları
│   │   └── validations/       # Zod validation şemaları
│   │       └── auth.ts
│   │
│   ├── locales/               # Çoklu dil dosyaları
│   │   ├── en/               # İngilizce çeviriler
│   │   │   └── translation.json
│   │   ├── tr/               # Türkçe çeviriler
│   │   │   └── translation.json
│   │   └── index.ts          # i18n konfigürasyonu
│   │
│   ├── providers/            # React Context Provider'ları
│   │   └── Providers.tsx     # Ana provider wrapper
│   │
│   ├── services/             # API servisleri
│   │   └── api/              # API katmanı
│   │       ├── apiService.ts # Ana API servis sınıfı
│   │       ├── apiSlice.ts   # RTK Query API slice
│   │       ├── axiosBaseQuery.ts # Axios RTK Query entegrasyonu
│   │       ├── axiosInstance.ts # Axios instance konfigürasyonu
│   │       ├── axiosInterceptors.ts # Request/Response interceptor'ları
│   │       ├── constants.ts  # API sabitleri
│   │       ├── errorHandler.ts # API hata yönetimi
│   │       ├── requestQueue.ts # Token yenileme queue sistemi
│   │       ├── tokenManager.ts # JWT token yönetimi
│   │       └── types.ts      # API tip tanımları
│   │
│   ├── store/                # Redux store
│   │   ├── index.ts          # Store konfigürasyonu
│   │   ├── middleware/       # Custom middleware'ler
│   │   │   └── errorMiddleware.ts
│   │   ├── slices/           # Redux slice'ları
│   │   │   ├── langSlice.ts  # Dil state yönetimi
│   │   │   ├── loadingSlice.ts # Loading state yönetimi
│   │   │   ├── themeSlice.ts # Tema state yönetimi
│   │   │   ├── toastSlice.ts # Toast bildirim yönetimi
│   │   │   └── userSlice.ts  # Kullanıcı state yönetimi
│   │   └── types.ts          # Store tip tanımları
│   │
│   ├── styles/               # Stil dosyaları
│   │   └── theme.ts          # Tema konfigürasyonu
│   │
│   ├── types/                # TypeScript tip tanımları
│   │   ├── index.ts          # Genel tip tanımları
│   │   └── react.d.ts        # React tip genişletmeleri
│   │
│   ├── utils/                # Utility fonksiyonları
│   │   └── security.ts       # Güvenlik utility'leri
│   │
│   ├── middleware.ts         # Next.js middleware
│   └── index.ts              # Ana export dosyası
│
├── public/                   # Statik dosyalar
│   ├── favicon.svg
│   ├── site.webmanifest
│   └── robots.txt
│
├── .env.local               # Environment variables
├── .eslintrc.cjs           # ESLint konfigürasyonu
├── .gitignore              # Git ignore dosyası
├── .npmignore              # NPM ignore dosyası
├── .prettierrc.json        # Prettier konfigürasyonu
├── index.js                # CLI entry point
├── next.config.mjs         # Next.js konfigürasyonu
├── package.json            # Paket konfigürasyonu
├── postcss.config.mjs      # PostCSS konfigürasyonu
├── tailwind.config.mjs     # Tailwind CSS konfigürasyonu
├── tsconfig.json           # TypeScript konfigürasyonu
├── tsconfig.cjs.json       # CommonJS TypeScript konfigürasyonu
└── tsup.config.ts          # Build konfigürasyonu

```

## Komponent Kategorileri

### Temel Input Bileşenleri

- **Button**: Çeşitli varyant ve boyutlarda buton bileşeni
- **Input**: Gelişmiş validasyon destekli input alanı
- **Textarea**: Çok satırlı metin girişi
- **Checkbox**: Onay kutusu bileşeni
- **Switch**: Toggle switch bileşeni
- **Select**: Dropdown seçim bileşeni

### Layout Bileşenleri

- **Dialog**: Modal dialog penceresi
- **Tabs**: Sekmeli navigation bileşeni
- **DataTable**: Gelişmiş veri tablosu (sıralama, filtreleme, sayfalama)

### Form Bileşenleri

- **Form**: React Hook Form entegrasyonlu form wrapper
- **FormField**: Otomatik validasyon ile form alanı
- **FormBuilder**: Dinamik form oluşturucu
- **FormItem**, **FormLabel**, **FormMessage**: Form yardımcı bileşenleri

### Geri Bildirim Bileşenleri

- **Toast**: Bildirim sistemi
- **LoadingSpinner**: Yükleme animasyonları
- **Skeleton**: İçerik yükleme placeholder'ları
- **ErrorBoundary**: Hata yakalama ve gösterimi

### Navigation Bileşenleri

- **ThemeToggle**: Açık/koyu tema değiştirici
- **LanguageToggle**: Dil değiştirici

### Özel Bileşenler

- **LoginForm**: Hazır giriş formu
- **GlobalErrorBoundary**: Global hata yönetimi
- **ToastContainer**: Toast bildirim container'ı

## Gelişmiş Özellikler

### Theme Sistemi

Sea UI Kit, CSS değişkenleri tabanlı güçlü bir tema sistemi sunar:

```css
:root {
  --primary-500: hsl(200, 80%, 50%); /* Ana deniz mavisi */
  --accent-500: hsl(180, 80%, 50%); /* Teal vurgu rengi */
  --neutral-500: hsl(200, 10%, 50%); /* Nötr renkler */
}
```

### Form Sistemi

React Hook Form ve Zod entegrasyonlu gelişmiş form sistemi:

```tsx
import { useForm } from '@/hooks/useForm'
import { loginSchema } from '@/lib/validations/auth'

const form = useForm(loginSchema, {
  defaultValues: {
    email: '',
    password: '',
  },
})
```

### API Entegrasyonu

Axios tabanlı gelişmiş API katmanı:

```tsx
import { apiService } from '@/services/api/apiService'

// Otomatik token yönetimi ile API çağrısı
const data = await apiService.get('/users')
```

### State Management

Redux Toolkit ile merkezi state yönetimi:

```tsx
import { useAppSelector, useAppDispatch } from '@/store'
import { setTheme } from '@/store/slices/themeSlice'

const theme = useAppSelector((state) => state.theme.mode)
const dispatch = useAppDispatch()
```

## Güvenlik Özellikleri

### Veri Koruması

- **Şifrelenmiş Local Storage**: Hassas verilerin güvenli saklanması
- **XSS Koruması**: Otomatik input sanitizasyonu
- **CSRF Token'ları**: Cross-site request forgery koruması

### Authentication

- **JWT Token Yönetimi**: Otomatik token yenileme
- **Güvenli Şifre Politikaları**: Karmaşık şifre gereksinimleri
- **Rate Limiting**: API çağrı sınırlaması

### Input Validation

- **Client-side Validation**: Zod ile tip güvenli validasyon
- **Server-side Validation**: API seviyesinde doğrulama
- **Sanitization**: Otomatik input temizleme

## Performans Optimizasyonları

### Component Optimizasyonu

- **React.memo**: Gereksiz re-render'ları önleme
- **useCallback/useMemo**: Expensive hesaplamaları cache'leme
- **Code Splitting**: Lazy loading ile bundle boyutu optimizasyonu

### Data Management

- **Virtualization**: Büyük listelerde performans
- **Pagination**: Veri sayfalama sistemi
- **Caching**: RTK Query ile otomatik cache yönetimi

### Bundle Optimizasyonu

- **Tree Shaking**: Kullanılmayan kodların elenmesi
- **Dynamic Imports**: İhtiyaç duyulduğunda yükleme
- **Asset Optimization**: Resim ve font optimizasyonu

## Testing Stratejisi

### Unit Testing

```bash
npm run test           # Jest ile unit testler
npm run test:watch     # Watch modunda testler
npm run test:coverage  # Coverage raporu

```

### Component Testing

- **React Testing Library**: Component davranış testleri
- **Jest**: JavaScript unit testleri
- **MSW**: API mock'lama

### E2E Testing

- **Cypress**: End-to-end test senaryoları
- **Playwright**: Cross-browser testing

## Deployment ve DevOps

### Build Process

```bash
npm run build          # Production build
npm run start          # Production server
npm run analyze        # Bundle analizi

```

### Environment Management

- **Development**: Hot reload, debug tools
- **Staging**: Production benzeri test ortamı
- **Production**: Optimized build, monitoring

### CI/CD Pipeline

- **GitHub Actions**: Otomatik test ve deployment
- **ESLint/Prettier**: Code quality kontrolleri
- **TypeScript**: Tip kontrolü

## Browser Support

### Desteklenen Tarayıcılar

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Progressive Enhancement

- **Modern Features**: ES2022+ syntax kullanımı
- **Polyfills**: Eski tarayıcılar için fallback'ler
- **Graceful Degradation**: Özellik eksikliğinde geri dönüş

## Katkıda Bulunma

### Development Setup

```bash
git clone https://github.com/zzafergok/sea-ui-kit.git
cd sea-ui-kit
npm install
npm run dev

```

### Code Standards

- **TypeScript**: Tip güvenli kod yazımı
- **ESLint**: Code quality kuralları
- **Prettier**: Kod formatlama
- **Conventional Commits**: Standardize commit mesajları

### Pull Request Process

1.  Feature branch oluşturma
2.  Testlerin yazılması
3.  Code review süreci
4.  Documentation güncelleme

## Lisans ve Destek

### Lisans

MIT License - Ticari ve açık kaynak projelerde kullanım serbesttir.

### Topluluk Desteği

- **GitHub Issues**: Bug raporları ve feature istekleri
- **Discussions**: Topluluk tartışmaları
- **Documentation**: Kapsamlı dokümantasyon

### Enterprise Destek

- **Özel Eğitimler**: Ekip eğitimleri
- **Konsültasyon**: Mimari danışmanlığı
- **SLA**: Guaranteed response time

## Roadmap

### v1.0 (Mevcut)

- ✅ Temel component kütüphanesi
- ✅ Theme sistemi
- ✅ Form yönetimi
- ✅ Authentication

### v1.1 (Yakında)

- 🔄 Advanced DataTable özellikleri
- 🔄 Chart bileşenleri
- 🔄 File upload bileşeni
- 🔄 Gelişmiş animation sistemi

### v1.2 (Planlanan)

- 📋 Dashboard template'leri
- 📋 E-commerce bileşenleri
- 📋 Real-time özellikler
- 📋 Mobile-first optimizasyonlar

## Sonuç

Sea UI Kit, modern React uygulamaları için kapsamlı, güvenli ve performanslı bir çözüm sunar. Enterprise seviyede projeler için gerekli tüm araçları ve bileşenleri barındırır. Sürekli geliştirme ve topluluk desteği ile evrim geçirmeye devam etmektedir.

Daha fazla bilgi için [GitHub repository](https://github.com/zzafergok/sea-ui-kit) adresini ziyaret edebilir veya [dokümantasyonu](https://sea-ui-kit.vercel.app/) inceleyebilirsiniz.
