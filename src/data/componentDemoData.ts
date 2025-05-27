import React from 'react'

import { Label } from '@/components/Label/Label'
import { Input } from '@/components/Input/Input'
import { Switch } from '@/components/Switch/Switch'
import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Textarea } from '@/components/Textarea/Textarea'
import { FileUploadExample } from '@/components/FileUpload/FileUpload'
import { PageHeaderExample } from '@/components/PageHeader/PageHeader'
import { Skeleton, SkeletonText, SkeletonAvatar } from '@/components/Skeleton/Skeleton'
import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/Loading/LoadingSpinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select/Select'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/Dropdown/Dropdown'

import { Mail, Search, MoreHorizontal } from 'lucide-react'

// componentDemoData array'ine eklenecek yeni bileşenler:
export const componentDemoData = [
  // Checkbox bileşeni
  {
    id: 'checkbox',
    title: 'Checkbox',
    description: 'Seçim yapma işlemleri için kullanılan onay kutusu bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'space-y-3' }, [
      React.createElement('div', { key: 'item1', className: 'flex items-center space-x-2' }, [
        React.createElement(Checkbox, { key: 'cb1', id: 'terms1', defaultChecked: true }),
        React.createElement(
          'label',
          { key: 'label1', htmlFor: 'terms1', className: 'text-sm font-medium' },
          'Seçili Checkbox',
        ),
      ]),
      React.createElement('div', { key: 'item2', className: 'flex items-center space-x-2' }, [
        React.createElement(Checkbox, { key: 'cb2', id: 'terms2' }),
        React.createElement(
          'label',
          { key: 'label2', htmlFor: 'terms2', className: 'text-sm font-medium' },
          'Seçili Değil',
        ),
      ]),
      React.createElement('div', { key: 'item3', className: 'flex items-center space-x-2' }, [
        React.createElement(Checkbox, { key: 'cb3', id: 'terms3', disabled: true }),
        React.createElement(
          'label',
          { key: 'label3', htmlFor: 'terms3', className: 'text-sm font-medium text-neutral-400' },
          'Devre Dışı',
        ),
      ]),
    ]),
    code: `import { Checkbox } from '@/components/Checkbox/Checkbox'

function Example() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms1" defaultChecked />
        <label htmlFor="terms1">Seçili Checkbox</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms2" />
        <label htmlFor="terms2">Seçili Değil</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms3" disabled />
        <label htmlFor="terms3">Devre Dışı</label>
      </div>
    </div>
  )
}`,
    usageExamples: [
      {
        title: 'Form Group',
        description: 'Form içinde checkbox grubu kullanımı',
        code: `<div className="space-y-2">
  <p className="font-medium">İlgi Alanlarınız:</p>
  <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Checkbox id="frontend" />
      <label htmlFor="frontend">Frontend Development</label>
    </div>
    <div className="flex items-center space-x-2">
      <Checkbox id="backend" />
      <label htmlFor="backend">Backend Development</label>
    </div>
  </div>
</div>`,
        component: React.createElement('div', { className: 'space-y-2' }, [
          React.createElement('p', { key: 'title', className: 'font-medium' }, 'İlgi Alanlarınız:'),
          React.createElement('div', { key: 'group', className: 'space-y-2' }, [
            React.createElement('div', { key: 'frontend', className: 'flex items-center space-x-2' }, [
              React.createElement(Checkbox, { key: 'cb', id: 'frontend-demo' }),
              React.createElement('label', { key: 'label', htmlFor: 'frontend-demo' }, 'Frontend Development'),
            ]),
            React.createElement('div', { key: 'backend', className: 'flex items-center space-x-2' }, [
              React.createElement(Checkbox, { key: 'cb', id: 'backend-demo' }),
              React.createElement('label', { key: 'label', htmlFor: 'backend-demo' }, 'Backend Development'),
            ]),
          ]),
        ]),
      },
    ],
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Checkbox seçili mi (controlled)',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'Varsayılan seçili durumu (uncontrolled)',
        default: 'false',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Checkbox devre dışı mı',
        default: 'false',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        description: 'Seçim durumu değiştiğinde çağırılan fonksiyon',
      },
    ],
  },
  // Switch bileşeni
  {
    id: 'switch',
    title: 'Switch',
    description: 'Açma/kapama işlemleri için kullanılan toggle switch bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'space-y-4' }, [
      React.createElement('div', { key: 'item1', className: 'flex items-center justify-between' }, [
        React.createElement('span', { key: 'label', className: 'text-sm font-medium' }, 'Bildirimler'),
        React.createElement(Switch, { key: 'switch', defaultChecked: true }),
      ]),
      React.createElement('div', { key: 'item2', className: 'flex items-center justify-between' }, [
        React.createElement('span', { key: 'label', className: 'text-sm font-medium' }, 'Email Güncellemeleri'),
        React.createElement(Switch, { key: 'switch' }),
      ]),
      React.createElement('div', { key: 'item3', className: 'flex items-center justify-between' }, [
        React.createElement('span', { key: 'label', className: 'text-sm font-medium text-neutral-400' }, 'Devre Dışı'),
        React.createElement(Switch, { key: 'switch', disabled: true }),
      ]),
    ]),
    code: `import { Switch } from '@/components/Switch/Switch'

function Example() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Bildirimler</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span>Email Güncellemeleri</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <span>Devre Dışı</span>
        <Switch disabled />
      </div>
    </div>
  )
}`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'Switch açık mı (controlled)',
      },
      {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'Varsayılan açık durumu (uncontrolled)',
        default: 'false',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Switch devre dışı mı',
        default: 'false',
      },
      {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        description: 'Durum değiştiğinde çağırılan fonksiyon',
      },
    ],
  },
  // Select bileşeni
  {
    id: 'select',
    title: 'Select',
    description: 'Seçenekler arasından seçim yapmak için kullanılan dropdown bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'space-y-3 w-full max-w-sm' }, [
      React.createElement(Select, { key: 'basic' }, [
        React.createElement(SelectTrigger, { key: 'trigger' }, [
          React.createElement(SelectValue, { key: 'value', placeholder: 'Ülke seçin' }),
        ]),
        React.createElement(SelectContent, { key: 'content' }, [
          React.createElement(SelectItem, { key: 'tr', value: 'tr' }, 'Türkiye'),
          React.createElement(SelectItem, { key: 'us', value: 'us' }, 'Amerika'),
          React.createElement(SelectItem, { key: 'de', value: 'de' }, 'Almanya'),
          React.createElement(SelectItem, { key: 'fr', value: 'fr' }, 'Fransa'),
        ]),
      ]),
    ]),
    code: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select/Select'

