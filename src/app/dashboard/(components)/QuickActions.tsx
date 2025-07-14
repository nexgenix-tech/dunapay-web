import Link from "next/link"
import { Search, History, Settings, Plus, CreditCard, Bell, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { User } from "@/lib/types"

interface QuickActionsProps {
  user: User | null
}

export default function QuickActions({ user }: QuickActionsProps) {
  const actions = [
    {
      title: "Search Fines",
      description: "Find fines by ID or notice number",
      icon: Search,
      href: "/search",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Add Vehicle",
      description: "Register a new vehicle",
      icon: Plus,
      href: "/dashboard/vehicles/add",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Payment History",
      description: "View your payment records",
      icon: History,
      href: "/dashboard/history",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Profile Settings",
      description: "Update your account details",
      icon: Settings,
      href: "/dashboard/profile",
      color: "text-gray-600",
      bgColor: "bg-gray-50"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-[#6B8E23]" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start h-auto p-3 hover:bg-gray-50"
                >
                  <div className={`p-2 rounded-full ${action.bgColor} mr-3`}>
                    <action.icon className={`h-4 w-4 ${action.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{action.title}</div>
                    <div className="text-sm text-gray-500">{action.description}</div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-[#6B8E23]" />
            Account Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Name</span>
              <span className="text-sm text-gray-900">
                {user!.firstName} {user!.lastName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Email</span>
              <span className="text-sm text-gray-900">{user!.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">ID Number</span>
              <span className="text-sm text-gray-900">{user!.idNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Vehicles</span>
              <span className="text-sm text-gray-900">
                {user!.vehicles.length} registered
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Help & Support Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-[#6B8E23]" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Having trouble with your fines or payments? We&apos;re here to help.
            </p>
            <div className="flex flex-col space-y-2">
              <Link href="/help">
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Support Center
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}