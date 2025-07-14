"use client"

import React from 'react';
import { ChevronRight, Shield, FileText, CreditCard, AlertCircle, Calendar, MapPin, Phone, Mail } from 'lucide-react';

const TermsPage = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6B8E23] to-[#8FBC8F] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 text-white/90" />
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-xl text-white/90">
              Please read these terms carefully before using DunaPay services
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#36454F] mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            {[
              { id: 'acceptance', title: 'Acceptance of Terms' },
              { id: 'intellectual-property', title: 'Intellectual Property' },
              { id: 'privacy-policy', title: 'Privacy Policy' },
              { id: 'service-description', title: 'Service Description' },
              { id: 'limitation-liability', title: 'Limitation of Liability' },
              { id: 'payment-terms', title: 'Payment Terms' },
              { id: 'refund-policy', title: 'Refund Policy' },
              { id: 'cancellation', title: 'Cancellation Policy' },
              { id: 'governing-laws', title: 'Governing Laws' },
              { id: 'contact', title: 'Contact Information' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center text-[#6B8E23] hover:text-[#8FBC8F] transition-colors duration-200"
              >
                <ChevronRight className="h-4 w-4 mr-2" />
                {item.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-12">
          
          {/* Acceptance of Terms */}
          <section id="acceptance">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By registering as a user and continuing to use this site (www.dunapay.co.za), you hereby accept 
              the Terms and Conditions of this Agreement. You further acknowledge having read, understood, and 
              agreed to be bound by them.
            </p>
          </section>

          {/* Intellectual Property */}
          <section id="intellectual-property">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Intellectual Property</h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                All content inclusive of features and functionalities on this website (www.dunapay.co.za) is the 
                property of DunaPay, its shareholders and content creators. You may not mirror, copy or distribute 
                without express permission from DunaPay.
              </p>
              <p className="leading-relaxed">
                All intellectual rights and property are governed by South African and international IP and copyright laws.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                  <p className="text-yellow-800">
                    Unauthorized removal, modification, duplication and distribution is illegal and is subject to 
                    both criminal and civil litigation including personal claim for damages.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy-policy">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This privacy policy is based on the POPI Act (Protection of Personal Information Act No.4 of 2013). 
              DunaPay values your privacy and have thus developed this policy to outline how we intend to safeguard your privacy.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#36454F] mb-2">Definition of Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  DunaPay is a traffic infringement payment platform. All infringements are linked to registered 
                  vehicle owner or designated driver. To provide you access to this website, we need to verify your 
                  credentials or personal identifiable information, which may include:
                </p>
                <ul className="text-gray-700 space-y-1 ml-6">
                  <li>• Name</li>
                  <li>• Identity or Registration Number</li>
                  <li>• Email Address</li>
                  <li>• Telephone Numbers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#36454F] mb-2">Consent</h3>
                <p className="text-gray-700 leading-relaxed">
                  DunaPay considers your choice to register as a user on this website as you giving us consent to 
                  collecting your personal information for the purpose of providing you service(s) offered on this site. 
                  We commit ourselves to absolute diligence in protecting your personal information from illegal exposure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#36454F] mb-2">Other Information We May Collect</h3>
                <p className="text-gray-700 leading-relaxed">
                  In order to facilitate settlement of outstanding infringements you may provide to us credit, debit 
                  or banking details. Such information will be treated with greatest confidentiality and will be used 
                  for sole purpose of facilitating a specific transaction nothing further.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#36454F] mb-2">How We Use Your Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may, in the process of providing you our service(s), collect information to facilitate settlement 
                  of outstanding infringements, contacting you via email, SMS, MMS or social media platforms. We may 
                  contact you to advise of new transactions in your registered account or advise you changes on this website.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#36454F] mb-2">Data Retention</h3>
                <p className="text-gray-700 leading-relaxed">
                  DunaPay commits not to keep your personal information for time periods beyond the purpose for which 
                  it is collected or processed unless there is a specific legal requirement in doing so.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#36454F] mb-2">Accuracy of Personal Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  DunaPay receives information from local authorities and is not the originator or primary processor 
                  of infringement data but is simply a settlement agent facilitating payment(s). In this regard DunaPay 
                  may not be able to guarantee the accuracy or completeness your personal data. Notwithstanding provisions 
                  above, DunaPay will endeavour to provide as accurate information as it possibly can.
                </p>
              </div>
            </div>
          </section>

          {/* Service Description */}
          <section id="service-description">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Service Description</h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                DunaPay is a traffic infringement settlement platform that allows users to:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Search for traffic fines using ID number, notice number, or vehicle registration</li>
                <li>• View infringement details from supported municipalities</li>
                <li>• Make secure payments through PayFast payment gateway</li>
                <li>• Receive payment confirmations and receipts</li>
              </ul>
              <p className="leading-relaxed">
                DunaPay acts as a payment agent and settlement facilitator for local authorities and municipalities.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section id="limitation-liability">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                DunaPay is a payment agent and therefore cannot guarantee correctness or availability of all traffic 
                infringement records provided to us by local authorities. In some instances, we may only get access 
                local authorities through APIs or links for which we cannot guarantee reliability.
              </p>
              <p className="leading-relaxed">
                Information kept on this website (www.dunapay.co.za) should not be regarded as professional or legal 
                advice therefore should not be relied upon.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <p className="text-red-800">
                    DunaPay will employ all data safeguards including but not limited encryption technology on your 
                    personal information but accepts no responsibility or liability whatsoever for any damages that 
                    you may suffer as a result of a data or confidentiality breach.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Terms */}
          <section id="payment-terms">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Payment Terms
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                DunaPay will process transactions in South African Rands only.
              </p>
              <p className="leading-relaxed">
                All payments are processed through secure payment gateways and are subject to the terms and conditions 
                of the respective payment service providers.
              </p>
              <p className="leading-relaxed">
                Payment processing fees may apply and will be clearly displayed before payment confirmation.
              </p>
            </div>
          </section>

          {/* Refund Policy */}
          <section id="refund-policy">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Refund Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                By using DunaPay platform you accept that this website (www.dunapay.co.za) is merely a settlement 
                agent contracted by local authorities to facilitate settlement of infringements. In this regard 
                refunds are subject to time limit in that once funds have been remitted to the local authority 
                DunaPay cannot guarantee the period it would take for the refund process to be finalised.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-blue-800 font-medium">Important Refund Timeline</p>
                    <p className="text-blue-700 mt-1">
                      You are advised to lodge your refund request within seven (7) days of payment, upon which 
                      a refund shall be processed within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section id="cancellation">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              DunaPay is a subscription-based membership, therefore you may deregister or unsubscribe from any 
              services or communications provided by this website, by either contacting us and requesting to 
              deregister or unsubscribe.
            </p>
          </section>

          {/* Governing Laws */}
          <section id="governing-laws">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Governing Laws and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              DunaPay (www.dunapay.co.za) website is domiciled in South Africa. The Terms and Conditions of this 
              website shall be governed by the laws of the Republic of South Africa and the North Gauteng High Court 
              shall have jurisdiction over matters arising out of the use of this website or Terms and Conditions thereof.
            </p>
          </section>

          {/* Contact Information */}
          <section id="contact">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4">Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#6B8E23] mr-3" />
                  <span className="text-gray-700">372 Celliers Avenue, Lyttelton Manor, Centurion, 0157</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#6B8E23] mr-3" />
                  <span className="text-gray-700">010 312 6430</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#6B8E23] mr-3" />
                  <span className="text-gray-700">info@dunapay.co.za</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;