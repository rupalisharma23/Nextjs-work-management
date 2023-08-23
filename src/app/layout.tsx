
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import NavBar from '../app/NavBar'
import {UserProvider} from '../app/ContextApiUser'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        <NavBar/>
        {children}
        </UserProvider>
      </body>
    </html>
  )
}
