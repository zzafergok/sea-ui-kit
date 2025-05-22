'use client'

import React, { useState } from 'react'
import { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation } from '@/services/api/apiSlice'
import { useApi } from '@/hooks/useApi'
import { apiService } from '@/services/api/apiService'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { Textarea } from '@/components/Textarea/Textarea'

/**
 * API kullanım örneklerini gösteren component
 * Farklı API çağrı yöntemlerini demonstrate eder
 */
export function ApiExampleComponent() {
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')

  // RTK Query kullanımı
  const { data: posts, isLoading, error, refetch } = useGetPostsQuery({ page: 1, limit: 10 })

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation()
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  // Custom hook kullanımı
  const userApi = useApi()

  // Direct API service kullanımı
  const handleDirectApiCall = async () => {
    try {
      const response = await apiService.get('/posts')
      console.log('Direct API response:', response)
    } catch (error) {
      console.error('Direct API error:', error)
    }
  }

  // RTK Query mutation kullanımı
  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    try {
      await createPost({
        title: newPostTitle,
        content: newPostContent,
      }).unwrap()

      setNewPostTitle('')
      setNewPostContent('')
      refetch() // Liste yenile
    } catch (error) {
      console.error('Create post error:', error)
    }
  }

  // Custom hook ile API çağrısı
  const handleCustomHookCall = async () => {
    try {
      await userApi.execute(() => apiService.get('/user/profile'))
      console.log('User data:', userApi.data)
    } catch (error) {
      console.error('Custom hook error:', error)
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>API Integration Examples</h1>

      {/* RTK Query Example */}
      <section className='bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>RTK Query Kullanımı</h2>

        {/* Post Creation Form */}
        <div className='mb-6 space-y-4'>
          <Input placeholder='Post başlığı' value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
          <Textarea
            placeholder='Post içeriği'
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <Button onClick={handleCreatePost} disabled={isCreating || !newPostTitle.trim() || !newPostContent.trim()}>
            {isCreating ? 'Oluşturuluyor...' : 'Post Oluştur'}
          </Button>
        </div>

        {/* Posts List */}
        {isLoading && <div className='text-center py-4'>Yükleniyor...</div>}

        {error && <div className='text-red-500 text-center py-4'>Hata: {error.toString()}</div>}

        {posts && (
          <div className='space-y-4'>
            <h3 className='font-medium'>Posts ({posts.length})</h3>
            {posts.map((post: any) => (
              <div key={post.id} className='border rounded p-4 flex justify-between items-start'>
                <div>
                  <h4 className='font-medium'>{post.title}</h4>
                  <p className='text-neutral-600 dark:text-neutral-400'>{post.content}</p>
                </div>
                <Button variant='destructive' size='sm' onClick={() => deletePost(post.id)} disabled={isDeleting}>
                  Sil
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Direct API Service Example */}
      <section className='bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Direct API Service Kullanımı</h2>
        <div className='space-y-4'>
          <p className='text-neutral-600 dark:text-neutral-400'>Direct API service kullanarak veri çekme örneği</p>
          <Button onClick={handleDirectApiCall}>Direct API Çağrısı Yap</Button>
        </div>
      </section>

      {/* Custom Hook Example */}
      <section className='bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Custom Hook Kullanımı</h2>
        <div className='space-y-4'>
          <p className='text-neutral-600 dark:text-neutral-400'>
            useApi hook'u kullanarak state management ile API çağrısı
          </p>

          <Button onClick={handleCustomHookCall} disabled={userApi.loading}>
            {userApi.loading ? 'Yükleniyor...' : 'User Profile Getir'}
          </Button>

          {userApi.error && <div className='text-red-500'>Hata: {userApi.error.message}</div>}

          {userApi.data && (
            <div className='bg-neutral-100 dark:bg-neutral-700 rounded p-4'>
              <pre className='text-sm overflow-auto'>{JSON.stringify(userApi.data, null, 2)}</pre>
            </div>
          )}
        </div>
      </section>

      {/* File Upload Example */}
      <section className='bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>File Upload Örneği</h2>
        <FileUploadExample />
      </section>
    </div>
  )
}

/**
 * File upload örneği component'ı
 */
function FileUploadExample() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const result = await apiService.uploadFile('/files/upload', file, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(progress)
      })

      console.log('Upload successful:', result)
      setFile(null)
      setUploadProgress(0)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <input
        type='file'
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className='block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100'
      />

      {file && (
        <div className='text-sm text-neutral-600 dark:text-neutral-400'>
          Seçilen dosya: {file.name} ({Math.round(file.size / 1024)} KB)
        </div>
      )}

      {isUploading && (
        <div className='space-y-2'>
          <div className='w-full bg-neutral-200 rounded-full h-2 dark:bg-neutral-700'>
            <div
              className='bg-primary-600 h-2 rounded-full transition-all duration-300'
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className='text-sm text-center'>{uploadProgress}%</div>
        </div>
      )}

      <Button onClick={handleFileUpload} disabled={!file || isUploading} className='w-full'>
        {isUploading ? 'Yükleniyor...' : 'Dosyayı Yükle'}
      </Button>
    </div>
  )
}

export default ApiExampleComponent
