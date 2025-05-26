// Mevcut dosyaya aşağıdaki bileşenleri ekleyin
import React from 'react'

import { Checkbox } from '@/components/Checkbox/Checkbox'
import { Switch } from '@/components/Switch/Switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select/Select'

// componentDemoData array'ine eklenecek yeni bileşenler:
export const componentDemoData = [
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
]
