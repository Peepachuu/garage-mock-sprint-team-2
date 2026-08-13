import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Image
        src="/glen-carrie-code.jpg"
        alt=""
        fill
        priority
        className="object-cover -z-5"
      />
      <div className="w-full max-w-sm">{children}</div>

      <p className="absolute bottom-4 left-4 text-xs text-white/70">
        Photo by{' '}
        <a href="https://unsplash.com/@glencarrie" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
          Glen Carrie
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/" target="_blank" rel="noopner noreferrer" className="underline hover:text-white">
          Unsplash
        </a>
        {' '}
      </p>

    </div>
  )
}
