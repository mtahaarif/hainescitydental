'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileText, Users, Shield, Star, Download, Phone, Gift, Crown, Sparkles } from 'lucide-react';

interface Tab {
  id: string;
  title: string;
  icon: typeof Users;
}

const tabs: Tab[] = [
  { id: 'new-patients', title: 'New Patients', icon: Users },
  { id: 'forms', title: 'New Patient Forms', icon: FileText },
  { id: 'hipaa', title: 'HIPAA Forms', icon: Shield },
  { id: 'specials', title: 'Current Specials', icon: Star },
];

function PatientInfoContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('new-patients');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.find((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
              activeTab === tab.id
                ? 'bg-dental-blue-500 text-white shadow-lg'
                : 'glass hover:bg-dental-blue-50 text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-strong p-8 sm:p-12">
        {activeTab === 'new-patients' && <NewPatientsContent />}
        {activeTab === 'forms' && <FormsContent />}
        {activeTab === 'hipaa' && <HIPAAContent />}
        {activeTab === 'specials' && <SpecialsContent />}
      </div>
    </div>
  );
}

function NewPatientsContent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    referredBy: '',
    aboutUs: '',
    additionalInfo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will contact you shortly to schedule your appointment.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Haines City Dental</h3>
        <p className="text-lg text-gray-700 mb-4">
          We at Haines City Dental accept and welcome{' '}
          <span className="text-dental-blue-500 font-semibold">new patients</span> all the time.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <span className="font-semibold text-dental-blue-500">Ages 12 years old to 112 years.</span>
        </p>
        <p className="text-lg text-gray-700 mb-6">
          We provide{' '}
          <span className="text-dental-blue-500 font-semibold">comprehensive dentistry</span> and we
          always welcome any <span className="text-dental-blue-500 font-semibold">emergencies</span>.
        </p>
      </div>

      {/* Call Us Section */}
      <div className="bg-gradient-to-r from-dental-blue-50 to-cyan-50 p-8 rounded-3xl border border-dental-blue-100 transition-transform hover:scale-[1.01]">
        <h4 className="text-xl font-bold text-gray-900 mb-4">Ready to Become a Patient?</h4>
        <p className="text-gray-700 mb-6">Please call us for an appointment now!</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="tel:+18772883384"
            className="btn-primary inline-flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            1-877-288-3384
          </a>
          <a
            href="tel:+18634228338"
            className="btn-secondary inline-flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            (863) 422-8338
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="glass-light p-8 rounded-3xl">
        <p className="text-gray-700 mb-6">
          Or, you can simply provide us with the following information and we will contact you shortly
          to schedule an appointment. We&apos;re looking forward to meeting you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="(XXX) XXX-XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (8am - 12pm)</option>
                <option value="afternoon">Afternoon (12pm - 5pm)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">How did you hear about us?</label>
            <select
              value={formData.aboutUs}
              onChange={(e) => setFormData({ ...formData, aboutUs: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select an option</option>
              <option value="google">Google Search</option>
              <option value="friend">Friend/Family Referral</option>
              <option value="social">Social Media</option>
              <option value="insurance">Insurance Provider</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
            <textarea
              rows={4}
              placeholder="Tell us about your dental concerns or questions..."
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

function FormsContent() {
  const forms = [
    { name: 'New Patient Registration Form', file: '/forms/new-patient-form.pdf' },
    { name: 'Medical History Form', file: '/forms/medical-history.pdf' },
    { name: 'Dental History Form', file: '/forms/dental-history.pdf' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">New Patient Forms</h3>
        <p className="text-lg text-gray-700 mb-6">
          To save time during your first visit, please download, print, and complete the following forms before your appointment.
        </p>
      </div>

      <div className="space-y-4">
        {forms.map((form, index) => (
          <div
            key={index}
            className="glass-light p-6 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dental-blue-400 to-dental-blue-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium text-gray-900">{form.name}</span>
            </div>
            <a
              href={form.file}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function HIPAAContent() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Privacy Forms</h3>
        <p className="text-lg text-gray-700 mb-6">
          We take your privacy seriously. Please review our HIPAA policies and complete the authorization forms.
        </p>
      </div>

      <div className="space-y-4">
        <div className="glass-light p-6 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-gray-900">HIPAA Privacy Notice</span>
          </div>
          <a
            href="/forms/hipaa-notice.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>

        <div className="glass-light p-6 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="font-medium text-gray-900">HIPAA Authorization Form</span>
          </div>
          <a
            href="/forms/hipaa-authorization.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

function SpecialsContent() {
  const specials = [
    {
      title: 'New Patient Special',
      description: 'Comprehensive exam, full mouth X-rays, and professional cleaning',
      price: '$99',
      originalPrice: '$350',
      icon: Gift,
      gradient: 'from-dental-blue-400 to-cyan-500',
    },
    {
      title: 'Teeth Whitening',
      description: 'Professional in-office whitening treatment',
      price: '$199',
      originalPrice: '$400',
      icon: Sparkles,
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Crown Special',
      description: 'Premium porcelain crown with same-day service available',
      price: '$799',
      originalPrice: '$1200',
      icon: Crown,
      gradient: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Specials</h3>
        <p className="text-lg text-gray-700 mb-6">
          Take advantage of our limited-time offers on popular dental services.
        </p>
      </div>

      <div className="grid gap-6">
        {specials.map((special, index) => (
          <div
            key={index}
            className="glass-light p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${special.gradient} flex items-center justify-center flex-shrink-0`}>
                <special.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{special.title}</h4>
                <p className="text-gray-600 mb-4">{special.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-dental-blue-600">{special.price}</span>
                  <span className="text-lg text-gray-400 line-through">{special.originalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-dental-blue-50 to-cyan-50 p-6 rounded-2xl border border-dental-blue-100">
        <p className="text-gray-700 text-center">
          Call <a href="tel:+18634228338" className="text-dental-blue-600 font-semibold hover:underline">(863) 422-8338</a> to schedule your appointment and mention these specials!
        </p>
      </div>
    </div>
  );
}

export default function PatientInfoPage() {
  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Patient <span className="gradient-text">Information</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about becoming a patient at Haines City Dental
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading content...</div>}>
        <PatientInfoContent />
      </Suspense>
    </div>
  );
}