function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Ülke seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tr">Türkiye</SelectItem>
        <SelectItem value="us">Amerika</SelectItem>
        <SelectItem value="de">Almanya</SelectItem>
        <SelectItem value="fr">Fransa</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
    props: [
      {
        name: 'value',
        type: 'string',
        description: 'Seçili değer (controlled)',
      },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'Varsayılan seçili değer (uncontrolled)',
      },
      {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Değer değiştiğinde çağırılan fonksiyon',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
      },
    ],
  },
  // Loading bileşenleri
  {
    id: 'loading-spinner',
    title: 'Loading Spinner',
    description: 'Çeşitli stillerde yükleme animasyonları',
    category: 'Geri Bildirim',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'flex items-center space-x-6' }, [
      React.createElement('div', { key: 'spinner', className: 'text-center space-y-2' }, [
        React.createElement(LoadingSpinner, { key: 'component', size: 'lg' }),
        React.createElement('p', { key: 'label', className: 'text-xs text-neutral-500' }, 'Spinner'),
      ]),
      React.createElement('div', { key: 'dots', className: 'text-center space-y-2' }, [
        React.createElement(LoadingDots, { key: 'component', size: 'lg' }),
        React.createElement('p', { key: 'label', className: 'text-xs text-neutral-500' }, 'Dots'),
      ]),
      React.createElement('div', { key: 'pulse', className: 'text-center space-y-2' }, [
        React.createElement(LoadingPulse, { key: 'component', size: 'lg' }),
        React.createElement('p', { key: 'label', className: 'text-xs text-neutral-500' }, 'Pulse'),
      ]),
    ]),
    code: `import { LoadingSpinner, LoadingDots, LoadingPulse } from '@/components/Loading/LoadingSpinner'

function Example() {
  return (
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-xs text-neutral-500 mt-2">Spinner</p>
      </div>
      <div className="text-center">
        <LoadingDots size="lg" />
        <p className="text-xs text-neutral-500 mt-2">Dots</p>
      </div>
      <div className="text-center">
        <LoadingPulse size="lg" />
        <p className="text-xs text-neutral-500 mt-2">Pulse</p>
      </div>
    </div>
  )
}`,
    props: [
      {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        description: 'Spinner boyutu',
        default: 'md',
      },
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'white' | 'accent'",
        description: 'Spinner renk varyantı',
        default: 'default',
      },
      {
        name: 'text',
        type: 'string',
        description: 'Spinner ile birlikte gösterilecek metin',
      },
    ],
  },
  // Skeleton bileşeni
  {
    id: 'skeleton',
    title: 'Skeleton',
    description: 'İçerik yükleme durumu için placeholder bileşenleri',
    category: 'Geri Bildirim',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'space-y-4 w-full max-w-sm' }, [
      React.createElement('div', { key: 'header', className: 'flex items-center space-x-4' }, [
        React.createElement(SkeletonAvatar, { key: 'avatar', size: 48 }),
        React.createElement('div', { key: 'info', className: 'space-y-2 flex-1' }, [
          React.createElement(Skeleton, { key: 'name', width: '60%', height: 16 }),
          React.createElement(Skeleton, { key: 'email', width: '80%', height: 14 }),
        ]),
      ]),
      React.createElement(SkeletonText, { key: 'text', lines: 3 }),
      React.createElement(Skeleton, { key: 'image', width: '100%', height: 120 }),
    ]),
    code: `import { Skeleton, SkeletonText, SkeletonAvatar } from '@/components/Loading/Skeleton'

function Example() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex items-center space-x-4">
        <SkeletonAvatar size={48} />
        <div className="space-y-2 flex-1">
          <Skeleton width="60%" height={16} />
          <Skeleton width="80%" height={14} />
        </div>
      </div>
      <SkeletonText lines={3} />
      <Skeleton width="100%" height={120} />
    </div>
  )
}`,
    props: [
      {
        name: 'width',
        type: 'number | string',
        description: 'Skeleton genişliği',
      },
      {
        name: 'height',
        type: 'number | string',
        description: 'Skeleton yüksekliği',
      },
      {
        name: 'variant',
        type: "'default' | 'circular' | 'rectangular' | 'text'",
        description: 'Skeleton şekli',
        default: 'default',
      },
      {
        name: 'lines',
        type: 'number',
        description: 'Text skeleton için satır sayısı',
      },
    ],
  },
  // Textarea bileşeni
  {
    id: 'textarea',
    title: 'Textarea',
    description: 'Çok satırlı metin girişi bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'space-y-4 w-full max-w-sm' }, [
      React.createElement(Textarea, {
        key: 'basic',
        placeholder: 'Temel textarea...',
        rows: 3,
      }),
      React.createElement(Textarea, {
        key: 'counter',
        placeholder: 'Karakter sayacı ile...',
        maxLength: 100,
        showCount: true,
        rows: 3,
      }),
    ]),
    code: `import { Textarea } from '@/components/Textarea/Textarea'

function Example() {
  return (
    <div className="space-y-4">
      <Textarea 
        placeholder="Temel textarea..."
        rows={3}
      />
      <Textarea 
        placeholder="Karakter sayacı ile..."
        maxLength={100}
        showCount={true}
        rows={3}
      />
    </div>
  )
}`,
    props: [
      {
        name: 'maxLength',
        type: 'number',
        description: 'Maksimum karakter sayısı',
      },
      {
        name: 'showCount',
        type: 'boolean',
        description: 'Karakter sayacını göster',
        default: 'false',
      },
      {
        name: 'autoResize',
        type: 'boolean',
        description: 'İçerik boyutuna göre otomatik yeniden boyutlandır',
        default: 'false',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Hata durumu',
      },
    ],
  },
  // Accordion bileşeni
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Genişletilebilir ve daraltılabilir içerik bölümleri için kullanılan bileşen',
    category: 'Navigasyon',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'w-full max-w-md space-y-2' }, [
      React.createElement(
        'div',
        {
          key: 'accordion-container',
          className:
            'border border-neutral-200 dark:border-neutral-700 rounded-lg divide-y divide-neutral-200 dark:divide-neutral-700',
        },
        [
          React.createElement('details', { key: 'item1', className: 'group' }, [
            React.createElement(
              'summary',
              {
                key: 'summary1',
                className:
                  'flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors',
              },
              [
                React.createElement('span', { key: 'text', className: 'font-medium' }, 'Özellikler'),
                React.createElement(
                  'span',
                  { key: 'icon', className: 'text-neutral-500 group-open:rotate-180 transition-transform' },
                  '▼',
                ),
              ],
            ),
            React.createElement(
              'div',
              { key: 'content1', className: 'p-4 pt-0 text-sm text-neutral-600 dark:text-neutral-400' },
              'Bu bileşen kolayca özelleştirilebilir ve erişilebilir tasarım prensiplerine uygun olarak geliştirilmiştir.',
            ),
          ]),
          React.createElement('details', { key: 'item2', className: 'group' }, [
            React.createElement(
              'summary',
              {
                key: 'summary2',
                className:
                  'flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors',
              },
              [
                React.createElement('span', { key: 'text', className: 'font-medium' }, 'Kullanım'),
                React.createElement(
                  'span',
                  { key: 'icon', className: 'text-neutral-500 group-open:rotate-180 transition-transform' },
                  '▼',
                ),
              ],
            ),
            React.createElement(
              'div',
              { key: 'content2', className: 'p-4 pt-0 text-sm text-neutral-600 dark:text-neutral-400' },
              'Form alanları, ayarlar menüsü ve SSS bölümleri gibi çeşitli senaryolarda kullanılabilir.',
            ),
          ]),
        ],
      ),
    ]),
    code: `import { Accordion } from '@/components/Accordion/Accordion'

function Example() {
  return (
    <Accordion.Root defaultValue={['item-1']} type="multiple">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Özellikler</Accordion.Trigger>
        <Accordion.Content>
          Bu bileşen kolayca özelleştirilebilir ve erişilebilir tasarım
          prensiplerine uygun olarak geliştirilmiştir.
        </Accordion.Content>
      </Accordion.Item>
      
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Kullanım</Accordion.Trigger>
        <Accordion.Content>
          Form alanları, ayarlar menüsü ve SSS bölümleri gibi
          çeşitli senaryolarda kullanılabilir.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}`,
    props: [
      {
        name: 'type',
        type: "'single' | 'multiple'",
        description: 'Tek seferde bir veya birden fazla öğenin açık olmasına izin verir',
        default: 'single',
      },
      {
        name: 'defaultValue',
        type: 'string[]',
        description: 'Varsayılan olarak açık olan öğelerin değerleri',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        description: 'Açık öğenin kapatılmasına izin verir (type="single" için)',
        default: 'true',
      },
    ],
  },
  // Alert Dialog bileşeni
  {
    id: 'alert-dialog',
    title: 'Alert Dialog',
    description: 'Kullanıcıdan onay almak veya önemli bilgileri iletmek için kullanılan uyarı dialog bileşeni',
    category: 'Geri Bildirim',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'flex items-center space-x-4' }, [
      React.createElement(
        'button',
        {
          key: 'trigger',
          className:
            'px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium',
          onClick: () => {
            if (typeof window !== 'undefined') {
              const confirmed = window.confirm('Bu işlemi gerçekleştirmek istediğinizden emin misiniz?')
              if (confirmed) {
                alert('İşlem onaylandı!')
              }
            }
          },
        },
        'Hesabı Sil',
      ),
      React.createElement(
        'span',
        { key: 'info', className: 'text-sm text-neutral-500' },
        "Tıklayarak örnek dialog'u görün",
      ),
    ]),
    code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/AlertDialog/AlertDialog'

