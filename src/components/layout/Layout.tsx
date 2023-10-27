import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='container py-12 px-4 mx-auto h-screen border border-accent'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
