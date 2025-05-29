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

## Kullanılabilir Komponentler

### Form & Input Bileşenleri

```tsx
import { Button, Input, Checkbox, Switch, Select, Textarea } from 'sea-ui-kit-stark'

// Temel kullanım
<Button variant="default" size="md">Kaydet</Button>
<Input placeholder="E-posta adresiniz" type="email" />
<Checkbox id="terms" />
<Switch defaultChecked />
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Seçiniz" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="tr">Türkiye</SelectItem>
    <SelectItem value="us">Amerika</SelectItem>
  </SelectContent>
</Select>
<Textarea placeholder="Mesajınız" rows={4} />
```

### Layout Bileşenleri

```tsx
import { Dialog, Tabs, Card } from 'sea-ui-kit-stark'

// Dialog kullanımı
<Dialog>
  <DialogTrigger asChild>
    <Button>Dialog Aç</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Başlık</DialogTitle>
      <DialogDescription>Açıklama</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Kaydet</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Tabs kullanımı
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Sekme 1</TabsTrigger>
    <TabsTrigger value="tab2">Sekme 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">İçerik 1</TabsContent>
  <TabsContent value="tab2">İçerik 2</TabsContent>
</Tabs>
```

### Form Yönetimi

```tsx
import { useForm, Form, FormField, FormItem, FormLabel, FormMessage } from 'sea-ui-kit-stark'
import { loginSchema } from 'sea-ui-kit-stark'

function LoginForm() {
  const form = useForm(loginSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>E-posta</FormLabel>
            <Input type='email' {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Şifre</FormLabel>
            <Input type='password' {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type='submit'>Giriş Yap</Button>
    </Form>
  )
}
```

### Tema Yönetimi

```tsx
import { useTheme, ThemeToggle } from 'sea-ui-kit-stark'

function ThemeExample() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <p>Mevcut tema: {theme}</p>
      <ThemeToggle />
      <Button onClick={() => setTheme('dark')}>Koyu Tema</Button>
    </div>
  )
}
```

### Dil Yönetimi

```tsx
import { LanguageToggle } from 'sea-ui-kit-stark'
import { useTranslation } from 'react-i18next'

function LanguageExample() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('pages.home.title')}</h1>
      <LanguageToggle />
    </div>
  )
}
```

## Proje Yapısı

```
sea-ui-kit/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Korumalı sayfalar
│   │   ├── (public)/           # Genel erişim sayfalar
│   │   ├── auth/               # Authentication sayfaları
│   │   └── globals.css         # Global stiller
│   │
│   ├── components/             # UI Komponenleri
│   │   ├── core/              # Temel bileşenler
│   │   ├── forms/             # Form bileşenleri
│   │   ├── layout/            # Layout bileşenleri
│   │   └── ui/                # Özel UI bileşenleri
│   │
│   ├── hooks/                 # Özel React Hook'ları
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   ├── useTheme.ts
│   │   └── useFormValidation.ts
│   │
│   ├── lib/                   # Utility kütüphaneleri
│   │   ├── utils.ts
│   │   └── validations/
│   │
│   ├── locales/               # Çoklu dil dosyaları
│   │   ├── en/translation.json
│   │   ├── tr/translation.json
│   │   └── index.ts
│   │
│   ├── providers/             # React Context Provider'ları
│   │   └── ClientProviders.tsx
│   │
│   ├── services/              # API servisleri
│   │   ├── apiService.ts
│   │   ├── authService.ts
│   │   └── constants.ts
│   │
│   ├── store/                 # Redux store
│   │   ├── index.ts
│   │   └── slices/
│   │
│   ├── styles/                # Stil dosyaları
│   ├── types/                 # TypeScript tip tanımları
│   └── index.ts               # Ana export dosyası
│
├── public/                    # Statik dosyalar
├── .env.local                # Environment variables
├── next.config.mjs           # Next.js konfigürasyonu
├── tailwind.config.mjs       # Tailwind CSS konfigürasyonu
└── tsconfig.json             # TypeScript konfigürasyonu
```

