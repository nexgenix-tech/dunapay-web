import { CheckCircle, XCircle, Phone, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { municipalities } from "@/lib/dummy-data"

export default function MunicipalitiesPage() {
  const supportedMunicipalities = municipalities.filter((m) => m.isSupported)
  const unsupportedMunicipalities = municipalities.filter((m) => !m.isSupported)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#36454F] mb-4">Supported Municipalities</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We&apos;re continuously expanding our coverage across South Africa. Check if your municipality supports online
            fine payments through dunaPAY.
          </p>
        </div>

        {/* Supported Municipalities */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-2xl font-bold text-[#36454F]">
              Currently Supported ({supportedMunicipalities.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportedMunicipalities.map((municipality) => (
              <Card key={municipality.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[#36454F]">{municipality.name}</CardTitle>
                      <CardDescription>{municipality.province}</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Supported
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {municipality.contactInfo.phone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {municipality.contactInfo.email}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Unsupported Municipalities */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <XCircle className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-2xl font-bold text-[#36454F]">Coming Soon ({unsupportedMunicipalities.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unsupportedMunicipalities.map((municipality) => (
              <Card key={municipality.id} className="opacity-75">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-[#36454F]">{municipality.name}</CardTitle>
                      <CardDescription>{municipality.province}</CardDescription>
                    </div>
                    <Badge variant="secondary">
                      <XCircle className="h-3 w-3 mr-1" />
                      Coming Soon
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {municipality.contactInfo.phone}
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {municipality.contactInfo.email}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Contact them directly for now</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Request Support */}
        <Card className="bg-[#8FBC8F]/10 border-[#8FBC8F]">
          <CardHeader className="text-center">
            <CardTitle className="text-[#36454F]">Don&apos;t see your municipality?</CardTitle>
            <CardDescription>
              We&apos;re working hard to add more municipalities. Let us know which one you&apos;d like to see next!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="bg-[#6B8E23] hover:bg-[#4A7C59]">Request Municipality Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
