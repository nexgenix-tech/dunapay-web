"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, User, X, LogOut, Settings, History, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp, useAuth } from "@/contexts/AppContext" // Use the new hook

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  
  const { user, isAuthenticated, isReady } = useAuth() // Use the new hook
  const { dispatch } = useApp() // Still need dispatch for logout
  const router = useRouter()
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Handle search toggle
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100)
    }
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  // Handle user logout
  const handleLogout = () => {
    dispatch({ type: "SET_USER", payload: null })
    router.push("/")
  }

  // Check if current route is active
  const isActiveRoute = (route: string) => {
    if (route === "/" && pathname === "/") return true
    if (route !== "/" && pathname.startsWith(route)) return true
    return false
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image 
              src="/images/dunapay.png" 
              alt="dunaPAY" 
              width={120} 
              height={50} 
              className="h-32 w-auto" 
              priority
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search by ID number or notice number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              href="/municipalities" 
              className={`text-gray-600 hover:text-[#6B8E23] transition-colors px-3 py-2 rounded-md ${
                isActiveRoute("/municipalities") ? "text-[#6B8E23] bg-[#6B8E23]/10" : ""
              }`}
            >
              Municipalities
            </Link>
            
            {/* Show skeleton while loading, then actual content */}
            {!isReady ? (
              // Loading skeleton
              <div className="flex items-center space-x-2">
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className={`text-gray-600 hover:text-[#6B8E23] transition-colors px-3 py-2 rounded-md ${
                    isActiveRoute("/dashboard") ? "text-[#6B8E23] bg-[#6B8E23]/10" : ""
                  }`}
                >
                  Dashboard
                </Link>
                
                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user?.firstName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/history" className="flex items-center">
                        <History className="h-4 w-4 mr-2" />
                        Payment History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-[#6B8E23] hover:bg-[#4A7C59]">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSearch}
              className="p-2"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden px-4 py-3 border-t border-gray-200 bg-gray-50">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by ID number or notice number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/municipalities"
              className={`block py-3 px-2 text-gray-600 hover:text-[#6B8E23] hover:bg-gray-50 rounded-md transition-colors ${
                isActiveRoute("/municipalities") ? "text-[#6B8E23] bg-[#6B8E23]/10" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Municipalities
            </Link>
            
            {!isReady ? (
              // Loading skeleton for mobile
              <div className="py-2">
                <div className="w-full h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`block py-3 px-2 text-gray-600 hover:text-[#6B8E23] hover:bg-gray-50 rounded-md transition-colors ${
                    isActiveRoute("/dashboard") ? "text-[#6B8E23] bg-[#6B8E23]/10" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block py-3 px-2 text-gray-600 hover:text-[#6B8E23] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile Settings
                </Link>
                <Link
                  href="/dashboard/history"
                  className="block py-3 px-2 text-gray-600 hover:text-[#6B8E23] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Payment History
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-3 px-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2 inline" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2 py-2">
                <Link href="/auth/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="flex-1">
                  <Button size="sm" className="w-full bg-[#6B8E23] hover:bg-[#4A7C59]">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}