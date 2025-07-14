import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"
import AppHeader from "@/components/layout/AppHeader"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "dunaPAY - Pay Traffic Fines Online in South Africa",
  description:
    "Pay your traffic fines online quickly and securely. Search by ID number, notice number, or vehicle registration. Supported municipalities across South Africa.",
  keywords: "traffic fines, South Africa, online payment, municipalities, dunaPAY",
  authors: [{ name: "dunaPAY" }],
  openGraph: {
    title: "dunaPAY - Pay Traffic Fines Online",
    description: "Pay your traffic fines online quickly and securely across South Africa.",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "dunaPAY - Pay Traffic Fines Online",
    description: "Pay your traffic fines online quickly and securely across South Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <AppHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
