import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#36454F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">dunaPAY</h3>
            <p className="text-gray-300 mb-4">
              Making traffic fine payments easy and secure across South Africa. Pay your fines online with confidence.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                010 312 6430
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                support@dunapay.co.za
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#8FBC8F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/municipalities" className="hover:text-[#8FBC8F] transition-colors">
                  Municipalities
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-[#8FBC8F] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-[#8FBC8F] transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/help" className="hover:text-[#8FBC8F] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8FBC8F] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#8FBC8F] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#8FBC8F] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 dunaPAY. All rights reserved. | Secure online traffic fine payments for South Africa</p>
        </div>
      </div>
    </footer>
  )
}
