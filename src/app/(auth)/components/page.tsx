'use client'

import React, { useState, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardActionArea,
  CardBadge,
} from '@/components/Card/Card'
import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Switch } from '@/components/Switch/Switch'
import { Textarea } from '@/components/Textarea/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select/Select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs/Tabs'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/Dialog/Dialog'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle/LanguageToggle'
import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/Loading/LoadingSpinner'
import {
  Mail,
  Search,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  Palette,
  Code,
  Zap,
  Layout,
  MousePointer,
  Bell,
  Sparkles,
  Package,
  ExternalLink,
  Copy,
  Github,
  Figma,
  BookOpen,
} from 'lucide-react'
import { useAppDispatch } from '@/store'
import { showToast } from '@/store/slices/toastSlice'
import { ComponentShowcase } from '@/components/ComponentShowcase/ComponentShowcase'
import { ComponentSearch } from '@/components/ComponentSearch/ComponentSearch'
import { CodePreview } from '@/components/CodePreview/CodePreview'
import { mockComponents, categoryColors, statusColors } from '@/data/mockComponents'
import { ComponentItem } from '@/hooks/useComponentSearch'
import { cn } from '@/lib/utils'

export default function ComponentsPage() {
  const dispatch = useAppDispatch()
  const [filteredComponents, setFilteredComponents] = useState<ComponentItem[]>(mockComponents)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const showSampleToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: 'İşlem başarıyla tamamlandı!',
      error: 'Bir hata oluştu!',
      warning: 'Dikkat edilmesi gereken bir durum var.',
      info: 'Bilgilendirme mesajı.',
    }

    dispatch(
      showToast({
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        message: messages[type],
        duration: 3000,
      }),
    )
  }

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code)
    showSampleToast('success')
  }, [])

  const handleFilteredComponentsChange = useCallback((components: ComponentItem[]) => {
    setFilteredComponents(components)
  }, [])

  const handleViewModeChange = useCallback((mode: 'grid' | 'list') => {
    setViewMode(mode)
  }, [])

  // Bileşen kartı render fonksiyonu
  const renderComponentCard = useCallback(
    (component: ComponentItem) => {
      const statusVariant = {
        stable: 'success' as const,
        beta: 'warning' as const,
        alpha: 'destructive' as const,
        deprecated: 'destructive' as const,
      }

      return (
        <Card
          key={component.id}
          className={cn(
            'group hover:shadow-lg transition-all duration-300',
            viewMode === 'list' && 'flex flex-row items-center',
          )}
        >
          <CardHeader className={cn(viewMode === 'list' && 'flex-1')}>
            <div className='flex items-start justify-between'>
              <div className={cn('space-y-1', viewMode === 'list' && 'flex-1')}>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <Code className='h-5 w-5 text-primary-600 dark:text-primary-400' />
                  {component.name}
                </CardTitle>
                <CardDescription>{component.description}</CardDescription>
                <div className='flex items-center gap-2 text-xs'>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-xs',
                      categoryColors[component.category] || 'bg-neutral-100 dark:bg-neutral-800',
                    )}
                  >
                    {component.category}
                  </span>
                  <span className='text-neutral-400'>•</span>
                  <span className='text-neutral-500'>Popülerlik: {component.popularity}</span>
                </div>
              </div>
              <CardBadge variant={statusVariant[component.status]}>
                {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
              </CardBadge>
            </div>
          </CardHeader>

          {viewMode === 'grid' && (
            <CardContent className='space-y-4'>
              <div className='flex flex-wrap gap-1'>
                {component.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className='text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded'
                  >
                    {tag}
                  </span>
                ))}
                {component.tags.length > 3 && (
                  <span className='text-xs text-neutral-400'>+{component.tags.length - 3}</span>
                )}
              </div>
            </CardContent>
          )}

          <CardFooter className={cn('flex justify-between', viewMode === 'list' && 'flex-col gap-2')}>
            <Button variant='ghost' size='sm' onClick={() => handleCopyCode(`<${component.name} />`)}>
              <Copy className='h-4 w-4 mr-2' />
              Kodu Kopyala
            </Button>
            <Button variant='outline' size='sm'>
              <ExternalLink className='h-4 w-4 mr-2' />
              Docs
            </Button>
          </CardFooter>
        </Card>
      )
    },
    [viewMode, handleCopyCode],
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950'>
      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/5 to-primary-500/10' />
        <div className='relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
          <div className='text-center space-y-8'>
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-950/50 rounded-full border border-primary-200 dark:border-primary-800'>
              <Sparkles className='h-4 w-4 text-primary-600 dark:text-primary-400' />
              <span className='text-sm font-medium text-primary-700 dark:text-primary-300'>
                {mockComponents.length}+ UI Bileşeni
              </span>
            </div>

            <div className='space-y-4'>
              <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 via-primary-600 to-accent-600 dark:from-neutral-100 dark:via-primary-400 dark:to-accent-400 bg-clip-text text-transparent'>
                Sea UI Kit
              </h1>
              <p className='text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto'>
                Modern React uygulamaları için tasarlanmış kapsamlı bileşen koleksiyonu
              </p>
              <p className='text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto'>
                Radix UI primitifleri üzerine inşa edilmiş, erişilebilir ve özelleştirilebilir bileşenler ile
                projelerinizi hızlandırın
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <Button size='lg' className='flex items-center gap-2'>
                <BookOpen className='h-5 w-5' />
                Dokümantasyon
              </Button>
              <Button variant='outline' size='lg' className='flex items-center gap-2'>
                <Github className='h-5 w-5' />
                GitHub
              </Button>
              <Button variant='ghost' size='lg' className='flex items-center gap-2'>
                <Figma className='h-5 w-5' />
                Figma Design System
              </Button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12'>
              <div className='text-center'>
                <div className='text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400'>
                  {mockComponents.length}+
                </div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>Bileşenler</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl md:text-3xl font-bold text-accent-600 dark:text-accent-400'>100%</div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>TypeScript</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400'>A11Y</div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>Erişilebilir</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400'>MIT</div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>Açık Kaynak</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
        <ComponentSearch
          components={mockComponents}
          onFilteredComponentsChange={handleFilteredComponentsChange}
          onViewModeChange={handleViewModeChange}
          viewMode={viewMode}
          className='mb-8'
        />
      </section>

      {/* Components Grid/List */}
      <section className='max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8'>
        <Tabs defaultValue='all' className='space-y-8'>
          <TabsList className='grid w-full grid-cols-1 sm:grid-cols-4 bg-white dark:bg-neutral-900 p-1'>
            <TabsTrigger value='all' className='flex items-center gap-2'>
              <Package className='h-4 w-4' />
              <span className='hidden sm:inline'>Tüm Bileşenler</span>
            </TabsTrigger>
            <TabsTrigger value='interactive' className='flex items-center gap-2'>
              <MousePointer className='h-4 w-4' />
              <span className='hidden sm:inline'>Etkileşimli</span>
            </TabsTrigger>
            <TabsTrigger value='forms' className='flex items-center gap-2'>
              <Package className='h-4 w-4' />
              <span className='hidden sm:inline'>Form</span>
            </TabsTrigger>
            <TabsTrigger value='feedback' className='flex items-center gap-2'>
              <Bell className='h-4 w-4' />
              <span className='hidden sm:inline'>Feedback</span>
            </TabsTrigger>
          </TabsList>

          {/* Tüm Bileşenler */}
          <TabsContent value='all' className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
                Tüm Bileşenler ({filteredComponents.length})
              </h2>
            </div>

            <div
              className={cn(
                'grid gap-6',
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1',
              )}
            >
              {filteredComponents.map(renderComponentCard)}
            </div>

            {filteredComponents.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-neutral-400 mb-4'>
                  <Search className='h-12 w-12 mx-auto' />
                </div>
                <h3 className='text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-2'>
                  Hiç bileşen bulunamadı
                </h3>
                <p className='text-neutral-500 dark:text-neutral-500'>Arama kriterlerinizi değiştirip tekrar deneyin</p>
              </div>
            )}
          </TabsContent>

          {/* Diğer tablar için örnek demonstrasyonlar */}
          <TabsContent value='interactive' className='space-y-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
              {/* Button Showcase */}
              <Card className='group hover:shadow-lg transition-all duration-300'>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div>
                      <CardTitle className='flex items-center gap-2 text-lg'>
                        <Code className='h-5 w-5 text-primary-600 dark:text-primary-400' />
                        Button
                      </CardTitle>
                      <CardDescription>Farklı varyant ve boyutlarda buton bileşeni</CardDescription>
                    </div>
                    <CardBadge variant='success'>Stable</CardBadge>
                  </div>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-3'>
                    <div className='flex flex-wrap gap-2'>
                      <Button size='sm'>Primary</Button>
                      <Button variant='secondary' size='sm'>
                        Secondary
                      </Button>
                      <Button variant='outline' size='sm'>
                        Outline
                      </Button>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      <Button variant='ghost' size='sm'>
                        Ghost
                      </Button>
                      <Button variant='destructive' size='sm'>
                        Destructive
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button variant='ghost' size='sm' onClick={() => handleCopyCode(`<Button>Click me</Button>`)}>
                    <Copy className='h-4 w-4 mr-2' />
                    Kodu Kopyala
                  </Button>
                  <Button variant='outline' size='sm'>
                    <ExternalLink className='h-4 w-4 mr-2' />
                    Docs
                  </Button>
                </CardFooter>
              </Card>

              {/* Theme Controls */}
              <Card className='group hover:shadow-lg transition-all duration-300'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    <Palette className='h-5 w-5 text-accent-600 dark:text-accent-400' />
                    Theme Controls
                  </CardTitle>
                  <CardDescription>Tema ve dil değiştirme kontrolleri</CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <label className='text-sm font-medium'>Tema Modu</label>
                      <p className='text-xs text-neutral-500 dark:text-neutral-400'>Açık, koyu veya sistem</p>
                    </div>
                    <ThemeToggle />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div>
                      <label className='text-sm font-medium'>Dil</label>
                      <p className='text-xs text-neutral-500 dark:text-neutral-400'>TR/EN seçimi</p>
                    </div>
                    <LanguageToggle />
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Card Demo */}
              <Card hover='glow' interactive onClick={() => showSampleToast('success')} className='cursor-pointer'>
                <CardActionArea>
                  <CardHeader>
                    <div className='flex items-start justify-between'>
                      <div>
                        <CardTitle className='flex items-center gap-2 text-lg'>
                          <Zap className='h-5 w-5 text-yellow-500' />
                          Interactive Card
                        </CardTitle>
                        <CardDescription>Tıklanabilir kart örneği</CardDescription>
                      </div>
                      <CardBadge variant='warning'>Clickable</CardBadge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                      Bu kartın herhangi bir yerine tıklayarak toast bildirimi tetikleyebilirsiniz.
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </TabsContent>

          {/* Form Components */}
          <TabsContent value='forms' className='space-y-8'>
            <Card className='border-2 border-dashed border-neutral-200 dark:border-neutral-700'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Mail className='h-5 w-5' />
                  Form Elements Showcase
                </CardTitle>
                <CardDescription>Kapsamlı form bileşenleri örneği</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>Ad Soyad</label>
                    <Input placeholder='Adınızı girin' />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium'>E-posta</label>
                    <Input type='email' placeholder='email@example.com' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder='Kategori seçin' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='frontend'>Frontend</SelectItem>
                      <SelectItem value='backend'>Backend</SelectItem>
                      <SelectItem value='design'>Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium'>Mesaj</label>
                  <Textarea placeholder='Mesajınızı yazın...' rows={3} />
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Checkbox id='newsletter' />
                    <label htmlFor='newsletter' className='text-sm'>
                      Newsletter aboneliği
                    </label>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <Switch id='notifications' />
                    <label htmlFor='notifications' className='text-sm'>
                      Push bildirimleri
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button variant='outline'>Temizle</Button>
                <Button>Gönder</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Feedback Components */}
          <TabsContent value='feedback' className='space-y-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Toast Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Bell className='h-5 w-5' />
                    Toast Notifications
                  </CardTitle>
                  <CardDescription>Farklı türlerde bildirim mesajları</CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <Button
                    variant='outline'
                    onClick={() => showSampleToast('success')}
                    className='w-full justify-start'
                    size='sm'
                  >
                    <CheckCircle className='h-4 w-4 mr-2 text-green-500' />
                    Success Toast
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => showSampleToast('error')}
                    className='w-full justify-start'
                    size='sm'
                  >
                    <XCircle className='h-4 w-4 mr-2 text-red-500' />
                    Error Toast
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => showSampleToast('warning')}
                    className='w-full justify-start'
                    size='sm'
                  >
                    <AlertCircle className='h-4 w-4 mr-2 text-yellow-500' />
                    Warning Toast
                  </Button>
                  <Button
                    variant='outline'
                    onClick={() => showSampleToast('info')}
                    className='w-full justify-start'
                    size='sm'
                  >
                    <Info className='h-4 w-4 mr-2 text-blue-500' />
                    Info Toast
                  </Button>
                </CardContent>
              </Card>

              {/* Loading States */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Clock className='h-5 w-5' />
                    Loading States
                  </CardTitle>
                  <CardDescription>Yükleme durumu animasyonları</CardDescription>
                </CardHeader>
                <CardContent className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>Spinner</span>
                      <div className='flex items-center gap-3'>
                        <LoadingSpinner size='sm' />
                        <LoadingSpinner size='md' />
                        <LoadingSpinner size='lg' />
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>Dots</span>
                      <div className='flex items-center gap-3'>
                        <LoadingDots size='sm' />
                        <LoadingDots size='md' />
                        <LoadingDots size='lg' />
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium'>Pulse</span>
                      <div className='flex items-center gap-3'>
                        <LoadingPulse size='sm' />
                        <LoadingPulse size='md' />
                        <LoadingPulse size='lg' />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dialog Component */}
              <Card className='lg:col-span-2'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Layout className='h-5 w-5' />
                    Dialog Component
                  </CardTitle>
                  <CardDescription>Modal dialog penceresi örneği</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className='w-full sm:w-auto'>Dialog Aç</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Sea UI Kit Dialog</DialogTitle>
                        <DialogDescription>
                          Bu bir örnek dialog penceresidir. Modal overlay ile açılır ve kapatılabilir.
                        </DialogDescription>
                      </DialogHeader>
                      <div className='py-4'>
                        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                          Dialog içeriği buraya gelir. Form elementleri, bilgi metinleri veya onay mesajları
                          gösterilebilir.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                          İptal
                        </Button>
                        <Button
                          onClick={() => {
                            setIsDialogOpen(false)
                            showSampleToast('success')
                          }}
                        >
                          Onayla
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Getting Started CTA */}
      <section className='bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 dark:from-primary-600 dark:via-accent-600 dark:to-primary-700'>
        <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <h2 className='text-3xl md:text-4xl font-bold text-white'>Sea UI Kit ile Başlayın</h2>
              <p className='text-xl text-white/90 max-w-2xl mx-auto'>
                Modern React uygulamanızı hızlıca geliştirmek için gereken her şey
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4'>
                  <Download className='h-6 w-6' />
                </div>
                <h3 className='font-semibold mb-2'>1. Kurulum</h3>
                <p className='text-sm text-white/80 mb-4'>NPM veya Yarn ile kolayca kurulum yapın</p>
                <code className='text-xs bg-black/20 px-3 py-2 rounded block'>npm install sea-ui-kit</code>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4'>
                  <Code className='h-6 w-6' />
                </div>
                <h3 className='font-semibold mb-2'>2. Import</h3>
                <p className='text-sm text-white/80 mb-4'>İhtiyacınız olan bileşenleri import edin</p>
                <code className='text-xs bg-black/20 px-3 py-2 rounded block'>
                  {`import { Button } from 'sea-ui-kit'`}
                </code>
              </div>

              <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white'>
                <div className='inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4'>
                  <Zap className='h-6 w-6' />
                </div>
                <h3 className='font-semibold mb-2'>3. Kullanım</h3>
                <p className='text-sm text-white/80 mb-4'>Bileşenleri uygulamanızda kullanın</p>
                <code className='text-xs bg-black/20 px-3 py-2 rounded block'>{`<Button>Click me</Button>`}</code>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' variant='outline' className='bg-white text-primary-600 hover:bg-white/90 border-white'>
                <BookOpen className='h-5 w-5 mr-2' />
                Dokümantasyonu İncele
              </Button>
              <Button size='lg' variant='ghost' className='text-white border-white/20 hover:bg-white/10'>
                <Github className='h-5 w-5 mr-2' />
                GitHub Repository
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
