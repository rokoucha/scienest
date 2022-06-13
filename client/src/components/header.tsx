import { useRouter } from 'next/router'
import type React from 'react'
import { useCallback } from 'react'

export const Header: React.FC = () => {
  const router = useRouter()

  const onEditButtonClick = useCallback(() => {
    const url = new URL(router.asPath, window.location.href)
    url.searchParams.set('edit', '')
    router.push(url)
  }, [router])

  return (
    <header>
      <p>Scienst</p>
      <button onClick={onEditButtonClick}>Edit</button>
    </header>
  )
}
