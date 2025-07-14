"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, AlertCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// South African ID number validation
const validateSAIdNumber = (idNumber: string): boolean => {
  if (idNumber.length !== 13 || !/^\d{13}$/.test(idNumber)) {
    return false
  }
  
  // Basic checksum validation (Luhn algorithm for SA ID)
  const digits = idNumber.split('').map(Number)
  const checkDigit = digits[12]
  
  let sum = 0
  for (let i = 0; i < 12; i++) {
    if (i % 2 === 0) {
      sum += digits[i]
    } else {
      const doubled = digits[i] * 2
      sum += doubled > 9 ? doubled - 9 : doubled
    }
  }
  
  return (10 - (sum % 10)) % 10 === checkDigit
}

// Vehicle registration validation (SA format)
const validateVehicleReg = (reg: string): boolean => {
  // Common SA formats: CAW123GP, CA123456, NTY123EC, etc.
  const patterns = [
    /^[A-Z]{2,3}\d{3,4}[A-Z]{2}$/,  // CAW123GP, CA1234GP
    /^[A-Z]{2}\d{4,6}$/,            // CA123456
    /^[A-Z]{3}\d{3}[A-Z]{2}$/,      // NTY123EC
  ]
  
  return patterns.some(pattern => pattern.test(reg.toUpperCase()))
}

export default function SearchForm() {
  const [searchType, setSearchType] = useState("id")
  const [idNumber, setIdNumber] = useState("")
  const [noticeNumber, setNoticeNumber] = useState("")
  const [vehicleRegistration, setVehicleRegistration] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const router = useRouter()
  const searchParams = useSearchParams()

  // Pre-populate form from URL params (for direct links)
  useEffect(() => {
    const idParam = searchParams.get("idNumber")
    const noticeParam = searchParams.get("noticeNumber")
    const vehicleParam = searchParams.get("vehicleRegistration")
    
    if (idParam) {
      setSearchType("id")
      setIdNumber(idParam)
    } else if (noticeParam) {
      setSearchType("notice")
      setNoticeNumber(noticeParam)
    } else if (vehicleParam) {
      setSearchType("vehicle")
      setVehicleRegistration(vehicleParam)
    }
  }, [searchParams])

  // Real-time validation
  const validateField = (type: string, value: string): string => {
    switch (type) {
      case "id":
        if (!value) return "ID number is required"
        if (value.length !== 13) return "ID number must be 13 digits"
        if (!/^\d{13}$/.test(value)) return "ID number must contain only digits"
        if (!validateSAIdNumber(value)) return "Invalid South African ID number"
        return ""
      
      case "notice":
        if (!value) return "Notice number is required"
        if (value.length < 8) return "Notice number seems too short"
        if (!/^[A-Z]{2,3}\d{4,}/.test(value.toUpperCase())) {
          return "Notice number format invalid (e.g., CT2024001234)"
        }
        return ""
      
      case "vehicle":
        if (!value) return "Vehicle registration is required"
        if (!validateVehicleReg(value)) {
          return "Invalid vehicle registration format"
        }
        return ""
      
      default:
        return ""
    }
  }

  // Handle input changes with validation
  const handleInputChange = (type: string, value: string) => {
   
    switch (type) {
      case "id":
        // Only allow digits for ID number
        const cleanId = value.replace(/\D/g, "")
        setIdNumber(cleanId)
        setErrors(prev => ({ ...prev, id: validateField("id", cleanId) }))
        break
      
      case "notice":
        const cleanNotice = value.toUpperCase().replace(/[^A-Z0-9]/g, "")
        setNoticeNumber(cleanNotice)
        setErrors(prev => ({ ...prev, notice: validateField("notice", cleanNotice) }))
        break
      
      case "vehicle":
        const cleanVehicle = value.toUpperCase().replace(/[^A-Z0-9]/g, "")
        setVehicleRegistration(cleanVehicle)
        setErrors(prev => ({ ...prev, vehicle: validateField("vehicle", cleanVehicle) }))
        break
    }
  }

  // Check if form is valid
  const isFormValid = () => {
    const currentError = validateField(searchType, getCurrentValue())
    return !currentError && getCurrentValue().length > 0
  }

  // Get current input value based on search type
  const getCurrentValue = () => {
    switch (searchType) {
      case "id": return idNumber
      case "notice": return noticeNumber
      case "vehicle": return vehicleRegistration
      default: return ""
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const currentValue = getCurrentValue()
    const currentError = validateField(searchType, currentValue)
    
    if (currentError) {
      setErrors(prev => ({ ...prev, [searchType]: currentError }))
      return
    }
    
    setIsLoading(true)
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    const params = new URLSearchParams()
    
    if (searchType === "id" && idNumber) {
      params.set("idNumber", idNumber)
    } else if (searchType === "notice" && noticeNumber) {
      params.set("noticeNumber", noticeNumber)
    } else if (searchType === "vehicle" && vehicleRegistration) {
      params.set("vehicleRegistration", vehicleRegistration)
    }

    router.push(`/search?${params.toString()}`)
  }

  // Clear errors when switching tabs
  const handleTabChange = (value: string) => {
    setSearchType(value)
    setErrors({})
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-[#36454F]">Search for Traffic Fines</CardTitle>
        <CardDescription>Find and pay your outstanding traffic fines quickly and securely</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> Not all municipalities are currently supported. 
            <a href="/municipalities" className="text-[#6B8E23] hover:underline ml-1">
              Check supported areas
            </a>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSearch}>
          <Tabs value={searchType} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="id">ID No.</TabsTrigger>
              <TabsTrigger value="notice">Notice No.</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle Reg.</TabsTrigger>
            </TabsList>

            <TabsContent value="id" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idNumber">South African ID Number</Label>
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="e.g., 8001015009087"
                  value={idNumber}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  maxLength={13}
                  className={errors.id ? "border-red-500 focus:border-red-500" : ""}
                />
                {errors.id && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.id}
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Enter your 13-digit South African ID number
                </p>
              </div>
            </TabsContent>

            <TabsContent value="notice" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="noticeNumber">Traffic Fine Notice Number</Label>
                <Input
                  id="noticeNumber"
                  type="text"
                  placeholder="e.g., CT2024001234"
                  value={noticeNumber}
                  onChange={(e) => handleInputChange("notice", e.target.value)}
                  className={errors.notice ? "border-red-500 focus:border-red-500" : ""}
                />
                {errors.notice && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.notice}
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Found on your traffic fine notice (usually starts with municipality code)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="vehicle" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleRegistration">Vehicle Registration Number</Label>
                <Input
                  id="vehicleRegistration"
                  type="text"
                  placeholder="e.g., CA123456 or CAW123GP"
                  value={vehicleRegistration}
                  onChange={(e) => handleInputChange("vehicle", e.target.value)}
                  className={errors.vehicle ? "border-red-500 focus:border-red-500" : ""}
                />
                {errors.vehicle && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.vehicle}
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Enter your vehicle&apos;s registration number as shown on your license disc
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            type="submit" 
            className="w-full mt-6 bg-[#6B8E23] hover:bg-[#4A7C59] text-white" 
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search Fines
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}