function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Hesabı Sil</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            Bu işlem geri alınamaz. Hesabınız kalıcı olarak silinecek
            ve tüm verileriniz sunucularımızdan kaldırılacaktır.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction>Evet, sil</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Dialog açık mı (controlled)',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Dialog durumu değiştiğinde çağırılan fonksiyon',
      },
    ],
  },
  // Avatar bileşeni
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'Kullanıcı profil resmi gösterimi için kullanılan bileşen, fallback desteği ile',
    category: 'Veri Gösterimi',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'flex items-center space-x-4' }, [
      React.createElement('div', { key: 'avatar1', className: 'flex flex-col items-center space-y-2' }, [
        React.createElement(
          'div',
          { key: 'container', className: 'w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center' },
          React.createElement('span', { className: 'text-white font-medium' }, 'JD'),
        ),
        React.createElement('span', { key: 'label', className: 'text-xs text-neutral-500' }, 'Varsayılan'),
      ]),
      React.createElement('div', { key: 'avatar2', className: 'flex flex-col items-center space-y-2' }, [
        React.createElement(
          'div',
          {
            key: 'container',
            className:
              'w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center',
          },
          React.createElement('span', { className: 'text-white font-medium' }, 'AB'),
        ),
        React.createElement('span', { key: 'label', className: 'text-xs text-neutral-500' }, 'Renkli'),
      ]),
      React.createElement('div', { key: 'avatar3', className: 'flex flex-col items-center space-y-2' }, [
        React.createElement(
          'div',
          {
            key: 'container',
            className: 'w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center',
          },
          React.createElement('span', { className: 'text-neutral-600 dark:text-neutral-300 text-lg' }, '👤'),
        ),
        React.createElement('span', { key: 'label', className: 'text-xs text-neutral-500' }, 'Icon'),
      ]),
    ]),
    code: `import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar/Avatar'

function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="/user-avatar.jpg" alt="@kullanici" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarImage src="/nonexistent.jpg" alt="@user" />
        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          AB
        </AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarFallback>
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}`,
    props: [
      {
        name: 'src',
        type: 'string',
        description: "Avatar resim URL'si",
      },
      {
        name: 'alt',
        type: 'string',
        description: 'Resim alternatif metni',
      },
      {
        name: 'fallback',
        type: 'ReactNode',
        description: 'Resim yüklenemediğinde gösterilecek içerik',
      },
    ],
  },
  // Button bileşeni (güncellenmiş)
  {
    id: 'button',
    title: 'Button',
    description: 'Farklı varyant ve boyutlarda etkileşimli buton bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'grid grid-cols-2 gap-4' }, [
      React.createElement(
        'button',
        {
          key: 'primary',
          className:
            'px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium text-sm',
        },
        'Primary',
      ),
      React.createElement(
        'button',
        {
          key: 'secondary',
          className:
            'px-4 py-2 bg-accent-500 text-white rounded-md hover:bg-accent-600 transition-colors font-medium text-sm',
        },
        'Secondary',
      ),
      React.createElement(
        'button',
        {
          key: 'outline',
          className:
            'px-4 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-50 transition-colors font-medium text-sm',
        },
        'Outline',
      ),
      React.createElement(
        'button',
        {
          key: 'ghost',
          className: 'px-4 py-2 text-primary-500 rounded-md hover:bg-primary-50 transition-colors font-medium text-sm',
        },
        'Ghost',
      ),
    ]),
    code: `import { Button } from '@/components/Button/Button'

function Example() {
  return (
    <div className="flex items-center space-x-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  )
}`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
        description: 'Buton görünüm varyantı',
        default: 'default',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'icon'",
        description: 'Buton boyutu',
        default: 'md',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        description: 'Butonu tam genişlik yapar',
        default: 'false',
      },
      {
        name: 'disabled',
        type: 'boolean',
        description: 'Butonu devre dışı bırakır',
        default: 'false',
      },
    ],
  },
  // Card bileşeni
  {
    id: 'card',
    title: 'Card',
    description: 'İçerik gruplamak ve organize etmek için kullanılan kart bileşeni',
    category: 'Layout',
    status: 'stable',
    demoComponent: React.createElement(
      'div',
      {
        className:
          'w-full max-w-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 p-6 space-y-4',
      },
      [
        React.createElement('div', { key: 'header', className: 'space-y-2' }, [
          React.createElement('h3', { key: 'title', className: 'text-lg font-semibold' }, 'Kart Başlığı'),
          React.createElement(
            'p',
            { key: 'description', className: 'text-sm text-neutral-500 dark:text-neutral-400' },
            'Bu bir örnek kart açıklamasıdır.',
          ),
        ]),
        React.createElement(
          'div',
          { key: 'content', className: 'text-sm' },
          'Kart içeriği burada yer alır. Metin, resim, buton ve diğer bileşenler eklenebilir.',
        ),
        React.createElement(
          'div',
          {
            key: 'footer',
            className: 'flex justify-between items-center pt-4 border-t border-neutral-200 dark:border-neutral-700',
          },
          [
            React.createElement(
              'button',
              {
                key: 'cancel',
                className: 'px-3 py-1 text-sm text-neutral-600 hover:text-neutral-800 transition-colors',
              },
              'İptal',
            ),
            React.createElement(
              'button',
              {
                key: 'action',
                className:
                  'px-4 py-2 bg-primary-500 text-white rounded text-sm font-medium hover:bg-primary-600 transition-colors',
              },
              'Kaydet',
            ),
          ],
        ),
      ],
    ),
    code: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card/Card'
import { Button } from '@/components/Button/Button'

function Example() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Kart Başlığı</CardTitle>
        <CardDescription>
          Bu bir örnek kart açıklamasıdır.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Kart içeriği burada yer alır. Metin, resim, buton ve 
          diğer bileşenler eklenebilir.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">İptal</Button>
        <Button>Kaydet</Button>
      </CardFooter>
    </Card>
  )
}`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
        description: 'Kart görünüm varyantı',
        default: 'default',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        description: 'Kart padding boyutu',
        default: 'md',
      },
      {
        name: 'hover',
        type: "'none' | 'lift' | 'glow' | 'scale'",
        description: 'Hover efekti türü',
        default: 'none',
      },
    ],
  },
  // Command Menu bileşeni
  {
    id: 'command-menu',
    title: 'Command Menu',
    description: 'Klavye kısayolları ile hızlı arama ve komut çalıştırma menüsü',
    category: 'Navigasyon',
    status: 'stable',
    demoComponent: React.createElement(
      'div',
      {
        className:
          'w-full max-w-md border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800',
      },
      [
        React.createElement(
          'div',
          { key: 'input', className: 'flex items-center border-b border-neutral-200 dark:border-neutral-700 px-3' },
          [
            React.createElement('span', { key: 'icon', className: 'text-neutral-400 mr-2' }, '🔍'),
            React.createElement('input', {
              key: 'search',
              type: 'text',
              placeholder: 'Komut ara...',
              className: 'flex-1 py-3 bg-transparent outline-none text-sm',
            }),
          ],
        ),
        React.createElement('div', { key: 'results', className: 'p-2 space-y-1' }, [
          React.createElement(
            'div',
            {
              key: 'item1',
              className:
                'flex items-center justify-between px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded text-sm cursor-pointer',
            },
            [
              React.createElement('span', { key: 'text' }, 'Yeni Dosya Oluştur'),
              React.createElement('span', { key: 'shortcut', className: 'text-xs text-neutral-500' }, '⌘N'),
            ],
          ),
          React.createElement(
            'div',
            {
              key: 'item2',
              className:
                'flex items-center justify-between px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded text-sm cursor-pointer',
            },
            [
              React.createElement('span', { key: 'text' }, 'Ayarları Aç'),
              React.createElement('span', { key: 'shortcut', className: 'text-xs text-neutral-500' }, '⌘,'),
            ],
          ),
        ]),
      ],
    ),
    code: `import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from '@/components/CommandMenu/CommandMenu'

