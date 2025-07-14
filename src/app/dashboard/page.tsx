"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AppContext"
import { getUserFines } from "@/lib/api"
import type { TrafficFine } from "@/lib/types"
import DashboardStats from "./(components)/DashboardStats"
import RecentFines from "./(components)/RecentFines"
import QuickActions from "./(components)/QuickActions"
import WelcomeCard from "./(components)/WelcomeCard"

export default function DashboardPage() {
  const { user, isAuthenticated, isReady } = useAuth()
  const [userFines, setUserFines] = useState<TrafficFine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserFines = async () => {
      if (!user) return
      
      try {
        setIsLoading(true)
        const fines = await getUserFines(user.id)
        setUserFines(fines)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch fines")
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch when user is available and state is ready
    if (isReady && user) {
      fetchUserFines()
    }
  }, [user, isReady])

  // Show loading while state is hydrating
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B8E23] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show access denied only after hydration is complete
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <WelcomeCard user={user} />

        {/* Dashboard Stats */}
        <DashboardStats fines={userFines} isLoading={isLoading} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Fines */}
          <div className="lg:col-span-2">
            <RecentFines 
              fines={userFines} 
              isLoading={isLoading} 
              error={error}
            />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}