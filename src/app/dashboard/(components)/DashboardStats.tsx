import { AlertTriangle, Clock, Banknote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TrafficFine } from "@/lib/types"

interface DashboardStatsProps {
  fines: TrafficFine[]
  isLoading: boolean
}

export default function DashboardStats({ fines, isLoading }: DashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const totalFines = fines.length
  const outstandingFines = fines.filter(fine => fine.status === "OUTSTANDING").length
  const overdueFines = fines.filter(fine => fine.status === "OVERDUE").length
//   const paidFines = fines.filter(fine => fine.status === "PAID").length
  const totalAmount = fines
    .filter(fine => fine.status === "OUTSTANDING" || fine.status === "OVERDUE")
    .reduce((sum, fine) => sum + fine.amount, 0)

  const stats = [
    {
      title: "Total Fines",
      value: totalFines.toString(),
      icon: AlertTriangle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "All fines in system"
    },
    {
      title: "Outstanding",
      value: outstandingFines.toString(),
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Unpaid fines"
    },
    {
      title: "Overdue",
      value: overdueFines.toString(),
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Past due date"
    },
    {
      title: "Amount Due",
      value: `R ${totalAmount.toLocaleString()}`,
      icon: Banknote,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Total outstanding"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <p className="text-xs text-gray-500">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}