"use client";

import React from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import type { TrafficFine } from "@/lib/types";

interface PaymentSuccessProps {
  fine: TrafficFine;
}

export default function PaymentSuccess({ fine }: PaymentSuccessProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const handleBack = () => {
    window.history.back();
  };

  if (!fine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Fine Not Found</h2>
            <p className="text-gray-600 mb-4">The requested fine could not be found.</p>
            <button
              onClick={handleBack}
              className="w-full bg-gradient-to-r from-[#6B8E23] to-[#4A7C59] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
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
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Payment Successful</h1>
          <p className="text-gray-600">Thank you for your payment</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Payment Status Header */}
          <div className="p-6 bg-gradient-to-r from-[#6B8E23] to-[#4A7C59] text-white">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 mr-3" />
              <div>
                <h2 className="text-xl font-semibold">Payment Completed!</h2>
                <p className="text-green-100">Your traffic fine has been successfully paid</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Fine Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Fine Notice</span>
                <span className="font-medium">#{fine.noticeNumber}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Offense</span>
                <span className="font-medium">{fine.offense.description}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Location</span>
                <span className="font-medium">{fine.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Amount Paid</span>
                <span className="text-2xl font-bold text-green-600">{formatCurrency(fine.amount)}</span>
              </div>
            </div>

            {/* Payment Confirmation */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Confirmation</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600 mb-2">
                  Thank you for settling your traffic fine. A confirmation email with your payment details has been sent to the email address provided during payment.
                </p>
                <p className="text-gray-600 mb-2">
                  The payment will be remitted to the issuing municipality within the next 3-5 business days. You will receive a notification from the municipality once the payment has been processed and the fine is cleared from your record.
                </p>
                <p className="text-gray-600">
                  For any queries regarding your payment, please contact our support team or the issuing municipality directly, quoting your fine notice number #{fine.noticeNumber}.
                </p>
              </div>
            </div>

            {/* Back to Search Button */}
            <div className="pt-4">
              <button
                onClick={handleBack}
                className="w-full bg-gradient-to-r from-[#6B8E23] to-[#4A7C59] text-white py-4 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center text-lg font-semibold"
              >
                Back to Search
              </button>
            </div>

            {/* Additional Info */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p className="mb-2">Your payment was securely processed through PayFast.</p>
              <p>Keep your fine notice number for future reference.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}