## Gelişmiş Özellikler

### Theme Sistemi

CSS değişkenleri tabanlı güçlü tema sistemi:

```css
:root {
  --primary-500: hsl(200, 80%, 50%); /* Ana deniz mavisi */
  --accent-500: hsl(180, 80%, 50%); /* Teal vurgu rengi */
  --neutral-500: hsl(200, 10%, 50%); /* Nötr renkler */
}
```

### API Entegrasyonu

Axios tabanlı gelişmiş API katmanı:

```tsx
import { apiService } from 'sea-ui-kit-stark'

// Otomatik token yönetimi ile API çağrısı
const data = await apiService.get('/users')
```

### Validation Şemaları

Zod tabanlı güçlü validation:

```tsx
import { loginSchema, registerSchema } from 'sea-ui-kit-stark'

// Kullanıma hazır validation şemaları
const form = useForm(loginSchema)
```

## Gereksinimler

- **Node.js**: 18.0.0 veya üzeri
- **React**: 18.0.0 veya üzeri
- **Next.js**: 14.0.0 veya üzeri
- **TypeScript**: 5.0.0 veya üzeri

## Tarayıcı Desteği

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Geliştirme

### Projeyi Klonlama

```bash
git clone https://github.com/zzafergok/sea-ui-kit.git
cd sea-ui-kit
npm install
npm run dev
```

### Kullanılabilir Komutlar

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run start        # Production sunucusu
npm run lint         # ESLint kontrolü
npm run type-check   # TypeScript kontrolü
npm run test         # Testleri çalıştır
npm run prettier     # Kod formatlama
```

## Örnek Projeler

### Temel Kullanım

```tsx
import { Button, Input, useTheme } from 'sea-ui-kit-stark'

export default function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='p-8'>
      <h1>Sea UI Kit Örneği</h1>
      <div className='space-y-4'>
        <Input placeholder='Adınızı girin' />
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Tema Değiştir</Button>
      </div>
    </div>
  )
}
```

### Authentication Örneği

```tsx
import { LoginForm } from 'sea-ui-kit-stark'

export default function LoginPage() {
  const handleLogin = async (data) => {
    console.log('Giriş yapılıyor:', data)
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <LoginForm onSubmit={handleLogin} showRememberMe={true} showForgotPassword={true} />
    </div>
  )
}
```

## API Referansı

### Hook'lar

- `useForm(schema, options)`: Form yönetimi
- `useTheme()`: Tema yönetimi
- `useAuth()`: Authentication yönetimi
- `useFormValidation(schema)`: Gelişmiş form validation

### Utility Fonksiyonları

- `cn(...inputs)`: CSS sınıflarını birleştirme
- `debounce(fn, ms)`: Fonksiyon debouncing
- `storage.get/set/remove`: Type-safe localStorage
- `formatDate(date, locale)`: Tarih formatlama

### Validation Şemaları

- `loginSchema`: Giriş formu validation
- `registerSchema`: Kayıt formu validation
- `forgotPasswordSchema`: Şifre sıfırlama validation

## Konfigürasyon

### Tailwind CSS Konfigürasyonu

```js
// tailwind.config.mjs
module.exports = {
  content: ['./node_modules/sea-ui-kit-stark/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-500)',
        accent: 'var(--accent-500)',
      },
    },
  },
}
```

### Next.js Konfigürasyonu

```js
// next.config.mjs
const nextConfig = {
  transpilePackages: ['sea-ui-kit-stark'],
}
```

## Yol Haritası

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

## Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

MIT License - Ticari ve açık kaynak projelerde kullanım serbesttir.

## Destek

- **GitHub Issues**: Bug raporları ve feature istekleri
- **Discussions**: Topluluk tartışmaları
- **Documentation**: [sea-ui-kit.vercel.app](https://sea-ui-kit.vercel.app/)

## Yazarlar

- **Zafer Gök** - [@zzafergok](https://github.com/zzafergok)

---

**Made with ❤️ in Turkey**
