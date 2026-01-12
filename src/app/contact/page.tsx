'use client';

import { useState } from 'react';
import { Phone, MapPin, Clock, Mail, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'HAINES CITY DENTAL',
      content: ['35914 Highway 27 South, Suite 2B', 'Haines City, Florida 33844'],
    },
    {
      icon: Phone,
      title: 'Telephone',
      content: ['1-877-288-3384', '863-422-8338'],
      isLink: true,
    },
    {
      icon: Clock,
      title: 'Hours of Operation',
      content: ['Monday – Thursday: 7:00 AM – 3:00 PM'],
    },
    {
      icon: Mail,
      title: 'Email',
      content: ['office@hainescitydental.com'],
      isEmail: true,
    },
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Contact <span className="gradient-text">Haines City Dental</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We are here to help with appointments, questions, and directions to our office.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="glass-light p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-dental-blue-50 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-dental-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.content.map((line, idx) => (
                    <p key={idx} className="text-gray-700">
                      {info.isLink ? (
                        <a
                          href={`tel:${line.replace(/-/g, '')}`}
                          className="text-dental-blue-600 hover:text-dental-blue-700 font-semibold transition-colors"
                        >
                          {line}
                        </a>
                      ) : info.isEmail ? (
                        <a
                          href={`mailto:${line}`}
                          className="text-dental-blue-600 hover:text-dental-blue-700 font-semibold transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="glass-light p-8 space-y-6 transition-all duration-300 hover:shadow-lg"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">We will get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(863) 422-8338"
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your dental needs..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-dental-blue-500 focus:border-transparent resize-none transition-all duration-300"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Send Message
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 glass-light rounded-3xl overflow-hidden border border-white/60 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <iframe
            title="Haines City Dental Location"
            src="https://www.google.com/maps?q=35914+US-27+South+Suite+2B+Haines+City+FL+33844&output=embed"
            className="w-full h-[420px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
