import Image from 'next/image';
import Link from 'next/link';
import { getAllContent } from '@/lib/content';

interface BioSection {
  title: string;
  content: string;
}

interface Doctor {
  name: string;
  title: string;
  image: string;
  bioSections: BioSection[];
}

export default async function Doctors() {
  const doctors = (await getAllContent('doctors')) as Doctor[];
  
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-full h-80 bg-gradient-to-br from-dental-blue-100 to-cyan-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={400}
                height={400}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
            <p className="text-dental-blue-600 font-semibold mb-3">{doctor.title}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{doctor.bioSections[0]?.content || ''}</p>
            <Link href="/doctors" className="text-dental-blue-600 hover:text-dental-blue-700 font-semibold text-sm inline-flex items-center gap-1 group">
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
