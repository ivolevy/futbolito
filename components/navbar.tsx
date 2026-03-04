"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/partidos", label: "Partidos" },
  { href: "/jugadores", label: "Jugadores" },
  { href: "/estadisticas", label: "Estadisticas" },
  { href: "/canchas", label: "Canchas" },
]

import { useAdmin } from "@/hooks/use-admin"

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAdmin, logout } = useAdmin()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-black border border-white/5">
            <img
              src="/logo.png"
              alt="Futbolito Logo"
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute inset-x-1 -bottom-3 h-px bg-primary" />
              )}
            </Link>
          ))}
          {isAdmin ? (
            <button
              onClick={logout}
              className="ml-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-3 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <button
              onClick={() => {
                logout()
                setMobileOpen(false)
              }}
              className="mt-2 block w-full rounded-md bg-destructive py-2.5 text-sm font-medium text-destructive-foreground"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 block rounded-md bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground"
            >
              Admin
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
