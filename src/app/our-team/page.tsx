import Link from 'next/link';
import Doctors from '@/components/Doctors';
import Staff from '@/components/Staff';

export default function OurTeamPage() {
  return (
    <div className="pb-16">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <p className="text-sm font-semibold text-dental-blue-600 uppercase tracking-wide">Meet Our Team</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2">Compassionate Dental Professionals</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
          Get to know the doctors and staff who make Haines City Dental a welcoming place for every patient.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/doctors" className="btn-primary inline-flex items-center justify-center gap-2">
            Meet the Doctors
          </Link>
          <Link href="/staff" className="btn-secondary inline-flex items-center justify-center gap-2">
            Meet the Staff
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-12">
        <div className="glass-strong p-6 sm:p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Doctors</h2>
          <p className="text-gray-600 mb-6">Experienced clinicians dedicated to delivering exceptional care.</p>
          <Doctors />
        </div>

        <div className="glass-strong p-6 sm:p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Staff</h2>
          <p className="text-gray-600 mb-6">The friendly team that supports your visit from start to finish.</p>
          <Staff />
        </div>
      </div>
    </div>
  );
}
