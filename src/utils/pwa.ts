import { useCallback, useEffect, useState } from 'react'

interface PWAInstallPrompt {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

class PWAService {
  private deferredPrompt: PWAInstallPrompt | null = null
  private isInstalled = false
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    this.initializePWA()
  }

  private async initializePWA(): Promise<void> {
    if (typeof window === 'undefined') return

    // Service Worker registration
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered successfully')
      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }

    // Install prompt event listener
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e as any
    })

    // App installed event listener
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true
      console.log('PWA installed successfully')
    })

    // Check if app is already installed
    this.checkInstallStatus()
  }

  private checkInstallStatus(): void {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true
    }
  }

  public async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false
    }

    try {
      await this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice

      if (outcome === 'accepted') {
        this.isInstalled = true
        this.deferredPrompt = null
        return true
      }

      return false
    } catch (error) {
      console.error('Install prompt failed:', error)
      return false
    }
  }

  public canInstall(): boolean {
    return !!this.deferredPrompt && !this.isInstalled
  }

  public isAppInstalled(): boolean {
    return this.isInstalled
  }

  public async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported')
    }

    const permission = await Notification.requestPermission()
    return permission
  }

  public async showNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (this.registration && 'showNotification' in this.registration) {
      await this.registration.showNotification(title, options)
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options)
    }
  }

  public async registerBackgroundSync(tag: string): Promise<void> {
    if (this.registration && 'sync' in this.registration) {
      await (this.registration as any).sync.register(tag)
    }
  }
}

export const pwaService = new PWAService()

// React hook for PWA functionality
export function usePWA() {
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const checkStatus = () => {
      setCanInstall(pwaService.canInstall())
      setIsInstalled(pwaService.isAppInstalled())
    }

    checkStatus()

    // Event listeners for status changes
    const handleBeforeInstallPrompt = () => {
      setCanInstall(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setCanInstall(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const install = useCallback(async () => {
    const success = await pwaService.showInstallPrompt()
    if (success) {
      setIsInstalled(true)
      setCanInstall(false)
    }
    return success
  }, [])

  const requestNotifications = useCallback(async () => {
    return await pwaService.requestNotificationPermission()
  }, [])

  const showNotification = useCallback(async (title: string, options?: NotificationOptions) => {
    return await pwaService.showNotification(title, options)
  }, [])

  return {
    canInstall,
    isInstalled,
    install,
    requestNotifications,
    showNotification,
  }
}
