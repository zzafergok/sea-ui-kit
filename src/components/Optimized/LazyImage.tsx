import React, { memo, useRef, useState, useCallback, useEffect } from 'react'

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  placeholder?: string
  errorPlaceholder?: string
  threshold?: number
  rootMargin?: string
  onLoad?: () => void
  onError?: () => void
  className?: string
}

/**
 * Lazy Loading Image Component
 * Intersection Observer ile lazy loading
 */
export const LazyImage = memo(
  ({
    src,
    alt,
    placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    errorPlaceholder,
    threshold = 0.1,
    rootMargin = '50px',
    onLoad,
    onError,
    className = '',
    ...props
  }: LazyImageProps) => {
    const [imageSrc, setImageSrc] = useState(placeholder)
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting) {
            setImageSrc(src)
            observer.disconnect()
          }
        },
        { threshold, rootMargin },
      )

      if (imgRef.current) {
        observer.observe(imgRef.current)
      }

      return () => observer.disconnect()
    }, [src, threshold, rootMargin])

    const handleLoad = useCallback(() => {
      setIsLoaded(true)
      onLoad?.()
    }, [onLoad])

    const handleError = useCallback(() => {
      setHasError(true)
      if (errorPlaceholder) {
        setImageSrc(errorPlaceholder)
      }
      onError?.()
    }, [errorPlaceholder, onError])

    return (
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-50'} ${hasError ? 'image-error' : ''} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    )
  },
)

LazyImage.displayName = 'LazyImage'
