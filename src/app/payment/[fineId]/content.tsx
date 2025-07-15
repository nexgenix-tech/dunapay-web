"use client";

import React, { useState } from "react";
import {
  CreditCard,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { initiateFinePayment } from "@/lib/api";
import type { TrafficFine } from "@/lib/types";

interface FineDetailsProps {
  fine: TrafficFine;
}

// PayFast configuration - replace with your actual merchant details
const PAYFAST_CONFIG = {
  merchant_id: process.env.NEXT_PUBLIC_MERCHANT_ID as string,
  merchant_key: process.env.NEXT_PUBLIC_MERCHANT_KEY as string,
  sandbox: process.env.NODE_ENV !== "production", // Use sandbox for development
};

export default function PaymentDetails({ fine }: FineDetailsProps) {
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  interface EmailChangeEvent {
    target: {
      value: string;
    };
  }

  const handleEmailChange = (e: EmailChangeEvent) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);

      // Initialize payment session
      const session = await initiateFinePayment(fine.id);

      // Create PayFast form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = PAYFAST_CONFIG.sandbox
        ? "https://sandbox.payfast.co.za/eng/process"
        : "https://www.payfast.co.za/eng/process";

      const baseUrl = window.location.origin;
      const formData = {
        merchant_id: PAYFAST_CONFIG.merchant_id,
        merchant_key: PAYFAST_CONFIG.merchant_key,
        return_url: `${baseUrl}/payment/${fine.id}/success`,
        cancel_url: `${baseUrl}/payment/${fine.id}/cancel`,
        notify_url: `${baseUrl}/payment/notify/${fine.id}`,
        email_address: email,
        m_payment_id: session.id,
        amount: fine.amount.toFixed(2),
        item_name: `Traffic Fine - ${fine.noticeNumber}`,
        item_description: `${fine.offense.description} - ${fine.location}`,
        custom_int1: fine.id,
        custom_str1: fine.noticeNumber,
        custom_str2: fine.driverIdNumber,
        custom_str3: fine.vehicleRegistration,
      };

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Submit form
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setPaymentLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "overdue":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  if (!fine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Fine Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The requested fine could not be found.
            </p>
            <button
              onClick={handleBack}
              className="w-full bg-gradient-to-r from-[#6B8E23] to-[#4A7C59] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
          <p className="text-gray-600">Review and pay your traffic fine</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Fine Details Header */}
          <div className="p-6 bg-gradient-to-r from-[#6B8E23] to-[#4A7C59] text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Notice #{fine.noticeNumber}
                </h2>
                <p className="text-green-100">{fine.municipality.name}</p>
              </div>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(
                  fine.status
                )}`}>
                <AlertCircle className="h-4 w-4 mr-1" />
                {fine.status?.toUpperCase() || "PENDING"}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Driver Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Driver Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">ID Number</p>
                <p className="font-medium">{fine.driverIdNumber}</p>
              </div>
            </div>

            {/* Offense Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Offense Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Offense</p>
                  <p className="font-medium">{fine.offense.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Code</p>
                  <p className="font-medium">{fine.offense.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Points</p>
                  <p className="font-medium">{fine.offense.points}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicle</p>
                  <p className="font-medium">{fine.vehicleRegistration}</p>
                </div>
              </div>
            </div>

            {/* Location and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{fine.location}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">
                    {formatDate(fine.dueDate.toLocaleString())}
                  </p>
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(fine.amount)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Email Address
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-500 mb-2">
                  Enter your email address to receive payment confirmation and
                  receipt
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="example@email.com"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
            </div>

            {/* Payment Button */}
            <div className="pt-4">
              <button
                onClick={handlePayment}
                disabled={paymentLoading || !email || !validateEmail(email)}
                className="w-full bg-gradient-to-r from-[#6B8E23] to-[#4A7C59] text-white py-4 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold">
                {paymentLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Pay with PayFast
                  </>
                )}
              </button>
            </div>

            {/* Payment Info */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>
                You will be redirected to PayFast to complete your payment
                securely.
              </p>
              <p className="mt-2">
                Accepted payment methods: Credit Card, EFT, Instant EFT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
