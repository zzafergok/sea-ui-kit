# 🚀 Sea UI Kit - Gelişmiş Axios Interceptor Sistemi

## Genel Bakış

Bu sistem, enterprise seviyede React/Next.js uygulamaları için tasarlanmış kapsamlı bir API entegrasyon çözümüdür. Token yönetimi, hata işleme, request queue sistemi ve performance monitoring gibi gelişmiş özellikler sunar.

## 📁 Dosya Yapısı

```
src/
├── config/
│   └── api.ts                          # API konfigürasyonu
├── services/api/
│   ├── types.ts                        # TypeScript tip tanımları
│   ├── constants.ts                    # API sabitleri ve endpoint'ler
│   ├── tokenManager.ts                 # Token yönetim sistemi
│   ├── errorHandler.ts                 # Merkezi hata yönetimi
│   ├── requestQueue.ts                 # Token refresh için queue sistemi
│   ├── axiosInterceptors.ts           # Ana interceptor sistemi
│   ├── axiosInstance.ts               # Axios instance oluşturma
│   ├── axiosBaseQuery.ts              # RTK Query entegrasyonu
│   ├── apiService.ts                  # Ana API service sınıfı
│   └── apiSlice.ts                    # RTK Query slice'ları
├── hooks/
│   ├── useApi.ts                      # Custom API hook
│   └── useAuth.ts                     # Authentication hook
├── store/slices/
│   └── toastSlice.ts                  # Toast/notification yönetimi
└── components/
    ├── auth/LoginForm.tsx             # Güncellenmiş login form
    └── examples/ApiExampleComponent.tsx # Kullanım örnekleri
```

## 🔧 Kurulum ve Konfigürasyon

### 1. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_API_TIMEOUT=15000
NEXT_PUBLIC_ENABLE_API_LOGGING=false
```

### 2. Store Konfigürasyonu

```typescript
// src/store/index.ts güncellendi
import toastReducer from './slices/toastSlice'

export const store = configureStore({
  reducer: {
    // ... diğer reducer'lar
    toast: toastReducer, // Yeni eklenen
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // ...
})
```

## 🎯 Temel Kullanım

### API Service ile Direct Çağrılar

```typescript
import { apiService } from '@/services/api/apiService'

// GET request
const users = await apiService.get<User[]>('/users')

// POST request
const newUser = await apiService.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
})

// File upload with progress
await apiService.uploadFile('/upload', file, (progress) => {
  console.log(`Upload: ${progress}%`)
})
```

### RTK Query Hooks

```typescript
import { 
  useGetPostsQuery, 
  useCreatePostMutation 
} from '@/services/api/apiSlice'