function Example() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Komut ara..." />
      <CommandList>
        <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
        <CommandGroup heading="Dosya İşlemleri">
          <CommandItem>
            <span>Yeni Dosya</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Dosya Aç</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Ayarlar">
          <CommandItem>
            <span>Ayarları Aç</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`,
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Command menu açık mı (dialog modu için)',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Açık durumu değiştiğinde çağırılan fonksiyon',
      },
      {
        name: 'value',
        type: 'string',
        description: 'Seçili öğenin değeri',
      },
    ],
  },
  // Data Table bileşeni
  {
    id: 'data-table',
    title: 'Data Table',
    description: 'Sıralama, filtreleme ve sayfalama özellikleri ile gelişmiş veri tablosu',
    category: 'Veri Gösterimi',
    status: 'stable',
    demoComponent: React.createElement(
      'div',
      { className: 'w-full border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden' },
      [
        React.createElement(
          'div',
          {
            key: 'header',
            className:
              'bg-neutral-50 dark:bg-neutral-800 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700',
          },
          [
            React.createElement('input', {
              key: 'search',
              type: 'text',
              placeholder: 'Ara...',
              className:
                'px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded text-sm bg-white dark:bg-neutral-700 w-64',
            }),
          ],
        ),
        React.createElement('table', { key: 'table', className: 'w-full' }, [
          React.createElement(
            'thead',
            { key: 'thead', className: 'bg-neutral-50 dark:bg-neutral-800' },
            React.createElement('tr', { key: 'tr' }, [
              React.createElement('th', { key: 'name', className: 'px-4 py-3 text-left text-sm font-medium' }, 'İsim'),
              React.createElement(
                'th',
                { key: 'email', className: 'px-4 py-3 text-left text-sm font-medium' },
                'Email',
              ),
              React.createElement('th', { key: 'role', className: 'px-4 py-3 text-left text-sm font-medium' }, 'Rol'),
            ]),
          ),
          React.createElement(
            'tbody',
            { key: 'tbody', className: 'divide-y divide-neutral-200 dark:divide-neutral-700' },
            [
              React.createElement('tr', { key: 'row1', className: 'hover:bg-neutral-50 dark:hover:bg-neutral-800' }, [
                React.createElement('td', { key: 'name', className: 'px-4 py-3 text-sm' }, 'Ahmet Yılmaz'),
                React.createElement('td', { key: 'email', className: 'px-4 py-3 text-sm' }, 'ahmet@example.com'),
                React.createElement('td', { key: 'role', className: 'px-4 py-3 text-sm' }, 'Admin'),
              ]),
              React.createElement('tr', { key: 'row2', className: 'hover:bg-neutral-50 dark:hover:bg-neutral-800' }, [
                React.createElement('td', { key: 'name', className: 'px-4 py-3 text-sm' }, 'Zeynep Kaya'),
                React.createElement('td', { key: 'email', className: 'px-4 py-3 text-sm' }, 'zeynep@example.com'),
                React.createElement('td', { key: 'role', className: 'px-4 py-3 text-sm' }, 'Kullanıcı'),
              ]),
            ],
          ),
        ]),
      ],
    ),
    code: `import { DataTable } from '@/components/DataTable/DataTable'
import { ColumnDef } from '@tanstack/react-table'

type User = {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "İsim",
  },
  {
    accessorKey: "email", 
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Rol",
  },
]

const data: User[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com", 
    role: "Admin",
  },
  // ... daha fazla veri
]

function Example() {
  return (
    <DataTable 
      columns={columns} 
      data={data}
      searchKey="name"
      searchPlaceholder="İsim ara..."
    />
  )
}`,
    props: [
      {
        name: 'columns',
        type: 'ColumnDef<T>[]',
        description: 'Tablo sütun tanımları',
        required: true,
      },
      {
        name: 'data',
        type: 'T[]',
        description: 'Tablo verisi',
        required: true,
      },
      {
        name: 'searchKey',
        type: 'string',
        description: 'Arama yapılacak sütun anahtarı',
      },
      {
        name: 'searchPlaceholder',
        type: 'string',
        description: 'Arama input placeholder metni',
      },
    ],
  },
  // Dialog bileşeni (güncellenmiş)
  {
    id: 'dialog',
    title: 'Dialog',
    description: 'Modal pencere açmak için kullanılan dialog bileşeni',
    category: 'Navigasyon',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'flex items-center space-x-4' }, [
      React.createElement(
        'button',
        {
          key: 'trigger',
          className:
            'px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium text-sm',
          onClick: () => {
            if (typeof window !== 'undefined') {
              alert('Dialog açılacak!')
            }
          },
        },
        'Dialog Aç',
      ),
      React.createElement(
        'span',
        { key: 'info', className: 'text-sm text-neutral-500' },
        'Tıklayarak modal dialog görebilirsiniz',
      ),
    ]),
    code: `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog/Dialog'

