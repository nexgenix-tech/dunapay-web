import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, Calendar, MapPin, Car, CreditCard, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TrafficFine } from "@/lib/types"

interface RecentFinesProps {
  fines: TrafficFine[]
  isLoading: boolean
  error: string | null
}

export default function RecentFines({ fines, isLoading, error }: RecentFinesProps) {
  const [showAll, setShowAll] = useState(false)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
            Recent Fines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Recent Fines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (fines.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
            Recent Fines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 text-4xl mb-2">🎉</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                No Fines Found!
              </h3>
              <p className="text-green-700">
                Great news! You don&apos;t have any traffic fines in our system.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const displayedFines = showAll ? fines : fines.slice(0, 5)
  const sortedFines = displayedFines.sort((a, b) => 
    new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  )

  const getStatusColor = (status: TrafficFine['status']) => {
    switch (status) {
      case 'OUTSTANDING': return 'bg-yellow-100 text-yellow-800'
      case 'OVERDUE': return 'bg-red-100 text-red-800'
      case 'PAID': return 'bg-green-100 text-green-800'
      case 'DISPUTED': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
            Recent Fines
          </div>
          <Badge variant="outline">{fines.length} total</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedFines.map((fine) => (
            <div key={fine.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {fine.offense.description}
                    </h3>
                    <Badge className={getStatusColor(fine.status)}>
                      {fine.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Notice: {fine.noticeNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    R {fine.amount.toLocaleString()}
                  </p>
                  {fine.discountAmount && fine.discountValidUntil && new Date(fine.discountValidUntil) > new Date() && (
                    <p className="text-sm text-green-600">
                      Save R {fine.discountAmount}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Car className="h-4 w-4 mr-1" />
                  {fine.vehicleRegistration}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due: {new Date(fine.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {fine.municipality.name}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Issued: {new Date(fine.issueDate).toLocaleDateString()}
                </p>
                <div className="flex space-x-2">
                  <Link href={`/fines/${fine.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  {(fine.status === 'OUTSTANDING' || fine.status === 'OVERDUE') && (
                    <Link href={`/payment/${fine.id}`}>
                      <Button size="sm" className="bg-[#6B8E23] hover:bg-[#4A7C59]">
                        <CreditCard className="h-4 w-4 mr-1" />
                        Pay Now
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {fines.length > 5 && (
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : `Show All ${fines.length} Fines`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}