import React from 'react'

import { PublicNavbar } from '@/components/Navigation/PublicNavbar'
import { PublicFooter } from '@/components/Navigation/PublicFooter'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className='min-h-screen flex flex-col'>
      <PublicNavbar />
      <main className='flex-1'>{children}</main>
      <PublicFooter />
    </div>
  )
}
