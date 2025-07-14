"use client";

import React from 'react';
import { Shield, Eye, Lock, Database, UserCheck, Clock, AlertTriangle, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
            <Shield className="h-16 w-16 mx-auto mb-4 text-white/90" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-white/90">
              How we collect, use, and protect your personal information
            </p>
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm text-white/90">
                This policy is based on the POPI Act (Protection of Personal Information Act No.4 of 2013)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-[#36454F] mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { id: 'overview', title: 'Overview', icon: Eye },
              { id: 'information-collected', title: 'Information We Collect', icon: Database },
              { id: 'how-we-use', title: 'How We Use Your Information', icon: UserCheck },
              { id: 'data-security', title: 'Data Security', icon: Lock },
              { id: 'data-retention', title: 'Data Retention', icon: Clock },
              { id: 'your-rights', title: 'Your Rights', icon: Shield },
              { id: 'third-parties', title: 'Third Party Services', icon: AlertTriangle },
              { id: 'contact', title: 'Contact Us', icon: Phone }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center text-[#6B8E23] hover:text-[#8FBC8F] hover:bg-green-50 p-2 rounded-lg transition-all duration-200"
              >
                <item.icon className="h-4 w-4 mr-3" />
                <span className="text-sm">{item.title}</span>
                <ChevronRight className="h-4 w-4 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-12">
          
          {/* Overview */}
          <section id="overview">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Overview
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                DunaPay values your privacy and is committed to protecting your personal information. This privacy 
                policy explains how we collect, use, store, and protect your information when you use our traffic 
                infringement payment platform.
              </p>
              <p className="leading-relaxed">
                As a traffic infringement payment platform, DunaPay acts as an intermediary between vehicle owners 
                and local authorities to facilitate the settlement of traffic fines. This policy is designed to be 
                transparent about our data practices and your rights.
              </p>
              <div className="bg-[#6B8E23]/5 border border-[#6B8E23]/20 rounded-lg p-4">
                <p className="text-[#36454F] font-medium">
                  This privacy policy is based on the POPI Act (Protection of Personal Information Act No.4 of 2013) 
                  and complies with South African privacy laws.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="information-collected">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <Database className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#36454F] mb-3">Personal Identification Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To provide access to our platform and verify your identity, we collect:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#6B8E23] rounded-full mr-3"></div>
                    <span className="text-gray-700">Full Name</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#6B8E23] rounded-full mr-3"></div>
                    <span className="text-gray-700">Identity Number</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#6B8E23] rounded-full mr-3"></div>
                    <span className="text-gray-700">Email Address</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#6B8E23] rounded-full mr-3"></div>
                    <span className="text-gray-700">Phone Number</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#36454F] mb-3">Vehicle Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To search for and process traffic infringements, we collect:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#8FBC8F] rounded-full mr-3"></div>
                    <span className="text-gray-700">Vehicle Registration Numbers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#8FBC8F] rounded-full mr-3"></div>
                    <span className="text-gray-700">Traffic Notice Numbers</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#36454F] mb-3">Payment Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  DunaPay uses PayFast as our secure payment gateway. We do not collect or store credit card information directly:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#36454F] rounded-full mr-3"></div>
                    <span className="text-gray-700">Payment amounts and references</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#36454F] rounded-full mr-3"></div>
                    <span className="text-gray-700">Payment status and confirmations</span>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <Lock className="h-4 w-4 inline mr-1" />
                    All payment processing is handled securely by PayFast. Credit card details are never stored on our servers.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#36454F] mb-3">Technical Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We automatically collect certain technical information when you use our platform:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">IP Address</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Browser Type</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Device Information</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span className="text-gray-700">Usage Analytics</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="how-we-use">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <UserCheck className="h-6 w-6 mr-2 text-[#6B8E23]" />
              How We Use Your Information
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-3">Service Delivery</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Search for traffic infringements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Process payments to municipalities</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Verify user identity</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-3">Communication</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Send payment confirmations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Notify about new infringements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Provide customer support</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#36454F] mb-3">Legal and Compliance</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 mt-2"></div>
                    <span className="text-sm">Comply with legal obligations and regulatory requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 mt-2"></div>
                    <span className="text-sm">Maintain records for audit and compliance purposes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 mt-2"></div>
                    <span className="text-sm">Prevent fraud and ensure platform security</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section id="data-security">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Data Security
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We implement comprehensive security measures to protect your personal information from unauthorized access, 
                alteration, disclosure, or destruction.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-3">Technical Safeguards</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">SSL encryption for all data transmission</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Secure cloud hosting infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Regular security audits and updates</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-3">Access Controls</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Role-based access control systems</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Multi-factor authentication</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm">Regular access reviews and monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#36454F] mb-2">Payment Security</h3>
                <p className="text-gray-700 text-sm">
                  All payment processing is handled through PayFast, a PCI DSS compliant payment gateway. 
                  We do not store any credit card information on our servers.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section id="data-retention">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Data Retention
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined 
                in this privacy policy, unless a longer retention period is required by law.
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-[#36454F] mb-2">Account Information</h3>
                  <p className="text-gray-700 text-sm">
                    Retained for the duration of your account and up to 7 years after account closure for legal compliance.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-[#36454F] mb-2">Transaction Records</h3>
                  <p className="text-gray-700 text-sm">
                    Retained for 7 years as required by South African tax and financial regulations.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-[#36454F] mb-2">Technical Logs</h3>
                  <p className="text-gray-700 text-sm">
                    Retained for 12 months for security monitoring and system optimization purposes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section id="your-rights">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Your Rights Under POPI Act
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Under the Protection of Personal Information Act (POPI Act), you have the following rights regarding your personal information:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-[#36454F] mb-2">Right to Access</h3>
                    <p className="text-gray-700 text-sm">
                      Request access to your personal information that we hold.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-[#36454F] mb-2">Right to Correction</h3>
                    <p className="text-gray-700 text-sm">
                      Request correction of inaccurate or incomplete information.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-[#36454F] mb-2">Right to Deletion</h3>
                    <p className="text-gray-700 text-sm">
                      Request deletion of your personal information (subject to legal requirements).
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-[#36454F] mb-2">Right to Object</h3>
                    <p className="text-gray-700 text-sm">
                      Object to the processing of your personal information.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-[#36454F] mb-2">Right to Portability</h3>
                    <p className="text-gray-700 text-sm">
                      Request your personal information in a structured, commonly used format.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-[#36454F] mb-2">Right to Complain</h3>
                    <p className="text-gray-700 text-sm">
                      Lodge a complaint with the Information Regulator if you believe your rights have been violated.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  To exercise any of these rights, please contact us using the information provided in the Contact Us section below.
                </p>
              </div>
            </div>
          </section>

          {/* Third Party Services */}
          <section id="third-parties">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Third Party Services
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We work with trusted third-party service providers to deliver our services. These providers have access 
                to your personal information only to perform specific tasks on our behalf.
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-3">PayFast (Payment Gateway)</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    PayFast processes all payment transactions securely. They are PCI DSS compliant and follow strict security standards.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Information shared: Payment amount, transaction reference, basic contact information for payment processing.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-3">Municipal Systems</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    We integrate with supported municipal systems to retrieve infringement data and process payments.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Information shared: Vehicle registration numbers, identity numbers, and payment confirmations as required for service delivery.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-3">Cloud Service Providers</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    We use reputable cloud hosting providers with robust security measures and data protection compliance.
                  </p>
                  <p className="text-gray-700 text-sm">
                    Information shared: All platform data is hosted securely with appropriate encryption and access controls.
                  </p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  <AlertTriangle className="h-4 w-4 inline mr-1" />
                  We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section id="contact">
            <h2 className="text-2xl font-bold text-[#36454F] mb-4 flex items-center">
              <Phone className="h-6 w-6 mr-2 text-[#6B8E23]" />
              Contact Us
            </h2>
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this privacy policy, wish to exercise your rights, or have concerns 
                about how we handle your personal information, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#6B8E23]/5 border border-[#6B8E23]/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-4">Privacy Officer</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-[#6B8E23] mr-3" />
                      <span className="text-gray-700">privacy@dunapay.co.za</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-[#6B8E23] mr-3" />
                      <span className="text-gray-700">+27 (0)10 312 6430</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-[#6B8E23] mr-3 mt-1" />
                      <span className="text-gray-700">
                        372 Celliers Avenue, Lyttelton Manor, Centurion, 0157
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#36454F] mb-4">Information Regulator</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    If you are not satisfied with our response to your privacy concerns, you may lodge a complaint with:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 text-sm">inforeg@justice.gov.za</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-gray-700 text-sm">+27 (0)12 406 4818</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  We will respond to your privacy-related inquiries within 30 days as required by the POPI Act.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-8">
            <div className="text-center text-gray-600 space-y-2">
              <p className="text-sm">
                This privacy policy was last updated on <strong>July 14, 2025</strong>
              </p>
              <p className="text-sm">
                We may update this policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
              <p className="text-sm">
                By continuing to use DunaPay after any changes to this policy, you agree to the updated terms.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-500">
                  © 2025 DunaPay (Pty) Ltd. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;