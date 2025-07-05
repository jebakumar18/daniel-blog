// app/layout.js

import Link from 'next/link'
import './globals.css' // if you use Tailwind or global CSS

export const metadata = {
  title: "Daniel Blog",
  description: "A new chapter every week",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        {/* Navigation Bar */}
        <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-amber-400 hover:text-amber-300">
              Daniel J. Durai
            </Link>
            <div className="space-x-6 text-lg">
              <Link href="/" className="hover:text-amber-400">Home</Link>
              <Link href="/stories" className="hover:text-amber-400">Stories</Link>
              <Link href="/about" className="hover:text-amber-400">About</Link>
              <Link href="/contact" className="hover:text-amber-400">Contact</Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-16">
          © {new Date().getFullYear()} Daniel's Blog — All rights reserved.
        </footer>
      </body>
    </html>
  )
}
