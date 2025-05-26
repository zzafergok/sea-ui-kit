// src/app/(auth)/components/page.tsx

'use client'

import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
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
  Heart,
  Star,
  Share2,
  Bookmark,
  Mail,
  Settings,
  Search,
  Download,
  Eye,
  MessageCircle,
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
} from 'lucide-react'
import { useAppDispatch } from '@/store'
import { showToast } from '@/store/slices/toastSlice'

export default function ComponentsPage() {
  const dispatch = useAppDispatch()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false,
    theme: 'light',
    category: '',
  })

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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className='px-4 py-6 sm:px-0'>
      {/* Header Section */}
      <div className='mb-12 text-center'>
        <h1 className='text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4'>Sea UI Kit Components</h1>
        <p className='text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto'>
          Modern React uygulamaları için tasarlanmış kapsamlı bileşen koleksiyonu. Her bileşen Radix UI primitifleri
          üzerine inşa edilmiş olup, erişilebilir ve özelleştirilebilir yapıdadır.
        </p>
      </div>

      {/* Components Grid */}
      <div className='space-y-16'>
        {/* Button Components Section */}
        <section className='space-y-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4'>
              <MousePointer className='h-8 w-8 text-primary-600 dark:text-primary-400' />
            </div>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>
              Button & Action Components
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
              Kullanıcı etkileşimleri için tasarlanmış buton ve aksiyon bileşenleri
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            {/* Button Variants */}
            <Card hover='lift'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Code className='h-5 w-5' />
                  Button Variants
                </CardTitle>
                <CardDescription>Farklı görsel stiller ve boyutlarda buton bileşenleri</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  <div className='flex flex-wrap gap-2'>
                    <Button variant='default' size='sm'>
                      Default
                    </Button>
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
                    <Button disabled size='sm'>
                      Disabled
                    </Button>
                  </div>
                </div>
                <div className='pt-2 border-t border-neutral-200 dark:border-neutral-700'>
                  <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                    Size: sm, md, lg, icon | Variant: default, secondary, outline, ghost, destructive
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Card */}
            <Card hover='glow' interactive onClick={() => showSampleToast('success')}>
              <CardActionArea>
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div>
                      <CardTitle className='flex items-center gap-2'>
                        <Zap className='h-5 w-5' />
                        Interactive Card
                      </CardTitle>
                      <CardDescription>Tıklanabilir kart bileşeni örneği</CardDescription>
                    </div>
                    <CardBadge variant='success'>Clickable</CardBadge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    Bu kartın herhangi bir yerine tıklayarak toast bildirimini tetikleyebilirsiniz. Hover efekti ve
                    görsel geri bildirimler kullanıcı deneyimini geliştirir.
                  </p>
                </CardContent>
              </CardActionArea>
            </Card>

            {/* Theme Controls */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Palette className='h-5 w-5' />
                  Theme Controls
                </CardTitle>
                <CardDescription>Tema ve dil değiştirme kontrolleri</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <label className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Tema Modu</label>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>Açık, koyu veya sistem teması</p>
                  </div>
                  <ThemeToggle />
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <label className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Dil Seçimi</label>
                    <p className='text-xs text-neutral-500 dark:text-neutral-400'>Türkçe veya İngilizce</p>
                  </div>
                  <LanguageToggle />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Components Section */}
        <section className='space-y-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-4'>
              <Layout className='h-8 w-8 text-accent-600 dark:text-accent-400' />
            </div>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>Form Components</h2>
            <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
              Veri girişi ve kullanıcı etkileşimi için tasarlanmış form bileşenleri
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Comprehensive Form */}
            <Card className='lg:col-span-2'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Mail className='h-5 w-5' />
                  Form Elements Demo
                </CardTitle>
                <CardDescription>Tüm form elementlerinin bir arada kullanımı</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Ad Soyad</label>
                    <Input
                      placeholder='Adınızı ve soyadınızı girin'
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>E-posta Adresi</label>
                    <Input
                      type='email'
                      placeholder='email@example.com'
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Kategori Seçimi</label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder='Bir kategori seçin' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='frontend'>Frontend Geliştirme</SelectItem>
                      <SelectItem value='backend'>Backend Geliştirme</SelectItem>
                      <SelectItem value='design'>UI/UX Tasarım</SelectItem>
                      <SelectItem value='mobile'>Mobil Uygulama</SelectItem>
                      <SelectItem value='other'>Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <label className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Mesajınız</label>
                  <Textarea
                    placeholder='Mesajınızı buraya yazabilirsiniz...'
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Checkbox
                      id='newsletter'
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                    />
                    <label htmlFor='newsletter' className='text-sm text-neutral-700 dark:text-neutral-300'>
                      Newsletter aboneliği ve güncellemeler hakkında bilgi almak istiyorum
                    </label>
                  </div>

                  <div className='flex items-center space-x-3'>
                    <Switch id='notifications' />
                    <label htmlFor='notifications' className='text-sm text-neutral-700 dark:text-neutral-300'>
                      Push bildirimleri etkinleştir
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      message: '',
                      newsletter: false,
                      theme: 'light',
                      category: '',
                    })
                  }}
                >
                  Formu Temizle
                </Button>
                <Button onClick={() => showSampleToast('success')}>Formu Gönder</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Feedback Components Section */}
        <section className='space-y-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4'>
              <MessageCircle className='h-8 w-8 text-green-600 dark:text-green-400' />
            </div>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>Feedback Components</h2>
            <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
              Kullanıcıya geri bildirim sağlayan bileşenler ve durumu gösterenler
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
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
                  <CheckCircle className='h-4 w-4 mr-2' />
                  Success Toast
                </Button>
                <Button
                  variant='outline'
                  onClick={() => showSampleToast('error')}
                  className='w-full justify-start'
                  size='sm'
                >
                  <XCircle className='h-4 w-4 mr-2' />
                  Error Toast
                </Button>
                <Button
                  variant='outline'
                  onClick={() => showSampleToast('warning')}
                  className='w-full justify-start'
                  size='sm'
                >
                  <AlertCircle className='h-4 w-4 mr-2' />
                  Warning Toast
                </Button>
                <Button
                  variant='outline'
                  onClick={() => showSampleToast('info')}
                  className='w-full justify-start'
                  size='sm'
                >
                  <Info className='h-4 w-4 mr-2' />
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
                <CardDescription>Yükleme durumları ve animasyonları</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Spinner</span>
                    <div className='flex items-center gap-3'>
                      <LoadingSpinner size='sm' />
                      <LoadingSpinner size='md' />
                      <LoadingSpinner size='lg' />
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Dots</span>
                    <div className='flex items-center gap-3'>
                      <LoadingDots size='sm' />
                      <LoadingDots size='md' />
                      <LoadingDots size='lg' />
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-sm'>Pulse</span>
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
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Layout className='h-5 w-5' />
                  Dialog Component
                </CardTitle>
                <CardDescription>Modal dialog penceresi bileşeni</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                  Overlay ile açılan modal pencere bileşeni. Form, onay mesajları ve detaylı bilgiler için kullanılır.
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className='w-full'>Dialog Aç</Button>
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
                        Dialog içeriği buraya gelir. Form elementleri, bilgi metinleri veya onay mesajları kullanıcıya
                        gösterilebilir. ESC tuşu ile veya overlay&apos;e tıklayarak kapatılabilir.
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
        </section>

        {/* Layout Components Section */}
        <section className='space-y-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4'>
              <Layout className='h-8 w-8 text-purple-600 dark:text-purple-400' />
            </div>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>
              Layout & Display Components
            </h2>
            <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
              İçerik düzeni ve görsel organizasyon için tasarlanmış bileşenler
            </p>
          </div>

          <div className='space-y-6'>
            {/* Card Variants */}
            <div>
              <h3 className='text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4'>Card Variants</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                <Card variant='default' size='sm'>
                  <CardHeader>
                    <CardTitle className='text-base'>Default Card</CardTitle>
                    <CardDescription className='text-xs'>Standart kart stili</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm'>Varsayılan tasarım</p>
                  </CardContent>
                </Card>

                <Card variant='success' size='sm'>
                  <CardHeader>
                    <CardTitle className='text-base'>Success Card</CardTitle>
                    <CardDescription className='text-xs'>Başarılı işlemler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm'>Yeşil tonlarda</p>
                  </CardContent>
                </Card>

                <Card variant='warning' size='sm'>
                  <CardHeader>
                    <CardTitle className='text-base'>Warning Card</CardTitle>
                    <CardDescription className='text-xs'>Uyarı durumları</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm'>Sarı tonlarda</p>
                  </CardContent>
                </Card>

                <Card variant='destructive' size='sm'>
                  <CardHeader>
                    <CardTitle className='text-base'>Error Card</CardTitle>
                    <CardDescription className='text-xs'>Hata durumları</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm'>Kırmızı tonlarda</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tabs Component */}
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <Layout className='h-5 w-5' />
                  Tabs Navigation
                </CardTitle>
                <CardDescription>Sekmeli navigasyon bileşeni örneği</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue='overview' className='w-full'>
                  <TabsList className='grid w-full grid-cols-4'>
                    <TabsTrigger value='overview'>Genel Bakış</TabsTrigger>
                    <TabsTrigger value='features'>Özellikler</TabsTrigger>
                    <TabsTrigger value='pricing'>Fiyatlandırma</TabsTrigger>
                    <TabsTrigger value='support'>Destek</TabsTrigger>
                  </TabsList>
                  <TabsContent value='overview' className='mt-6'>
                    <div className='space-y-3'>
                      <h4 className='font-medium text-neutral-900 dark:text-neutral-100'>Sea UI Kit Genel Bakış</h4>
                      <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                        Modern React uygulamaları için tasarlanmış comprehensive bileşen kütüphanesi. Radix UI
                        primitifleri üzerine inşa edilmiş, TypeScript desteği ile geliştirilmiştir.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value='features' className='mt-6'>
                    <div className='space-y-3'>
                      <h4 className='font-medium text-neutral-900 dark:text-neutral-100'>Temel Özellikler</h4>
                      <ul className='text-sm text-neutral-600 dark:text-neutral-400 space-y-1'>
                        <li>• Erişilebilir ve WAI-ARIA uyumlu</li>
                        <li>• Tam TypeScript desteği</li>
                        <li>• Koyu/açık tema desteği</li>
                        <li>• Responsive tasarım</li>
                        <li>• Özelleştirilebilir stiller</li>
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value='pricing' className='mt-6'>
                    <div className='space-y-3'>
                      <h4 className='font-medium text-neutral-900 dark:text-neutral-100'>Fiyatlandırma</h4>
                      <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                        Sea UI Kit açık kaynak kodlu bir projedir. MIT lisansı ile ücretsiz olarak ticari ve kişisel
                        projelerde kullanılabilir.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value='support' className='mt-6'>
                    <div className='space-y-3'>
                      <h4 className='font-medium text-neutral-900 dark:text-neutral-100'>Destek ve Dokümantasyon</h4>
                      <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                        Kapsamlı dokümantasyon, örnek kullanımlar ve topluluk desteği ile geliştirme sürecinizi
                        hızlandırın.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Media Card Example */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <Card hover='lift' className='overflow-hidden'>
                <CardMedia src='/api/placeholder/400/200' alt='Component showcase' aspectRatio='video' />
                <CardHeader>
                  <div className='flex items-start justify-between'>
                    <div>
                      <CardTitle className='text-lg'>Media Card</CardTitle>
                      <CardDescription>Görsel içerikli kart bileşeni</CardDescription>
                    </div>
                    <CardBadge variant='default'>Featured</CardBadge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    Görsel ve metin içeriğini birleştiren kart bileşeni. Blog yazıları, ürün kartları ve galeri öğeleri
                    için idealdir.
                  </p>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <div className='flex gap-2'>
                    <Button size='sm' variant='ghost'>
                      <Heart className='h-4 w-4' />
                    </Button>
                    <Button size='sm' variant='ghost'>
                      <Share2 className='h-4 w-4' />
                    </Button>
                    <Button size='sm' variant='ghost'>
                      <Bookmark className='h-4 w-4' />
                    </Button>
                  </div>
                  <Button size='sm'>Detayları Gör</Button>
                </CardFooter>
              </Card>

              <Card hover='glow'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Star className='h-5 w-5 text-yellow-500' />
                    Feature Card
                  </CardTitle>
                  <CardDescription>Özellik tanıtım kartı</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    Ürün özellikleri, hizmetler veya yetenekleri tanıtmak için tasarlanmış kart yapısı. İkon ve açıklama
                    kombinasyonu sunar.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant='outline' className='w-full'>
                    Daha Fazla Bilgi
                  </Button>
                </CardFooter>
              </Card>

              <Card variant='info'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Info className='h-5 w-5' />
                    Info Card
                  </CardTitle>
                  <CardDescription>Bilgilendirme kartı</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    Kullanıcıya önemli bilgileri iletmek için tasarlanmış kart yapısı. Mavi tonlarda dikkat çekici
                    görünüm sunar.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant='outline' size='sm' className='w-full'>
                    <Eye className='h-4 w-4 mr-2' />
                    Görüntüle
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Component Statistics Section */}
        <section className='space-y-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4'>
              <Settings className='h-8 w-8 text-neutral-600 dark:text-neutral-400' />
            </div>
            <h2 className='text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2'>Component Statistics</h2>
            <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
              Sea UI Kit bileşen koleksiyonunun genel görünümü
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card className='text-center'>
              <CardContent className='pt-6'>
                <div className='text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2'>25+</div>
                <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>UI Components</p>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>Ready to use</p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='pt-6'>
                <div className='text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2'>100%</div>
                <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>TypeScript</p>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>Type safe</p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='pt-6'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-400 mb-2'>A11Y</div>
                <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Accessible</p>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>WAI-ARIA compliant</p>
              </CardContent>
            </Card>

            <Card className='text-center'>
              <CardContent className='pt-6'>
                <div className='text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2'>MIT</div>
                <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>Open Source</p>
                <p className='text-xs text-neutral-500 dark:text-neutral-400'>Free to use</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className='space-y-8'>
          <Card className='border-2 border-primary-200 dark:border-primary-800 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950'>
            <CardHeader className='text-center'>
              <CardTitle className='text-2xl'>Sea UI Kit ile Başlayın</CardTitle>
              <CardDescription className='text-base'>
                Modern React uygulamanızı hızlıca geliştirmek için gereken her şey
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center space-y-3'>
                  <div className='inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full'>
                    <Download className='h-6 w-6 text-primary-600 dark:text-primary-400' />
                  </div>
                  <h3 className='font-semibold text-neutral-900 dark:text-neutral-100'>1. Kurulum</h3>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    NPM veya Yarn ile kolayca kurulum yapın
                  </p>
                  <code className='text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded'>
                    npm install sea-ui-kit
                  </code>
                </div>

                <div className='text-center space-y-3'>
                  <div className='inline-flex items-center justify-center w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-full'>
                    <Code className='h-6 w-6 text-accent-600 dark:text-accent-400' />
                  </div>
                  <h3 className='font-semibold text-neutral-900 dark:text-neutral-100'>2. Import</h3>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    İhtiyacınız olan bileşenleri import edin
                  </p>
                  <code className='text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded'>
                    {`import { Button } from 'sea-ui-kit'`}
                  </code>
                </div>

                <div className='text-center space-y-3'>
                  <div className='inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full'>
                    <Zap className='h-6 w-6 text-green-600 dark:text-green-400' />
                  </div>
                  <h3 className='font-semibold text-neutral-900 dark:text-neutral-100'>3. Kullanım</h3>
                  <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                    Bileşenleri uygulamanızda kullanmaya başlayın
                  </p>
                  <code className='text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded'>
                    {`<Button>Click me</Button>`}
                  </code>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button size='lg' className='flex items-center gap-2'>
                <Download className='h-4 w-4' />
                Dokümantasyonu İncele
              </Button>
              <Button variant='outline' size='lg' className='flex items-center gap-2'>
                <Search className='h-4 w-4' />
                GitHub Repository
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  )
}
