import Link from "next/link"
import { CheckCircle, Shield, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchForm from "@/components/SearchForm"
import { municipalities } from "@/lib/dummy-data"

export default function HomePage() {
  const supportedMunicipalities = municipalities.filter((m) => m.isSupported)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#8FBC8F] to-[#6B8E23] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Pay Traffic Fines Online</h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100">
              Quick, secure, and convenient payments for South African municipalities
            </p>
          </div>

          <SearchForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#36454F] mb-4">Why Choose dunaPAY?</h2>
            <p className="text-lg text-gray-600">The easiest way to pay your traffic fines online</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#8FBC8F] rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-[#36454F]">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Bank-grade security with SSL encryption for all transactions</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#8FBC8F] rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-[#36454F]">Instant Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Pay your fines instantly and receive immediate confirmation</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#8FBC8F] rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-[#36454F]">Multiple Municipalities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Support for major municipalities across South Africa</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#8FBC8F] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-[#36454F]">Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Simple search and payment process in just a few clicks</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#36454F] mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Pay your traffic fines in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#6B8E23] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-[#36454F] mb-2">Search</h3>
              <p className="text-gray-600">
                Enter your ID number, notice number, or vehicle registration to find your fines
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#6B8E23] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-[#36454F] mb-2">Review</h3>
              <p className="text-gray-600">
                Review your fine details, check for available discounts, and confirm payment amount
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#6B8E23] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-[#36454F] mb-2">Pay</h3>
              <p className="text-gray-600">Complete your secure payment and receive instant confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Municipalities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#36454F] mb-4">Supported Municipalities</h2>
            <p className="text-lg text-gray-600 mb-8">We currently support online payments for these municipalities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {supportedMunicipalities.map((municipality) => (
              <Card key={municipality.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-[#36454F] flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#6B8E23] mr-2" />
                    {municipality.name}
                  </CardTitle>
                  <CardDescription>{municipality.province}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/municipalities">
              <Button variant="outline" size="lg">
                View All Municipalities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 mb-4 bg-[#3A4851FF] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Pay Your Fines?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of South Africans who trust dunaPAY for their traffic fine payments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-[#6B8E23] hover:bg-[#4A7C59]">
                Create Account
              </Button>
            </Link>
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#36454F] bg-transparent"
              >
                Search Fines
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
