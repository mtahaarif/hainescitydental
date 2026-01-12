'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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

export default function PatientInfoPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('new-patients');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.find((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div ref={ref} className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Patient <span className="gradient-text">Information</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about becoming a patient at Haines City Dental
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-dental-blue-500 text-white shadow-lg'
                  : 'glass hover:bg-dental-blue-50 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-4 h-4" />
              {tab.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-strong p-8 sm:p-12"
          >
            {activeTab === 'new-patients' && <NewPatientsContent />}
            {activeTab === 'forms' && <FormsContent />}
            {activeTab === 'hipaa' && <HIPAAContent />}
            {activeTab === 'specials' && <SpecialsContent />}
          </motion.div>
        </AnimatePresence>
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
      <motion.div
        className="bg-gradient-to-r from-dental-blue-50 to-cyan-50 p-8 rounded-3xl border border-dental-blue-100"
        whileHover={{ scale: 1.01 }}
      >
        <h4 className="text-xl font-bold text-gray-900 mb-4">Ready to Become a Patient?</h4>
        <p className="text-gray-700 mb-6">Please call us for an appointment now!</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href="tel:+18772883384"
            className="btn-primary inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            1-877-288-3384
          </motion.a>
          <motion.a
            href="tel:+18634228338"
            className="btn-secondary inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            (863) 422-8338
          </motion.a>
        </div>
      </motion.div>

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
                placeholder="(863) 422-8338"
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
                <option value="">---</option>
                <option value="7:00 AM - 9:00 AM">7:00 AM - 9:00 AM</option>
                <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Referred By</label>
            <input
              type="text"
              placeholder="How did you hear about us?"
              value={formData.referredBy}
              onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">About Us</label>
            <select
              value={formData.aboutUs}
              onChange={(e) => setFormData({ ...formData, aboutUs: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">---</option>
              <option value="Google Search">Google Search</option>
              <option value="Family/Friend Referral">Family/Friend Referral</option>
              <option value="Insurance Plan">Insurance Plan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information</label>
            <textarea
              placeholder="Tell us about any dental concerns or special needs..."
              rows={5}
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border-2 border-white/60 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300 resize-none"
            />
          </div>

          <motion.button
            type="submit"
            className="btn-primary w-full font-bold py-4 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SUBMIT
          </motion.button>
        </form>
      </div>
    </div>
  );
}

function FormsContent() {
  const forms = [
    { 
      name: 'New Patient Forms', 
      description: 'Complete patient registration and medical history',
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">New Patient Forms</h3>
        <p className="text-gray-700 mb-6">
          For your convenience, our{' '}
          <span className="text-dental-blue-500 font-semibold">New Patient Forms</span> are available
          for download here in Adobe Acrobat PDF format. The Adobe Acrobat Reader is FREE.
        </p>
      </div>

      <div className="space-y-4">
        {forms.map((form, idx) => (
          <motion.a
            key={form.name}
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ x: 5, scale: 1.02 }}
            className="glass-light p-6 flex items-center justify-between group cursor-pointer block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <form.icon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-semibold text-dental-blue-600 text-lg">{form.name}</p>
                <p className="text-sm text-gray-500">{form.description}</p>
              </div>
            </div>
            <motion.div
              className="p-3 rounded-xl bg-dental-blue-50 text-dental-blue-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-5 h-5" />
            </motion.div>
          </motion.a>
        ))}
      </div>

      <p className="text-gray-600 text-sm">
        Please print and complete these forms at home before your first appointment. If you need
        assistance with downloading or printing these forms, please contact our office at{' '}
        <a href="tel:+18772883384" className="text-dental-blue-600 font-semibold hover:underline">
          1-877-288-3384
        </a>{' '}
        or{' '}
        <a href="tel:+18634228338" className="text-dental-blue-600 font-semibold hover:underline">
          (863) 422-8338
        </a>
        .
      </p>
    </div>
  );
}

function HIPAAContent() {
  const hipaaForms = [
    {
      name: 'Acknowledgement of Receipt of Notice of Privacy Practices',
      description: 'Confirms you have received our privacy notice',
    },
    {
      name: 'Authorization for Disclosure of Protected Health Information',
      description: 'Allows us to share your health information as needed',
    },
    {
      name: 'Notice of Privacy Practices',
      description: 'Explains how your medical information may be used',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Forms</h3>
        <p className="text-gray-700 mb-6">
          For your convenience, our{' '}
          <span className="text-dental-blue-500 font-semibold">HIPAA forms</span> are available for
          download here in Adobe Acrobat PDF format. The Adobe Acrobat Reader is FREE.
        </p>
      </div>

      <div className="space-y-4">
        {hipaaForms.map((form, idx) => (
          <motion.a
            key={form.name}
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ x: 5, scale: 1.02 }}
            className="glass-light p-6 flex items-center justify-between group cursor-pointer block"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-dental-blue-600">{form.name}</p>
                <p className="text-sm text-gray-500">{form.description}</p>
              </div>
            </div>
            <motion.div
              className="p-3 rounded-xl bg-dental-blue-50 text-dental-blue-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Download className="w-5 h-5" />
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function SpecialsContent() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Current Specials & Offers</h3>
        <p className="text-gray-700 mb-6">
          Take advantage of our amazing special offers. Limited time only!
        </p>
      </div>

      {/* New Patient Special */}
      <motion.div
        className="relative overflow-hidden rounded-3xl border-2 border-dental-blue-300/50 p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="absolute top-4 right-4 px-4 py-1 bg-dental-blue-500 text-white text-sm font-bold rounded-full">
          BEST VALUE
        </div>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-dental-blue-500 to-dental-blue-600 flex items-center justify-center shadow-lg">
            <Gift className="w-7 h-7 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-dental-blue-900">New Patient Special</h4>
            <p className="text-dental-blue-700 font-semibold">For New Patients Only</p>
          </div>
        </div>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Get a comprehensive dental exam by the doctor, a complete series of x-rays & regular dental
          cleaning by the hygienist.
        </p>
        <div className="glass-light p-6 rounded-2xl mb-4">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl font-bold gradient-text">$55</span>
            <span className="text-xl text-gray-400 line-through">$350</span>
          </div>
          <p className="text-green-600 font-bold text-lg">You Save: $295</p>
        </div>
        <p className="text-xs text-gray-600 italic">
          *Limited time offer. Valid for new patients only. Additional charges may apply if there is
          significant tartar build up or presence of gum disease.
        </p>
      </motion.div>

      {/* Teeth Whitening Special */}
      <motion.div
        className="relative overflow-hidden rounded-3xl border-2 border-amber-300/50 p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)',
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-amber-900">Teeth Whitening Special</h4>
            <p className="text-amber-700 font-semibold">Professional Results</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* In Office Bleaching */}
          <div className="glass-light p-6 rounded-2xl">
            <h5 className="text-lg font-bold text-gray-900 mb-2">In-Office Bleaching</h5>
            <p className="text-gray-700 mb-4">
              Bleaching with Zoom light. Two sessions of 30 minutes.
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-amber-600">$99</p>
                <p className="text-gray-500 line-through">Was $500</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                Save 80%
              </span>
            </div>
          </div>

          {/* In Office + Take-Home */}
          <div className="glass-light p-6 rounded-2xl border-2 border-amber-300 ring-2 ring-amber-200/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                BEST VALUE
              </span>
              <h5 className="text-lg font-bold text-gray-900">In-Office + Take-Home</h5>
            </div>
            <p className="text-gray-700 mb-4">
              Bleaching with Zoom light. Two sessions of 30 minutes in office. Plus take-home
              bleaching trays with gel syringes.
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-amber-600">$250</p>
                <p className="text-gray-500 line-through">Was $700</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                Save 64%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Crowns Special */}
      <motion.div
        className="relative overflow-hidden rounded-3xl border-2 border-purple-300/50 p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <div>
            <h4 className="text-2xl font-bold text-purple-900">Dental Crowns</h4>
            <p className="text-purple-700 font-semibold">Porcelain on Semi-Precious Metal</p>
          </div>
        </div>
        <p className="text-gray-700 mb-6">Three or more crowns per visit</p>
        <div className="glass-light p-6 rounded-2xl mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold text-purple-600">$449</span>
            <span className="text-lg text-gray-600">each crown</span>
          </div>
          <p className="text-gray-500 line-through">Regular Price: $535 each</p>
          <p className="text-green-600 font-bold mt-2">You Save: $86 per crown</p>
        </div>
        <p className="text-xs text-gray-600 italic">
          *Plus build-up if needed. Minimum order of 3 crowns required for special pricing.
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="glass-light border-l-4 border-dental-blue-600 p-6 rounded-lg"
        whileHover={{ scale: 1.01 }}
      >
        <p className="text-gray-700 font-semibold mb-2">
          💬 Ready to take advantage of these specials?
        </p>
        <p className="text-gray-600">
          Call us at{' '}
          <a
            href="tel:+18772883384"
            className="font-bold text-dental-blue-600 hover:text-dental-blue-700"
          >
            1-877-288-3384
          </a>{' '}
          or{' '}
          <a
            href="tel:+18634228338"
            className="font-bold text-dental-blue-600 hover:text-dental-blue-700"
          >
            (863) 422-8338
          </a>{' '}
          to schedule your appointment today!
        </p>
      </motion.div>
    </div>
  );
}
