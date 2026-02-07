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
    <div className="w-full">
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`New Patient Appointment Request - ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPreferred Date: ${formData.preferredDate || 'Not specified'}\nPreferred Time: ${formData.preferredTime || 'Not specified'}\nHow they heard about us: ${formData.aboutUs || 'Not specified'}\n\nAdditional Information:\n${formData.additionalInfo || 'None provided'}`
    );
    window.location.href = `mailto:office@hainescitydental.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'appointment',
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.useMailto) {
        // Email service not configured, use mailto fallback
        openMailtoFallback();
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
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
        }, 5000);
      } else if (!response.ok) {
        throw new Error('Failed to send appointment request');
      } else {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
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
        }, 5000);
      }
    } catch (err) {
      setError('Failed to submit request. Please try calling us directly at 1-877-288-3384.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-justify">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Haines City Dental</h3>
        <p className="text-lg text-gray-700 mb-4">
          We at Haines City Dental accept and welcome{' '}
          <span className="text-dental-blue-500 font-semibold">new patients</span> all the time.
        </p>
        <p className="text-lg text-gray-700 mb-4 text-justify">
          <span className="font-semibold text-dental-blue-500">Ages 12 years old to 112 years.</span>
        </p>
        <p className="text-lg text-gray-700 mb-6 text-justify">
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
            className="btn-primary inline-flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4" />
            (863) 422-8338
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="glass-light p-8 rounded-3xl">
        <p className="text-gray-700 mb-6 text-justify">
          Or, you can simply provide us with the following information and we will contact you shortly
          to schedule an appointment. We&apos;re looking forward to meeting you.
        </p>

        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">We will contact you shortly to schedule your appointment.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-200">
                {error}
              </div>
            )}

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
            disabled={isSubmitting}
            className="btn-primary w-full transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
        )}
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
            className="glass-light p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
              className="btn-secondary inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 self-start sm:self-auto whitespace-nowrap"
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
  const forms = [
    { name: 'HIPAA Privacy Notice', file: '/forms/hipaa-notice.pdf', icon: Shield, gradient: 'from-green-400 to-green-600' },
    { name: 'HIPAA Authorization Form', file: '/forms/hipaa-authorization.pdf', icon: FileText, gradient: 'from-green-400 to-green-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Privacy Forms</h3>
        <p className="text-lg text-gray-700 mb-6">
          We take your privacy seriously. Please review our HIPAA policies and complete the authorization forms.
        </p>
      </div>

      <div className="space-y-4">
        {forms.map((form, index) => {
          const Icon = form.icon as any;
          return (
            <div
              key={index}
              className="glass-light p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${form.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-gray-900">{form.name}</span>
              </div>
              <a
                href={form.file}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 self-start sm:self-auto whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Download
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpecialsContent() {
  const specials = [
    {
      title: 'New Patient Special',
      description: 'Comprehensive exam, full mouth X-rays, and one hour of professional cleaning',
      price: '$49-$55',
      originalPrice: '$350',
      icon: Gift,
      gradient: 'from-dental-blue-400 to-cyan-500',
    },
    {
      title: 'In-Office Teeth Whitening',
      description: 'Zoom whitening system with light activation, two 30-minute sessions',
      price: '$99',
      originalPrice: '$500',
      icon: Sparkles,
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Complete Whitening Package',
      description: 'In-office whitening plus take-home custom trays and 2 gel syringes',
      price: '$250',
      originalPrice: '$700',
      icon: Sparkles,
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Crown Special (3+ Crowns)',
      description: 'Porcelain on non-precious metal, per crown when getting 3 or more in one visit',
      price: '$449',
      originalPrice: '$535',
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
    <div className="min-h-screen patient-page">
      <div className="w-full">
        <div className="bg-dental-blue-50/90 border-y border-dental-blue-100 py-8 px-0 shadow-sm">

          <main>
            {/* Header */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-dental-blue-600 mb-4">
                Patient <span className="gradient-text">Information</span>
              </h1>
              <p className="text-xl text-gray-600 text-center">
                Everything you need to know about becoming a patient at Haines City Dental
              </p>
            </div>

            <Suspense fallback={<div className="text-center py-12">Loading content...</div>}>
              <PatientInfoContent />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
