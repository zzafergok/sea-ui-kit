declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    NEXT_PUBLIC_API_URL?: string
    // Projenizde kullanılan diğer ortam değişkenlerini burada tanımlayın
  }
}
