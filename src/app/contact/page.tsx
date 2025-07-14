"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'municipality', label: 'Request New Municipality Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Payment/Billing Question' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

interface FormData {
    name: string;
    email: string;
    subject: string;
    category: string;
    message: string;
}



interface Errors {
    [key: string]: string;
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
        ...prev,
        [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
        setErrors((prev: Errors) => ({
            ...prev,
            [name]: ''
        }));
    }
};



const handleSubmit = async (
    e: React.FormEvent<HTMLButtonElement | HTMLFormElement>
): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
        // Placeholder POST endpoint - replace with your actual endpoint
        const response: Response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        setSubmitStatus('success');
        setFormData({
            name: '',
            email: '',
            subject: '',
            category: '',
            message: ''
        });

    } catch (error: unknown) {
        console.error('Error sending message:', error);
        setSubmitStatus('error');
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have a question that&apos;s not covered in our help center? Need support for a new municipality? We&apos;re here to help!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">support@dunapay.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">+27 10 312 6430</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Office</p>
                    <p className="text-gray-600">
                      372 Celliers Avenue, Lyttelton Manor, Centurion, 0157
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#8FBC8F20' }}>
                <div className="flex items-center space-x-2 mb-2">
                  <HelpCircle className="w-4 h-4" style={{ color: '#6B8E23' }} />
                  <span className="font-medium text-gray-900">Quick Help</span>
                </div>
                <p className="text-sm text-gray-600">
                  For immediate assistance with common questions, check out our 
                  <a href="/help" className="ml-1 font-medium" style={{ color: '#6B8E23' }}>Help Center</a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">Message sent successfully!</p>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800 font-medium">Failed to send message</p>
                  </div>
                  <p className="text-red-700 text-sm mt-1">
                    Please try again or contact us directly at support@dunapay.com
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-opacity-50'
                      }`}
                      
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-opacity-50'
                      }`}
                      
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.category 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-opacity-50'
                    }`}
                    
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.subject 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-opacity-50'
                    }`}
                    
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                      errors.message 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-opacity-50'
                    }`}
                    
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                
                <div className="flex justify-center">
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className=""
                    >
                        {isSubmitting ? (
                            <span className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Sending...</span>
                            </span>
                        ) : (
                            <span className="flex items-center space-x-2">
                                <Send className="w-4 h-4" />
                                <span>Send Message</span>
                            </span>
                        )}
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;