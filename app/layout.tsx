import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Futbolito 2026",
  description:
    "Plataforma para organizar partidos de futbol entre amigos. Resultados, estadisticas y mas.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a1a0f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-border py-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
            <p className="text-xs text-muted-foreground">
              Futbolito 2026 &mdash; Temporada en curso
            </p>
            <p className="text-xs text-muted-foreground">
              Unidos por Stilman
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