function PostsComponent() {
  const { data: posts, isLoading, error } = useGetPostsQuery({
    page: 1,
    limit: 10
  })

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()

  const handleCreate = async () => {
    await createPost({
      title: 'New Post',
      content: 'Post content'
    })
  }

  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### Authentication Hook

```typescript
import { useAuth } from '@/hooks/useAuth'

function LoginComponent() {
  const { login, logout, user, isAuthenticated, isLoading } = useAuth()

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
      // Otomatik token yönetimi ve store güncelleme
    } catch (error) {
      // Hata otomatik olarak toast'ta gösterilir
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hoş geldin {user?.name}</p>
          <button onClick={logout}>Çıkış</button>
        </div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  )
}
```

### Custom API Hook

```typescript
import { useApi } from '@/hooks/useApi'

function UserProfileComponent() {
  const userApi = useApi<User>()

  const loadProfile = async () => {
    await userApi.execute(() => 
      apiService.get('/user/profile')
    )
  }

  return (
    <div>
      {userApi.loading && <div>Yükleniyor...</div>}
      {userApi.error && <div>Hata: {userApi.error.message}</div>}
      {userApi.data && <div>Kullanıcı: {userApi.data.name}</div>}
      <button onClick={loadProfile}>Profili Yükle</button>
    </div>
  )
}
```

## 🔐 Token Yönetimi

### Otomatik Token Refresh

Sistem otomatik olarak token süresini kontrol eder ve gerektiğinde yeniler:

```typescript
// Token Manager kullanımı
import { TokenManager } from '@/services/api/tokenManager'

const tokenManager = TokenManager.getInstance()

// Token durumu kontrolü
const tokenInfo = tokenManager.getTokenInfo()
console.log(tokenInfo)
// {
//   hasAccessToken: true,
//   hasRefreshToken: true,
//   isExpired: false,
//   isSessionExpired: false
// }
```

### Manual Token İşlemleri

```typescript
// Token'ları manuel olarak ayarlama
tokenManager.setTokens('access_token', 'refresh_token', 3600)

// Token'ları temizleme
tokenManager.removeTokens()

// Token süresi kontrolü
if (tokenManager.isTokenExpired()) {
  // Token yenileme gerekli
}
```

## 🚨 Hata Yönetimi

### Otomatik Hata İşleme

Sistem otomatik olarak farklı hata türlerini handle eder:

- **401 Unauthorized**: Otomatik token refresh
- **403 Forbidden**: Yetki hatası mesajı
- **404 Not Found**: Kaynak bulunamadı
- **429 Too Many Requests**: Rate limit aşımı
- **5xx Server Errors**: Sunucu hatası mesajları

### Custom Hata İşleme

```typescript
// Specific endpoint için hata işlemeyi atla
const response = await apiService.get('/data', {
  skipErrorHandling: true,
  showErrorToast: false
})

// Manual hata işleme
try {
  const data = await apiService.get('/data')
} catch (error) {
  // Custom hata işleme
  console.error('Custom error handling:', error)
}
```

## 📊 Performance Monitoring

### Request Tracking

Her request otomatik olarak track edilir:

- Request ID ile tracing
- Response time monitoring
- Slow request detection (>3 saniye)
- Error rate tracking

### Development Debug

Development ortamında detaylı logging:

```javascript
// Console'da görünecek loglar
🚀 API Request: GET /users (req_123456789_abc)
✅ API Response: GET /users (200) - 245ms
❌ API Error: POST /users (400) - Validation failed
```

## 🔧 Gelişmiş Konfigürasyon

### Environment-Based Config

```typescript
// src/config/api.ts
const productionConfig = {
  baseURL: 'https://api.production.com',
  timeout: 15000,
  retryAttempts: 3,
  enableLogging: false,
  enableErrorReporting: true
}

const developmentConfig = {
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 2,
  enableLogging: true,
  enableErrorReporting: false
}
```

### Request Customization

```typescript
// Cache ile GET request
await apiService.get('/data', {
  cacheTime: 300000, // 5 dakika
  timeout: 5000,
  retryAttempts: 1
})

// Auth gerektirmeyen request
await apiService.post('/public-data', data, {
  skipAuth: true
})

// Toast göstermeden hata handle etme
await apiService.get('/data', {
  showErrorToast: false
})
```

## 📱 Component Entegrasyonu

### LoginForm Component

```typescript
import { LoginForm } from '@/components/auth/LoginForm'

function AuthPage() {
  return (
    <LoginForm
      onSubmit={(data) => console.log('Login success:', data)}
      redirectOnSuccess="/dashboard"
    />
  )
}
```

### API Example Component

```typescript
import ApiExampleComponent from '@/components/examples/ApiExampleComponent'

function ExamplesPage() {
  return <ApiExampleComponent />
}
```

## 🧪 Testing

### Unit Tests

```typescript
// Hook testing
import { renderHook } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'

test('should login successfully', async () => {
  const { result } = renderHook(() => useAuth())
  
  await act(async () => {
    await result.current.login({
      email: 'test@example.com',
      password: 'password123'
    })
  })

  expect(result.current.isAuthenticated).toBe(true)
})
```

### API Service Tests

```typescript
import { apiService } from '@/services/api/apiService'

test('should make GET request', async () => {
  const mockResponse = { data: { id: 1, name: 'Test' } }
  
  const result = await apiService.get('/test')
  
  expect(result).toEqual(mockResponse)
})
```

## 🚀 Best Practices

### 1. Error Handling

```typescript
// ✅ Doğru
try {
  const data = await apiService.get('/data')
  // Success handling
} catch (error) {
  // Error zaten interceptor tarafından handle edildi
  // Sadece component-specific işlemler yapın
}

// ❌ Yanlış
try {
  const data = await apiService.get('/data')
} catch (error) {
  // Manuel toast gösterme gerekli değil
  showErrorToast(error.message)
}
```

### 2. Token Management

```typescript
// ✅ Doğru - useAuth hook kullan
const { user, isAuthenticated, logout } = useAuth()

// ❌ Yanlış - Manuel token işlemleri
const token = localStorage.getItem('token')
```

### 3. State Management

```typescript
// ✅ Doğru - RTK Query kullan
const { data, isLoading, error } = useGetUsersQuery()

// ❌ Yanlış - Manuel state management
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false)
```

## 🔍 Debug ve Troubleshooting

### Token Debug

```typescript
// Token durumunu kontrol et
const tokenManager = TokenManager.getInstance()
console.log(tokenManager.getTokenInfo())
```

### Request Queue Debug

```typescript
// Queue durumunu kontrol et
const requestQueue = RequestQueue.getInstance()
console.log(requestQueue.getQueueStatus())
```

### Error Debugging

Development ortamında tüm API çağrıları console'da loglanır. Production'da sadece error'lar rapor edilir.

## 📋 Özet

Bu kapsamlı axios interceptor sistemi size şunları sağlar:

- ✅ Otomatik token yönetimi ve refresh
- ✅ Intelligent request queueing
- ✅ Comprehensive error handling
- ✅ Performance monitoring
- ✅ Type-safe API calls
- ✅ RTK Query integration
- ✅ Development debugging tools
- ✅ Production error reporting
- ✅ Flexible configuration
- ✅ Testing support

Bu sistem ile enterprise-grade API entegrasyonu kolayca gerçekleştirilebilir ve uygulamanızın güvenilirliği artırılabilir.