function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Dialog Aç</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profili Düzenle</DialogTitle>
          <DialogDescription>
            Profil bilgilerinizi buradan güncelleyebilirsiniz.
            Değişiklikleri kaydetmek için kaydet butonuna tıklayın.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">İsim</Label>
            <Input id="name" defaultValue="Ahmet Yılmaz" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Kaydet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Dialog açık mı (controlled)',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Dialog durumu değiştiğinde çağırılan fonksiyon',
      },
      {
        name: 'modal',
        type: 'boolean',
        description: 'Modal davranışı (backdrop tıklanınca kapanır)',
        default: 'true',
      },
    ],
  },
  // Drag Drop List bileşeni
  {
    id: 'drag-drop-list',
    title: 'Drag Drop List',
    description: 'Sürükle-bırak özelliği ile öğeleri yeniden sıralayabileceğiniz liste bileşeni',
    category: 'Navigasyon',
    status: 'beta',
    demoComponent: React.createElement('div', { className: 'w-full max-w-md space-y-2' }, [
      React.createElement(
        'div',
        {
          key: 'item1',
          className:
            'flex items-center p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg',
        },
        [
          React.createElement('span', { key: 'handle', className: 'text-neutral-400 mr-3 cursor-grab' }, '⋮⋮'),
          React.createElement('span', { key: 'content', className: 'flex-1' }, 'Öğe 1'),
          React.createElement('button', { key: 'remove', className: 'text-red-500 hover:text-red-700 ml-2' }, '✕'),
        ],
      ),
      React.createElement(
        'div',
        {
          key: 'item2',
          className:
            'flex items-center p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg',
        },
        [
          React.createElement('span', { key: 'handle', className: 'text-neutral-400 mr-3 cursor-grab' }, '⋮⋮'),
          React.createElement('span', { key: 'content', className: 'flex-1' }, 'Öğe 2'),
          React.createElement('button', { key: 'remove', className: 'text-red-500 hover:text-red-700 ml-2' }, '✕'),
        ],
      ),
      React.createElement(
        'div',
        {
          key: 'item3',
          className:
            'flex items-center p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg',
        },
        [
          React.createElement('span', { key: 'handle', className: 'text-neutral-400 mr-3 cursor-grab' }, '⋮⋮'),
          React.createElement('span', { key: 'content', className: 'flex-1' }, 'Öğe 3'),
          React.createElement('button', { key: 'remove', className: 'text-red-500 hover:text-red-700 ml-2' }, '✕'),
        ],
      ),
    ]),
    code: `import { DragDropList, DragDropItem } from '@/components/DragDropList/DragDropList'
import { useState } from 'react'
function Example() {
const [items, setItems] = useState<DragDropItem[]>([
{ id: '1', content: 'Öğe 1' },
{ id: '2', content: 'Öğe 2' },
{ id: '3', content: 'Öğe 3' },
{ id: '4', content: 'Öğe 4' },
])
const handleReorder = (newItems: DragDropItem[]) => {
setItems(newItems)
}
const handleRemove = (id: string) => {
setItems(items.filter(item => item.id !== id))
}
return (
<DragDropList
   items={items}
   onReorder={handleReorder}
   onRemove={handleRemove}
   showDragHandle={true}
   showRemoveButton={true}
 />
)
},   usageExamples: [     {       title: 'Özelleştirilmiş Öğe',       description: 'Özel render fonksiyonu ile kişiselleştirilmiş öğeler',       code: <DragDropList
items={items}
onReorder={handleReorder}
renderItem={(item, index) => (
<div className="flex items-center space-x-3">
<span className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs">
{index + 1}
</span>
<span className="flex-1">{item.content}</span>
<span className="text-xs text-neutral-500">
Özelleştirilmiş
</span>
</div>
)}
/>`,
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement(
        'div',
        {
          key: 'custom1',
          className:
            'flex items-center p-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg space-x-3',
        },
        [
          React.createElement(
            'span',
            { key: 'badge', className: 'bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs' },
            '1',
          ),
          React.createElement('span', { key: 'content', className: 'flex-1' }, 'Özelleştirilmiş Öğe'),
          React.createElement('span', { key: 'label', className: 'text-xs text-neutral-500' }, 'Özelleştirilmiş'),
        ],
      ),
    ]),
  },
  // Form bileşeni (güncellenmiş)
  {
    id: 'form',
    title: 'Form',
    description: 'React Hook Form entegrasyonlu kapsamlı form yönetim sistemi',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement(() => {
      const { useState, useCallback } = React

      interface MyFormState {
        values: { email: string; name: string; message: string }
        errors: { email?: string; name?: string; message?: string }
        touched: { email?: boolean; name?: boolean; message?: boolean }
      }

      const [isSubmitted, setIsSubmitted] = useState(false)
      const [formState, setFormState] = useState<MyFormState>({
        values: { email: '', name: '', message: '' },
        errors: {},
        touched: {},
      })

      const validateField = useCallback((name: keyof MyFormState['values'], value: string) => {
        switch (name) {
          case 'email':
            if (!value) return 'E-posta adresi gereklidir'
            if (!/\S+@\S+\.\S+/.test(value)) return 'Geçerli bir e-posta adresi girin'
            return ''
          case 'name':
            if (!value || value.length < 2) return 'Ad en az 2 karakter olmalıdır'
            return ''
          case 'message':
            if (!value || value.length < 10) return 'Mesaj en az 10 karakter olmalıdır'
            return ''
          default:
            return ''
        }
      }, [])

      const handleFieldChange = useCallback(
        (name: keyof MyFormState['values'], value: string) => {
          const error = validateField(name, value)
          setFormState((prev) => ({
            values: { ...prev.values, [name]: value },
            errors: { ...prev.errors, [name]: error },
            touched: { ...prev.touched, [name]: true },
          }))
        },
        [validateField],
      )

      interface MyFormValues {
        email: string
        name: string
        message: string
      }

      interface MyFormErrors {
        email?: string
        name?: string
        message?: string
      }

      interface MyFormTouched {
        email?: boolean
        name?: boolean
        message?: boolean
      }

      interface MyFormState {
        values: MyFormValues
        errors: MyFormErrors
        touched: MyFormTouched
      }

      const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          const { values } = formState
          const newErrors: MyFormErrors = {}

          ;(Object.keys(values) as Array<keyof MyFormValues>).forEach((field) => {
            const error = validateField(field, values[field])
            if (error) newErrors[field] = error
          })

          setFormState((prev: MyFormState) => ({
            ...prev,
            errors: newErrors,
            touched: (Object.keys(values) as Array<keyof MyFormValues>).reduce(
              (acc: MyFormTouched, key: keyof MyFormValues) => ({ ...acc, [key]: true }),
              {},
            ),
          }))

          if (Object.keys(newErrors).length === 0) {
            setIsSubmitted(true)
            setTimeout(() => {
              setIsSubmitted(false)
              setFormState({
                values: { email: '', name: '', message: '' },
                errors: {},
                touched: {},
              })
            }, 3000)
          }
        },
        [formState, validateField],
      )

      if (isSubmitted) {
        return React.createElement(
          'div',
          {
            className:
              'w-full max-w-md p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center',
          },
          [
            React.createElement(
              'div',
              { key: 'icon', className: 'text-green-600 dark:text-green-400 text-2xl mb-2' },
              '✅',
            ),
            React.createElement(
              'h3',
              { key: 'title', className: 'text-lg font-medium text-green-800 dark:text-green-200 mb-1' },
              'Form Başarıyla Gönderildi',
            ),
            React.createElement(
              'p',
              { key: 'message', className: 'text-sm text-green-600 dark:text-green-400' },
              'Verileriniz başarıyla işleme alınmıştır.',
            ),
          ],
        )
      }

      // Form wrapper simülasyonu
      return React.createElement(
        'div',
        {
          className: 'w-full max-w-md',
        },
        [
          React.createElement(
            'form',
            {
              key: 'form',
              onSubmit: handleSubmit,
              className: 'space-y-6',
            },
            [
              // E-posta FormField simülasyonu
              React.createElement('div', { key: 'email-field', className: 'space-y-2' }, [
                React.createElement(
                  'label',
                  {
                    key: 'email-label',
                    htmlFor: 'demo-email',
                    className:
                      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  },
                  ['E-posta', React.createElement('span', { key: 'required', className: 'text-error ml-1' }, '*')],
                ),
                React.createElement('input', {
                  key: 'email-input',
                  id: 'demo-email',
                  type: 'email',
                  value: formState.values.email,
                  onChange: (e) => handleFieldChange('email', e.target.value),
                  placeholder: 'ornek@email.com',
                  className: `flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-600 ${
                    formState.errors.email && formState.touched.email
                      ? 'border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500'
                      : ''
                  }`,
                }),
                formState.errors.email &&
                  formState.touched.email &&
                  React.createElement(
                    'p',
                    {
                      key: 'email-error',
                      className: 'text-xs font-medium text-error dark:text-error',
                    },
                    formState.errors.email,
                  ),
              ]),

              // Ad FormField simülasyonu
              React.createElement('div', { key: 'name-field', className: 'space-y-2' }, [
                React.createElement(
                  'label',
                  {
                    key: 'name-label',
                    htmlFor: 'demo-name',
                    className:
                      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  },
                  ['Ad Soyad', React.createElement('span', { key: 'required', className: 'text-error ml-1' }, '*')],
                ),
                React.createElement('input', {
                  key: 'name-input',
                  id: 'demo-name',
                  type: 'text',
                  value: formState.values.name,
                  onChange: (e) => handleFieldChange('name', e.target.value),
                  placeholder: 'Adınızı ve soyadınızı girin',
                  className: `flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-600 ${
                    formState.errors.name && formState.touched.name
                      ? 'border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500'
                      : ''
                  }`,
                }),
                formState.errors.name &&
                  formState.touched.name &&
                  React.createElement(
                    'p',
                    {
                      key: 'name-error',
                      className: 'text-xs font-medium text-error dark:text-error',
                    },
                    formState.errors.name,
                  ),
              ]),

              // Mesaj FormField simülasyonu
              React.createElement('div', { key: 'message-field', className: 'space-y-2' }, [
                React.createElement(
                  'label',
                  {
                    key: 'message-label',
                    htmlFor: 'demo-message',
                    className:
                      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  },
                  ['Mesaj', React.createElement('span', { key: 'required', className: 'text-error ml-1' }, '*')],
                ),
                React.createElement('textarea', {
                  key: 'message-input',
                  id: 'demo-message',
                  value: formState.values.message,
                  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleFieldChange('message', e.target.value),
                  placeholder: 'Mesajınızı yazın...',
                  rows: 3,
                  className: `flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-600 ${
                    formState.errors.message && formState.touched.message
                      ? 'border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500'
                      : ''
                  }`,
                }),
                formState.errors.message &&
                  formState.touched.message &&
                  React.createElement(
                    'p',
                    {
                      key: 'message-error',
                      className: 'text-xs font-medium text-error dark:text-error',
                    },
                    formState.errors.message,
                  ),
              ]),

              // Submit buton
              React.createElement(
                'button',
                {
                  key: 'submit-button',
                  type: 'submit',
                  className:
                    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 h-10 px-4 w-full',
                },
                'Gönder',
              ),
            ],
          ),
        ],
      )
    }),
    code: `import { useForm } from '@/hooks/useForm'
  import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form/Form'
  import { Input } from '@/components/Input/Input'
  import { Textarea } from '@/components/Textarea/Textarea'
  import { Button } from '@/components/Button/Button'
  import { z } from 'zod'
  
  const formSchema = z.object({
    email: z.string().email('Geçerli bir e-posta adresi girin'),
    name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
    message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
  })
  
  function Example() {
    const form = useForm(formSchema, {
      defaultValues: {
        email: '',
        name: '',
        message: '',
      },
    })
  
    const onSubmit = (data: z.infer<typeof formSchema>) => {
      console.log('Form verisi:', data)
      // Form gönderme işlemi
    }
  
    return (
      <Form form={form} onSubmit={onSubmit} className="space-y-6 max-w-md">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>E-posta</FormLabel>
              <Input 
                type="email" 
                placeholder="ornek@email.com" 
                {...field} 
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Ad Soyad</FormLabel>
              <Input 
                placeholder="Adınızı ve soyadınızı girin" 
                {...field} 
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Mesaj</FormLabel>
              <Textarea 
                placeholder="Mesajınızı yazın..." 
                rows={3}
                {...field} 
              />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Gönder
        </Button>
      </Form>
    )
  }`,
    usageExamples: [
      {
        title: 'Gelişmiş Validation',
        description: 'Karmaşık validation kuralları ile form yönetimi',
        code: `const advancedSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
    age: z.number().min(18, 'En az 18 yaşında olmalısınız'),
    terms: z.boolean().refine(val => val === true, 'Kullanım şartlarını kabul etmelisiniz'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  })`,
        component: React.createElement(
          'div',
          { className: 'text-sm text-neutral-600 dark:text-neutral-400' },
          'Gelişmiş validation kuralları ile form yönetimi',
        ),
      },
    ],
    props: [
      {
        name: 'form',
        type: 'UseFormReturn',
        description: 'React Hook Form instance',
        required: true,
      },
      {
        name: 'onSubmit',
        type: '(data: T) => void | Promise<void>',
        description: 'Form gönderme fonksiyonu',
        required: true,
      },
      {
        name: 'className',
        type: 'string',
        description: 'Form container için CSS sınıfları',
      },
    ],
  },
  // Dropdown bileşeni (güncellenmiş)
  {
    id: 'dropdown',
    title: 'Dropdown Menu',
    description: 'Radix UI tabanlı erişilebilir dropdown menü bileşeni',
    category: 'Navigasyon',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'flex items-center justify-center p-4' }, [
      React.createElement(DropdownMenu, { key: 'dropdown' }, [
        React.createElement(
          DropdownMenuTrigger,
          {
            key: 'trigger',
            asChild: true,
          },
          React.createElement(
            'button',
            {
              key: 'button',
              className:
                'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 h-10 px-4 py-2 min-w-[120px]',
            },
            [
              React.createElement('span', { key: 'text', className: 'mr-2' }, 'Seçenekler'),
              React.createElement(MoreHorizontal, { key: 'icon', className: 'h-4 w-4' }),
            ],
          ),
        ),
        React.createElement(
          DropdownMenuContent,
          {
            key: 'content',
            className: 'w-56',
            align: 'start',
            sideOffset: 4,
          },
          [
            React.createElement(DropdownMenuLabel, { key: 'label' }, 'Hesap İşlemleri'),
            React.createElement(DropdownMenuSeparator, { key: 'sep1' }),
            React.createElement(
              DropdownMenuItem,
              {
                key: 'item1',
                className: 'cursor-pointer',
              },
              [
                React.createElement('span', { key: 'icon', className: 'mr-2' }, '👤'),
                React.createElement('span', { key: 'text' }, 'Profil'),
              ],
            ),
            React.createElement(
              DropdownMenuItem,
              {
                key: 'item2',
                className: 'cursor-pointer',
              },
              [
                React.createElement('span', { key: 'icon', className: 'mr-2' }, '⚙️'),
                React.createElement('span', { key: 'text' }, 'Ayarlar'),
              ],
            ),
            React.createElement(
              DropdownMenuItem,
              {
                key: 'item3',
                className: 'cursor-pointer',
              },
              [
                React.createElement('span', { key: 'icon', className: 'mr-2' }, '💳'),
                React.createElement('span', { key: 'text' }, 'Faturalandırma'),
              ],
            ),
            React.createElement(DropdownMenuSeparator, { key: 'sep2' }),
            React.createElement(
              DropdownMenuItem,
              {
                key: 'item4',
                className: 'text-red-600 dark:text-red-400 cursor-pointer',
              },
              [
                React.createElement('span', { key: 'icon', className: 'mr-2' }, '🚪'),
                React.createElement('span', { key: 'text' }, 'Çıkış Yap'),
              ],
            ),
          ],
        ),
      ]),
    ]),
    code: `import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/Dropdown/Dropdown'
  import { Button } from '@/components/Button/Button'
  import { MoreHorizontal } from 'lucide-react'
  
  function Example() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Seçenekler
            <MoreHorizontal className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Hesap İşlemleri</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => console.log('Profil')}>
            👤 Profil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Ayarlar')}>
            ⚙️ Ayarlar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Faturalandırma')}>
            💳 Faturalandırma
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-red-600" 
            onClick={() => console.log('Çıkış')}
          >
            🚪 Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }`,
    usageExamples: [
      {
        title: 'Checkbox ve Radio Öğeler',
        description: 'Seçilebilir öğeler içeren dropdown menü',
        code: `import {
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem
  } from '@/components/Dropdown/Dropdown'
  
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button>Filtreler</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuCheckboxItem checked={true}>
        Aktif Öğeler
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem checked={false}>
        Arşivlenmiş Öğeler
      </DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value="newest">
        <DropdownMenuRadioItem value="newest">
          En Yeni
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="oldest">
          En Eski
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>`,
        component: React.createElement(
          'div',
          {
            className: 'text-sm text-neutral-600 dark:text-neutral-400',
          },
          'Seçilebilir öğeler ile filtreleme menüsü',
        ),
      },
    ],
    props: [
      {
        name: 'open',
        type: 'boolean',
        description: 'Dropdown açık durumu (controlled)',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Açık durumu değiştiğinde çağırılan fonksiyon',
      },
      {
        name: 'modal',
        type: 'boolean',
        description: 'Modal davranışı etkinleştir',
        default: 'true',
      },
    ],
  },
  // File Upload bileşeni
  {
    id: 'file-upload',
    title: 'File Upload',
    description: 'Sürükle-bırak desteği ile gelişmiş dosya yükleme bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement(FileUploadExample),
    code: `import { FileUpload } from '@/components/FileUpload/FileUpload'
  import { useState } from 'react'
  
  function Example() {
    const [files, setFiles] = useState<File[]>([])
  
    const handleUpload = (newFiles: File[]) => {
      setFiles(newFiles)
      console.log('Yüklenen dosyalar:', newFiles)
    }
  
    return (
      <div className="space-y-4">
        <FileUpload
          onChange={handleUpload}
          value={files}
          multiple={true}
          accept="image/*,.pdf,.docx"
          maxSize={10}
          maxFiles={5}
          dropzoneText="Dosyaları buraya sürükleyin veya"
          browseText="Dosya Seçin"
          showFileList={true}
        />
        
        {files.length > 0 && (
          <div className="text-sm text-neutral-600">
            {files.length} dosya seçildi
          </div>
        )}
      </div>
    )
  }`,
    usageExamples: [
      {
        title: 'Resim Yükleme',
        description: 'Sadece resim dosyalarını kabul eden upload bileşeni',
        code: `<FileUpload
  onChange={setImageFiles}
  accept="image/*"
  maxSize={5}
  maxFiles={3}
  dropzoneText="Resimlerinizi buraya sürükleyin"
  onError={(error) => console.error(error)}
/>`,
        component: React.createElement(
          'div',
          { className: 'text-sm text-neutral-600 dark:text-neutral-400' },
          'Resim dosyaları için özelleştirilmiş upload alanı',
        ),
      },
    ],
    props: [
      {
        name: 'onChange',
        type: '(files: File[]) => void',
        description: 'Dosya seçimi değiştiğinde çağırılan fonksiyon',
        required: true,
      },
      {
        name: 'value',
        type: 'File[]',
        description: 'Seçili dosyalar',
      },
      {
        name: 'multiple',
        type: 'boolean',
        description: 'Birden fazla dosya seçimine izin ver',
        default: 'false',
      },
      {
        name: 'accept',
        type: 'string',
        description: 'Kabul edilen dosya türleri',
      },
      {
        name: 'maxSize',
        type: 'number',
        description: 'Maksimum dosya boyutu (MB)',
        default: '10',
      },
      {
        name: 'maxFiles',
        type: 'number',
        description: 'Maksimum dosya sayısı',
        default: '5',
      },
    ],
  },
  // Input bileşeni
  {
    id: 'input',
    title: 'Input',
    description: 'Çeşitli varyant ve ikon desteği ile gelişmiş input bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'w-full max-w-md space-y-4' }, [
      React.createElement(Input, {
        key: 'basic',
        placeholder: 'Temel input',
      }),
      React.createElement(Input, {
        key: 'with-icon',
        placeholder: 'Arama yapın...',
        startIcon: React.createElement(Search, { className: 'h-4 w-4' }),
      }),
      React.createElement(Input, {
        key: 'email',
        type: 'email',
        placeholder: 'E-posta adresiniz',
        startIcon: React.createElement(Mail, { className: 'h-4 w-4' }),
      }),
      React.createElement(Input, {
        key: 'error',
        placeholder: 'Hatalı input',
        variant: 'error',
        error: 'Bu alan zorunludur',
      }),
    ]),
    code: `import { Input } from '@/components/Input/Input'
import { Search, Mail, User } from 'lucide-react'

function Example() {
  return (
    <div className="space-y-4">
      <Input placeholder="Temel input" />
      
      <Input
        placeholder="Arama yapın..."
        startIcon={<Search className="h-4 w-4" />}
      />
      
      <Input
        type="email"
        placeholder="E-posta adresiniz"
        startIcon={<Mail className="h-4 w-4" />}
      />
      
      <Input
        placeholder="Hatalı input"
        variant="error"
        error="Bu alan zorunludur"
      />
      
      <Input
        placeholder="Büyük input"
        inputSize="lg"
        startIcon={<User className="h-4 w-4" />}
      />
    </div>
  )
}`,
    usageExamples: [
      {
        title: 'Form Entegrasyonu',
        description: 'React Hook Form ile entegre input kullanımı',
        code: `<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>E-posta</FormLabel>
      <Input
        placeholder="ornek@email.com"
        startIcon={<Mail className="h-4 w-4" />}
        {...field}
      />
      <FormMessage />
    </FormItem>
  )}
/>`,
        component: React.createElement(
          'div',
          { className: 'text-sm text-neutral-600 dark:text-neutral-400' },
          'Form validation ile entegre input kullanımı',
        ),
      },
    ],
    props: [
      {
        name: 'variant',
        type: "'default' | 'error' | 'success'",
        description: 'Input görünüm varyantı',
        default: 'default',
      },
      {
        name: 'inputSize',
        type: "'default' | 'sm' | 'lg'",
        description: 'Input boyutu',
        default: 'default',
      },
      {
        name: 'startIcon',
        type: 'ReactNode',
        description: 'Input başında gösterilecek ikon',
      },
      {
        name: 'endIcon',
        type: 'ReactNode',
        description: 'Input sonunda gösterilecek ikon',
      },
      {
        name: 'error',
        type: 'string',
        description: 'Hata mesajı',
      },
    ],
  },
  // Label bileşeni
  {
    id: 'label',
    title: 'Label',
    description: 'Form alanları için erişilebilir etiket bileşeni',
    category: 'Form & Input',
    status: 'stable',
    demoComponent: React.createElement('div', { className: 'w-full max-w-md space-y-4' }, [
      React.createElement('div', { key: 'basic', className: 'space-y-2' }, [
        React.createElement(Label, { key: 'label', htmlFor: 'basic-input' }, 'Temel Label'),
        React.createElement(Input, { key: 'input', id: 'basic-input', placeholder: 'İlgili input' }),
      ]),
      React.createElement('div', { key: 'required', className: 'space-y-2' }, [
        React.createElement(Label, { key: 'label', htmlFor: 'required-input', required: true }, 'Zorunlu Alan'),
        React.createElement(Input, { key: 'input', id: 'required-input', placeholder: 'Bu alan zorunludur' }),
      ]),
      React.createElement('div', { key: 'disabled', className: 'space-y-2' }, [
        React.createElement(
          Label,
          { key: 'label', htmlFor: 'disabled-input', className: 'text-neutral-400' },
          'Devre Dışı',
        ),
        React.createElement(Input, {
          key: 'input',
          id: 'disabled-input',
          disabled: true,
          placeholder: 'Devre dışı input',
        }),
      ]),
    ]),
    code: `import { Label } from '@/components/Label/Label'
import { Input } from '@/components/Input/Input'

function Example() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Kullanıcı Adı</Label>
        <Input id="username" placeholder="Kullanıcı adınızı girin" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" required>E-posta</Label>
        <Input id="email" type="email" placeholder="E-posta adresiniz" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Biyografi</Label>
        <Textarea 
          id="bio" 
          placeholder="Kendiniz hakkında yazın..." 
          rows={3}
        />
      </div>
    </div>
  )
}`,
    usageExamples: [
      {
        title: 'Checkbox ile Kullanım',
        description: 'Checkbox ve radio buttonlar ile label kullanımı',
        code: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">
    Kullanım şartlarını kabul ediyorum
  </Label>
</div>

<div className="space-y-2">
  <Label>Cinsiyet</Label>
  <div className="flex space-x-4">
    <div className="flex items-center space-x-2">
      <input type="radio" id="male" name="gender" />
      <Label htmlFor="male">Erkek</Label>
    </div>
    <div className="flex items-center space-x-2">
      <input type="radio" id="female" name="gender" />
      <Label htmlFor="female">Kadın</Label>
    </div>
  </div>
</div>`,
        component: React.createElement(
          'div',
          { className: 'text-sm text-neutral-600 dark:text-neutral-400' },
          'Seçim bileşenleri ile label kullanımı',
        ),
      },
    ],
    props: [
      {
        name: 'htmlFor',
        type: 'string',
        description: 'İlgili input elementinin ID değeri',
      },
      {
        name: 'required',
        type: 'boolean',
        description: 'Zorunlu alan işareti (*) gösterir',
        default: 'false',
      },
      {
        name: 'className',
        type: 'string',
        description: 'Ek CSS sınıfları',
      },
    ],
  },
  // Page Header bileşeni
  {
    id: 'page-header',
    title: 'Page Header',
    description: 'Sayfa başlığı, breadcrumb, eylemler ve tab navigation içeren kapsamlı sayfa üst bileşeni',
    category: 'Layout',
    status: 'stable',
    demoComponent: React.createElement(PageHeaderExample),
    code: `import { PageHeader } from '@/components/PageHeader/PageHeader'
import { HomeIcon, InfoIcon } from 'lucide-react'

function Example() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <PageHeader
      title="Proje Yönetimi"
      subtitle="Tüm projelerinizi yönetin ve izleyin"
      breadcrumbs={[
        { title: 'Ana Sayfa', href: '/', icon: <HomeIcon className="h-3.5 w-3.5" /> },
        { title: 'Projeler', href: '/projects' },
        { title: 'Proje Detayı' },
      ]}
      actions={[
        {
          label: 'Yardım',
          onClick: () => console.log('Yardım'),
          icon: <InfoIcon className="h-4 w-4" />,
          variant: 'outline',
        },
        {
          label: 'Yeni Proje',
          onClick: () => console.log('Yeni proje'),
        },
      ]}
      tabs={[
        { label: 'Genel Bakış', value: 'overview' },
        { label: 'Görevler', value: 'tasks', count: 12 },
        { label: 'Belgeler', value: 'documents', count: 5 },
        { label: 'Ayarlar', value: 'settings' },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      sticky={true}
    />
  )
}`,
    usageExamples: [
      {
        title: 'Basit Sayfa Başlığı',
        description: 'Sadece başlık ve açıklama içeren minimal kullanım',
        code: `<PageHeader
  title="Kullanıcı Profili"
  subtitle="Profil bilgilerinizi görüntüleyin ve düzenleyin"
  backButton={true}
  onBackButtonClick={() => router.back()}
 />`,
        component: React.createElement(
          'div',
          { className: 'text-sm text-neutral-600 dark:text-neutral-400' },
          'Geri buton ile minimal sayfa başlığı',
        ),
      },
      {
        title: 'E-ticaret Ürün Sayfası',
        description: 'Ürün sayfası için özelleştirilmiş sayfa başlığı',
        code: `<PageHeader
  title="iPhone 15 Pro"
  subtitle="En gelişmiş iPhone deneyimi"
  breadcrumbs={[
    { title: 'Ana Sayfa', href: '/' },
    { title: 'Elektronik', href: '/electronics' },
    { title: 'Telefon', href: '/electronics/phones' },
    { title: 'iPhone 15 Pro' },
  ]}
  actions={[
    { label: 'Favorilere Ekle', onClick: handleFavorite, variant: 'outline' },
    { label: 'Sepete Ekle', onClick: handleAddToCart },
  ]}
 />`,
        component: React.createElement(
          'div',
          { className: 'text-sm text-neutral-600 dark:text-neutral-400' },
          'E-ticaret ürün sayfası için sayfa başlığı',
        ),
      },
    ],
    props: [
      {
        name: 'title',
        type: 'string',
        description: 'Sayfa başlığı',
        required: true,
      },
      {
        name: 'subtitle',
        type: 'string',
        description: 'Sayfa açıklaması',
      },
      {
        name: 'breadcrumbs',
        type: 'Breadcrumb[]',
        description: 'Breadcrumb navigation öğeleri',
      },
      {
        name: 'actions',
        type: 'Action[]',
        description: 'Sayfa eylem butonları',
      },
      {
        name: 'tabs',
        type: 'Tab[]',
        description: 'Tab navigation öğeleri',
      },
      {
        name: 'activeTab',
        type: 'string',
        description: 'Aktif tab değeri',
      },
      {
        name: 'onTabChange',
        type: '(value: string) => void',
        description: 'Tab değişim fonksiyonu',
      },
      {
        name: 'sticky',
        type: 'boolean',
        description: 'Sayfada scroll ederken üstte sabit kalması',
        default: 'false',
      },
      {
        name: 'backButton',
        type: 'boolean',
        description: 'Geri buton göster',
        default: 'false',
      },
    ],
  },
]
