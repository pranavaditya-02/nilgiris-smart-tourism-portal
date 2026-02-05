"use client"

import React from "react"
// import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import { LanguageDropdown } from '@/components/language-dropdown'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import { GoogleTranslate } from "./Translate"

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'Nilgiris Smart Tourism - District Operations Portal',
//   description: 'Government-grade operations portal for Nilgiris Smart Tourism',
//   generator: 'v0.app',
//   icons: {
//     icon: [
//       {
//         url: '/icon-light-32x32.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/icon-dark-32x32.png',
//         media: '(prefers-color-scheme: dark)',
//       },
//       {
//         url: '/icon.svg',
//         type: 'image/svg+xml',
//       },
//     ],
//     apple: '/apple-icon.png',
//   },
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          /* Hide Google Translate branding */
          .goog-te-gadget-simple {
            background-color: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          
          .goog-te-gadget-simple .goog-te-combo {
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 6px 10px;
            font-size: 14px;
            color: #666;
          }

          .goog-te-gadget-simple .goog-te-combo:hover {
            background-color: #f5f5f5;
          }

          /* Hide the "Powered by" text */
          .goog-te-gadget-simple span:not(.goog-te-combo) {
            display: none !important;
          }

          /* Hide the logo/branding line */
          .goog-te-gadget {
            font-family: inherit;
          }

          /* Remove extra spacing */
          #google_translate_element {
            display: inline-block;
          }

          /* Clean up Google Translate appearance */
          .skiptranslate {
            position: relative !important;
          }

          .goog-te-menu-frame {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
          }
        `}</style>
      </head>
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          {/* Header with Translation Controls */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-300 shadow-md">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                  N
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-bold text-gray-900 text-sm sm:text-base">Nilgiris</h1>
                  <p className="text-xs text-gray-600">Smart Tourism</p>
                </div>
              </div>

              {/* Translation Controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Google Translate Widget */}
                <div className="flex items-center">
                  <GoogleTranslate />
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

                {/* Language Dropdown */}
                <LanguageDropdown />
              </div>
            </div>
          </header>

          {/* Main Content with Top Padding for Fixed Header */}
          <main className="pt-20 sm:pt-16">
            {children}
          </main>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
