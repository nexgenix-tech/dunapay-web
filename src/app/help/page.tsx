"use client";

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  CreditCard, 
  Car, 
  User, 
  Shield, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  CheckCircle,
  FileText,
  Settings,
  Globe,
  Smartphone
} from 'lucide-react';

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);


const toggleFAQ = (index: number): void => {
    setOpenFAQ(openFAQ === index ? null : index);
};

  const categories = [
    {
      icon: User,
      title: "Getting Started",
      description: "Account setup and first steps",
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      icon: Car,
      title: "Finding Fines",
      description: "How to search for traffic infringements",
      color: "bg-green-50 border-green-200 text-green-800"
    },
    {
      icon: CreditCard,
      title: "Payments",
      description: "Payment methods and processing",
      color: "bg-purple-50 border-purple-200 text-purple-800"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Data protection and account security",
      color: "bg-red-50 border-red-200 text-red-800"
    },
    {
      icon: Settings,
      title: "Account Management",
      description: "Managing your profile and preferences",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800"
    },
    {
      icon: Globe,
      title: "Supported Areas",
      description: "Municipalities and regions we serve",
      color: "bg-indigo-50 border-indigo-200 text-indigo-800"
    }
  ];

const faqs = [
    {
        category: "Getting Started",
        question: "Do I need to register an account to use DunaPAY?",
        answer: "No, you can make quick payments without registering. Simply search for fines using your South African ID number, traffic notice number, or vehicle registration number, select the fine, and click 'Pay'. However, to view detailed fine information, track payment history, request refunds, or manage multiple vehicles, you need to create an account."
    },
    {
        category: "Getting Started",
        question: "How do I create a DunaPay account?",
        answer: "To create an account, click 'Register' on our homepage and provide your full name, email address, phone number, and South African ID number. You'll receive a verification email to activate your account."
    },
    {
        category: "Getting Started",
        question: "What information do I need to register?",
        answer: "You'll need a valid South African ID number, email address, phone number, and the vehicle registration numbers you want to monitor for traffic fines."
    },
    {
        category: "Finding Fines",
        question: "How do I search for traffic fines?",
        answer: "You can search for fines by entering your South African ID number, traffic notice number, or vehicle registration number in the search field. Our system will check all supported municipalities for any outstanding fines."
    },
    {
        category: "Finding Fines",
        question: "Why can't I find my traffic fine?",
        answer: "This could be because: 1) The fine is from a municipality we don't support yet, 2) The fine is very recent and hasn't been processed yet, 3) The registration number was entered incorrectly, or 4) The fine may have already been paid."
    },
    {
        category: "Finding Fines",
        question: "How often is fine data updated?",
        answer: "We update our fine database daily. However, there may be a delay of 24-48 hours between when a fine is issued and when it appears in our system, depending on the municipality."
    },
    {
        category: "Payments",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards, as well as instant EFT payments through our secure PayFast payment gateway. We do not store your payment details on our servers."
    },
    {
        category: "Payments",
        question: "How long does it take for payments to be processed?",
        answer: "Payments are processed immediately through PayFast. However, it may take 1-3 business days for the payment to reflect with the relevant municipality and for the fine to be marked as paid in their system."
    },
    {
        category: "Payments",
        question: "Can I pay multiple fines at once?",
        answer: "Yes, you can select multiple outstanding fines and pay them all in a single transaction. This is convenient and saves on transaction fees."
    },
    {
        category: "Payments",
        question: "What happens if my payment fails?",
        answer: "If a payment fails, you'll receive an immediate notification. Common reasons include insufficient funds, expired cards, or bank security blocks. You can retry the payment once the issue is resolved."
    },
    {
        category: "Security & Privacy",
        question: "Is my personal information secure?",
        answer: "Yes, we use bank-grade security including SSL encryption for all data transmission. We comply with the POPI Act and never store credit card information on our servers."
    },
    {
        category: "Security & Privacy",
        question: "Do you share my information with third parties?",
        answer: "We only share information with municipalities to process your fine payments and with PayFast for payment processing. We never sell or share your information for marketing purposes."
    },
    {
        category: "Account Management",
        question: "How do I update my contact information?",
        answer: "Log into your account and go to 'Profile Settings' where you can update your email address, phone number, and other contact details. Some changes may require verification."
    },
    {
        category: "Account Management",
        question: "Can I add multiple vehicles to my account?",
        answer: "Yes, you can add multiple vehicle registration numbers to your account for easy monitoring of all your vehicles' traffic fines in one place."
    },
    {
        category: "Supported Areas",
        question: "Which municipalities do you support?",
        answer: "We currently support major municipalities including Emalahleni Municipality, City of Johannesburg, eThekwini (Durban), and Tshwane (Pretoria). We're continuously adding new municipalities, please check our website for the latest list."
    },
    {
        category: "Supported Areas",
        question: "Will you add support for my municipality?",
        answer: "We're always working to expand our coverage. If your municipality isn't supported yet, you can request it through our contact form, and we'll prioritize based on demand."
    }
];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6B8E23] to-[#8FBC8F] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-4 text-white/90" />
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-white/90 mb-8">
              Find answers to common questions and get support
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6B8E23] focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#36454F] mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className={`${category.color} border rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer`}>
                <category.icon className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#36454F] mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <Car className="h-8 w-8 mx-auto mb-3 text-[#6B8E23]" />
              <h3 className="font-semibold text-[#36454F] mb-2">Search Fines</h3>
              <p className="text-sm text-gray-600">Look up traffic fines by registration number</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <CreditCard className="h-8 w-8 mx-auto mb-3 text-[#6B8E23]" />
              <h3 className="font-semibold text-[#36454F] mb-2">Make Payment</h3>
              <p className="text-sm text-gray-600">Pay your traffic fines securely online</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <FileText className="h-8 w-8 mx-auto mb-3 text-[#6B8E23]" />
              <h3 className="font-semibold text-[#36454F] mb-2">Payment History</h3>
              <p className="text-sm text-gray-600">View your payment records and receipts</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <User className="h-8 w-8 mx-auto mb-3 text-[#6B8E23]" />
              <h3 className="font-semibold text-[#36454F] mb-2">Account Settings</h3>
              <p className="text-sm text-gray-600">Update your profile and preferences</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#36454F] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-[#6B8E23] bg-[#6B8E23]/10 px-2 py-1 rounded-full mr-3">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-[#36454F]">{faq.question}</h3>
                    </div>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#36454F] mb-8 text-center">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Phone className="h-12 w-12 mx-auto mb-4 text-[#6B8E23]" />
              <h3 className="text-lg font-semibold text-[#36454F] mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak to our support team</p>
              <p className="text-[#6B8E23] font-semibold">+27 (0)10 312 6430</p>
              <p className="text-sm text-gray-500 mt-2">Mon-Fri: 8AM-6PM</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-[#6B8E23]" />
              <h3 className="text-lg font-semibold text-[#36454F] mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get help via email</p>
              <p className="text-[#6B8E23] font-semibold">support@dunapay.co.za</p>
              <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-[#6B8E23]" />
              <h3 className="text-lg font-semibold text-[#36454F] mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with us in real-time</p>
              <button className="bg-[#6B8E23] text-white px-4 py-2 rounded-lg hover:bg-[#8FBC8F] transition-colors">
                Start Chat
              </button>
              <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Status and Updates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-[#36454F]">System Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Gateway</span>
                <span className="text-green-600 text-sm font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Fine Search</span>
                <span className="text-green-600 text-sm font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Municipality Integration</span>
                <span className="text-green-600 text-sm font-medium">Operational</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-[#36454F]">Latest Updates</h3>
            </div>
            <div className="space-y-3">
              <div className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <p className="text-sm text-gray-600">Added support for City of Cape Town traffic fines</p>
                <p className="text-xs text-gray-500 mt-1">July 10, 2025</p>
              </div>
              <div className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <p className="text-sm text-gray-600">Improved mobile app performance</p>
                <p className="text-xs text-gray-500 mt-1">July 5, 2025</p>
              </div>
              <div className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
                <p className="text-sm text-gray-600">Enhanced security features implemented</p>
                <p className="text-xs text-gray-500 mt-1">June 28, 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="bg-gradient-to-r from-[#6B8E23] to-[#8FBC8F] rounded-lg p-8 text-white text-center">
          <Smartphone className="h-12 w-12 mx-auto mb-4 text-white/90" />
          <h2 className="text-2xl font-bold mb-4">Get the DunaPay Mobile App</h2>
          <p className="text-white/90 mb-6">
            Manage your traffic fines on the go with our mobile app. Available for iOS and Android.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-[#6B8E23] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Download for iOS
            </button>
            <button className="bg-white text-[#6B8E23] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Download for Android
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;