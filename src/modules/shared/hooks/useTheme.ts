import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState<string>()
  const root = window.document.documentElement

  useEffect(() => {
    const prevTheme = localStorage.getItem('theme')
    setTheme(prevTheme ?? 'dark')
  }, [])

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme)
    }
    if (theme === 'dark') {
      root.classList.remove('light')
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}

export default useTheme
