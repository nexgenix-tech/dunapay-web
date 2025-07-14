import Link from "next/link"
import { Calendar, MapPin, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TrafficFine } from "@/lib/types"

interface FineCardProps {
  fine: TrafficFine
}

export default function FineCard({ fine }: FineCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OUTSTANDING":
        return <AlertCircle className="h-4 w-4" />
      case "PAID":
        return <CheckCircle className="h-4 w-4" />
      case "OVERDUE":
        return <Clock className="h-4 w-4" />
      case "DISPUTED":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OUTSTANDING":
        return "bg-yellow-100 text-yellow-800"
      case "PAID":
        return "bg-green-100 text-green-800"
      case "OVERDUE":
        return "bg-red-100 text-red-800"
      case "DISPUTED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isPayable = fine.status === "OUTSTANDING" || fine.status === "OVERDUE"
  const hasDiscount = fine.discountAmount && fine.discountValidUntil && new Date() < fine.discountValidUntil

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-[#36454F]">Notice #{fine.noticeNumber}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {fine.municipality.name} • {fine.vehicleRegistration}
            </p>
          </div>
          <Badge className={`${getStatusColor(fine.status)} flex items-center gap-1`}>
            {getStatusIcon(fine.status)}
            {fine.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Due: {fine.dueDate.toLocaleDateString()}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {fine.location}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="font-medium text-[#36454F]">{fine.offense.description}</p>
          <p className="text-sm text-gray-600 mt-1">
            Code: {fine.offense.code} • Points: {fine.offense.points}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {hasDiscount ? (
              <div>
                <p className="text-lg font-bold text-[#6B8E23]">R{(fine.amount - fine.discountAmount!).toFixed(2)}</p>
                <p className="text-sm text-gray-500 line-through">R{fine.amount.toFixed(2)}</p>
                <p className="text-xs text-[#6B8E23]">
                  Discount valid until {fine.discountValidUntil!.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-lg font-bold text-[#36454F]">R{fine.amount.toFixed(2)}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Link href={`/fine/${fine.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            {isPayable && fine.municipality.isSupported && (
              <Link href={`/payment/${fine.id}`}>
                <Button size="sm" className="bg-[#6B8E23] hover:bg-[#4A7C59]">
                  Pay Now
                </Button>
              </Link>
            )}
          </div>
        </div>

        {!fine.municipality.isSupported && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <AlertCircle className="h-4 w-4 inline mr-1" />
              This municipality is not yet supported for online payments. Please contact them directly.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
