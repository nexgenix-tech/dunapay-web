"use client";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Car,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { TrafficFine } from "@/lib/types";

interface FineDetailsProps {
  fine: TrafficFine;
}

export default function FineDetails({ fine }: FineDetailsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OUTSTANDING":
        return <AlertCircle className="h-5 w-5" />;
      case "PAID":
        return <CheckCircle className="h-5 w-5" />;
      case "OVERDUE":
        return <Clock className="h-5 w-5" />;
      case "DISPUTED":
        return <XCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OUTSTANDING":
        return "bg-yellow-100 text-yellow-800";
      case "PAID":
        return "bg-green-100 text-green-800";
      case "OVERDUE":
        return "bg-red-100 text-red-800";
      case "DISPUTED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isPayable = fine.status === "OUTSTANDING" || fine.status === "OVERDUE";
  const hasDiscount =
    fine.discountAmount &&
    fine.discountValidUntil &&
    new Date() < fine.discountValidUntil;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-[#6B8E23] hover:text-[#4A7C59]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Button>
        </div>

        {/* Fine Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-[#36454F] mb-2">
                  Traffic Fine Details
                </CardTitle>
                <CardDescription className="text-lg">
                  Notice Number: {fine.noticeNumber}
                </CardDescription>
              </div>
              <Badge
                className={`${getStatusColor(
                  fine.status
                )} flex items-center gap-2 text-sm px-3 py-1`}>
                {getStatusIcon(fine.status)}
                {fine.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Municipality Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#36454F] mb-2">
                Issuing Municipality
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{fine.municipality.name}</p>
                  <p className="text-sm text-gray-600">
                    {fine.municipality.province}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Phone: {fine.municipality.contactInfo.phone}</p>
                  <p>Email: {fine.municipality.contactInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Offense Details */}
            <div>
              <h3 className="font-semibold text-[#36454F] mb-3">
                Offense Information
              </h3>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="font-medium text-red-800 mb-2">
                  {fine.offense.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Code:</span>
                    <span className="ml-2 font-medium">
                      {fine.offense.code}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <span className="ml-2 font-medium">
                      {fine.offense.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Points:</span>
                    <span className="ml-2 font-medium">
                      {fine.offense.points}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Fine Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#36454F]">Fine Details</h3>

                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-3" />
                  <div>
                    <p className="text-sm">Issue Date</p>
                    <p className="font-medium">
                      {fine.issueDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-3" />
                  <div>
                    <p className="text-sm">Due Date</p>
                    <p className="font-medium">
                      {fine.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-3" />
                  <div>
                    <p className="text-sm">Location</p>
                    <p className="font-medium">{fine.location}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#36454F]">
                  Vehicle & Driver
                </h3>

                <div className="flex items-center text-gray-600">
                  <Car className="h-4 w-4 mr-3" />
                  <div>
                    <p className="text-sm">Vehicle Registration</p>
                    <p className="font-medium">{fine.vehicleRegistration}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-3" />
                  <div>
                    <p className="text-sm">Driver ID Number</p>
                    <p className="font-medium">{fine.driverIdNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Information */}
            <div className="bg-[#8FBC8F]/10 p-6 rounded-lg">
              <h3 className="font-semibold text-[#36454F] mb-4">
                Payment Information
              </h3>

              {hasDiscount ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Original Amount:</span>
                    <span className="line-through text-gray-500">
                      R{fine.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Discount:</span>
                    <span className="text-[#6B8E23]">
                      -R{fine.discountAmount!.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Amount Due:</span>
                    <span className="text-[#6B8E23]">
                      R{(fine.amount - fine.discountAmount!).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B8E23] mt-2">
                    Discount valid until{" "}
                    {fine.discountValidUntil!.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Amount Due:</span>
                  <span className="text-[#36454F]">
                    R{fine.amount.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {isPayable && fine.municipality.isSupported ? (
                <Link href={`/payment/${fine.id}`} className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-[#6B8E23] hover:bg-[#4A7C59]">
                    Pay Now - R
                    {hasDiscount
                      ? (fine.amount - fine.discountAmount!).toFixed(2)
                      : fine.amount.toFixed(2)}
                  </Button>
                </Link>
              ) : !fine.municipality.isSupported ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    This municipality is not yet supported for online payments.
                    Please contact them directly at{" "}
                    {fine.municipality.contactInfo.phone}.
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    This fine has already been {fine.status.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
