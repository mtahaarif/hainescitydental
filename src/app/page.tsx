import Hero from '@/components/Hero';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-dental-blue-50/90 border border-dental-blue-100 rounded-3xl p-6 md:p-8 shadow-sm grid md:grid-cols-4 gap-6">
          {/* Main content (Hero + below) */}
          <main className="md:col-span-3">
            <Hero />
          </main>

          {/* Right appointment panel */}
          <aside className="md:col-span-1 flex flex-col items-center text-center gap-4">
            <Image src="/images/call.jpg" alt="Call for Appointment" width={600} height={400} className="w-full h-auto rounded-xl shadow-md" />
            <a href="tel:+18634228338" className="inline-flex items-center justify-center bg-dental-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
              Call For An Appointment
            </a>

            {/* Embedded schedule/contact form (simple front-end form) */}
            <form className="w-full bg-white/80 border border-dental-blue-100 rounded-xl p-4 shadow-sm">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 text-left">Name</label>
                <input type="text" name="name" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-dental-blue-300" />

                <label className="block text-sm font-medium text-gray-700 text-left">Email</label>
                <input type="email" name="email" placeholder="your@email.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-dental-blue-300" />

                <label className="block text-sm font-medium text-gray-700 text-left">Phone</label>
                <input type="tel" name="phone" placeholder="(863) 422-8338" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-dental-blue-300" />

                <label className="block text-sm font-medium text-gray-700 text-left">Message</label>
                <textarea name="message" rows={3} placeholder="Tell us about your dental needs..." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-dental-blue-300 resize-y" />

                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                  Send Message
                </button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
}
