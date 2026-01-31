import Image from 'next/image';
import { getAllContent } from '@/lib/content';

const ORDER = [
  'Sohail Khan',
  'Asma Mamsa',
  'Danyelle',
  'Decole',
  'Maribel',
  'Stephanie',
  'Yahira',
  'Tonya',
  'Dianilda',
  'Anabell',
  'Kyndall',
];

function findByName(list: any[], name: string) {
  const exact = list.find((p) => p.name && p.name.toLowerCase().trim() === name.toLowerCase().trim());
  if (exact) return exact;
  const includes = list.find((p) => p.name && p.name.toLowerCase().includes(name.toLowerCase()));
  return includes || null;
}

async function PeopleList() {
  const doctors = (await getAllContent('doctors')) as any[] || [];
  const staff = (await getAllContent('staff')) as any[] || [];
  const pool = [...doctors, ...staff];

  const TITLES: Record<string, string> = {
    'Sohail Khan': 'Sohail Khan, DMD\nDentist',
    'Asma Mamsa': 'Asma Mamsa, DDS\nDentist',
    'Danyelle': 'Danyelle\nOffice Manager',
    'Decole': 'Decole\nPatient Relations',
    'Maribel': 'Maribel\nHygienist',
    'Stephanie': 'Stephanie\nHygienist',
    'Yahira': 'Yahira\nDental Assistant',
    'Tonya': 'Tonya\nPatient Relations',
    'Dianilda': 'Dianilda\nDental Assistant',
    'Anabell': 'Anabell\nDental Assistant',
    'Kyndall': 'Kyndall\nDental Assistant',
  };

  const DESCRIPTIONS: Record<string, string> = {
    'Sohail Khan': `Dr. Sohail Khan earned his Doctor of Dental Medicine degree from Boston University, Henry M. Goldman School of Dental Medicine. He completed an AEGD residency and additional implant training, and is a member of the American Academy of General Dentistry. He enjoys aesthetics, oral surgery, traveling, sports, and photography.`,
    'Asma Mamsa': `Dr. Asma Mamsa is a 2002 graduate of the University of Illinois Chicago College of Dentistry. She enjoys traveling, cooking, and spending time with family.`,
    'Danyelle': `Danyelle has worked in dentistry for over 24 years. She attained Expanded Functions and Radiology certifications at the University of Florida and has been with Haines City Dental for 24 years.`,
    'Decole': `Decole has been with Haines City Dental since 2011. She enjoys that the office feels like family and loves spending time with family and friends.`,
    'Maribel': `Maribel has been in dental care for over 36 years and a hygienist for 21 years. She trained at Miami Dade Medical and enjoys crafting, gardening, and family time.`,
    'Stephanie': `Stephanie worked in Endodontics before pursuing dental hygiene at Concorde Career Institute in Orlando. She enjoys helping patients feel confident about their smiles and spending time with family.`,
    'Yahira': `Yahira has over 15 years’ experience, is certified in expanded functions and radiology in Florida, and enjoys family time.`,
    'Tonya': `Tonya has been a dental assistant for over 18 years and transitioned to patient relations in 2020. She enjoys serving her community and spending time with her family.`,
    'Dianilda': `Dianilda has over 20 years experience and joined Haines City Dental in 2013. She holds certifications in expanded functions and radiology.`,
    'Anabell': `Anabell began her career in New York City and has been with Haines City Dental since 2014. She enjoys spending quality time with family and friends.`,
    'Kyndall': `Kyndall enjoys helping patients with their dental needs; outside of work she spends time with her son and family.`,
  };
  const people = ORDER.map((name) => {
    const p = findByName(pool, name);
    // normalize fields (use overrides when provided)
    const foundName = p?.name || name;
    const imageField = p ? (p.image || p.photo || p.avatar || '') : '';
    const image = imageField || (name === 'Kyndall' ? '/images/kyndall.jpg' : '');
    const title = TITLES[name] || p?.title || p?.role || '';
    const bio = DESCRIPTIONS[name] || p?.bio || (p?.bioSections && p.bioSections.map((s:any)=>s.content).join('\n\n')) || p?.description || '';
    return { name: foundName, title, image, bio };
  }) as { name: string; title: string; image: string; bio: string }[];

  return (
    <div className="space-y-8">
      {people.map((p, idx) => (
        <div key={idx} className="py-6 border-b last:border-b-0">
          <div className="flex flex-col items-start text-left gap-4">
            {p.image ? (
              <div className="w-48 h-48 rounded-xl overflow-hidden">
                <Image src={p.image} alt={p.name} width={320} height={320} className="object-cover w-full h-full" />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-xl bg-dental-blue-100 flex items-center justify-center text-white font-bold text-2xl">{p.name.split(' ')[0]?.charAt(0) || 'P'}</div>
            )}

            <div>
              <h3 className="text-2xl font-bold text-gray-900">{p.name}</h3>
              {p.title && <p className="text-dental-blue-600 font-medium mt-1 whitespace-pre-line">{p.title}</p>}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed max-w-3xl whitespace-pre-line">{p.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function OurTeamPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 bg-dental-blue-50/90 border border-dental-blue-100 sm:rounded-3xl rounded-none p-6 md:p-8 shadow-sm">

          <main>
            <section className="text-center mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Our Team</h1>
            </section>

            <section>
              <PeopleList />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
