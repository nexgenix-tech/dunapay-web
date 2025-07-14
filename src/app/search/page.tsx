"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AlertCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FineCard from "@/components/FineCard"
import { searchFines } from "@/lib/api"
import type { TrafficFine } from "@/lib/types"
import { useApp } from "@/contexts/AppContext"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { dispatch } = useApp()
  const [fines, setFines] = useState<TrafficFine[]>([])
  const [filteredFines, setFilteredFines] = useState<TrafficFine[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [municipalityFilter, setMunicipalityFilter] = useState<string>("all")

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true)
      dispatch({ type: "SET_LOADING", payload: true })

      try {
        const params = {
          idNumber: searchParams.get("idNumber") || undefined,
          noticeNumber: searchParams.get("noticeNumber") || undefined,
          vehicleRegistration: searchParams.get("vehicleRegistration") || undefined,
        }

        const results = await searchFines(params)
        setFines(results)
        setFilteredFines(results)
        dispatch({ type: "SET_SEARCH_RESULTS", payload: results })
      } catch (error) {
        console.error("Error fetching fines:", error)
        setFines([])
        setFilteredFines([])
        dispatch({ type: "SET_ERROR", payload: "Failed to search fines. Please try again." })
      } finally {
        setIsLoading(false)
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    performSearch()
  }, [searchParams, dispatch])

  useEffect(() => {
    let filtered = fines

    if (statusFilter !== "all") {
      filtered = filtered.filter((fine) => fine.status === statusFilter)
    }

    if (municipalityFilter !== "all") {
      filtered = filtered.filter((fine) => fine.municipality.id === municipalityFilter)
    }

    setFilteredFines(filtered)
  }, [fines, statusFilter, municipalityFilter])

  const uniqueMunicipalities = Array.from(new Set(fines.map((fine) => fine.municipality.id))).map(
    (id) => fines.find((fine) => fine.municipality.id === id)!.municipality,
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B8E23] mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for your fines...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#36454F] mb-2">Search Results</h1>
          <p className="text-gray-600">
            {filteredFines.length} fine{filteredFines.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {fines.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-gray-400" />
              </div>
              <CardTitle className="text-[#36454F]">No Fines Found</CardTitle>
              <CardDescription>
                We couldn&apos;t find any traffic fines matching your search criteria. Please check your details and try
                again.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.history.back()} className="bg-[#6B8E23] hover:bg-[#4A7C59]">
                Try Another Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter by:</span>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="OUTSTANDING">Outstanding</SelectItem>
                    <SelectItem value="OVERDUE">Overdue</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="DISPUTED">Disputed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Municipalities</SelectItem>
                    {uniqueMunicipalities.map((municipality) => (
                      <SelectItem key={municipality.id} value={municipality.id}>
                        {municipality.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFines.map((fine) => (
                <FineCard key={fine.id} fine={fine} />
              ))}
            </div>

            {filteredFines.length === 0 && fines.length > 0 && (
              <Card className="text-center py-8">
                <CardContent>
                  <p className="text-gray-600">
                    No fines match your current filters. Try adjusting your filter criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
