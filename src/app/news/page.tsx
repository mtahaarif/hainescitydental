import Image from 'next/image';
import { Calendar, Newspaper, Globe, Award } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date?: string;
  images: string[];
  category: 'training' | 'community' | 'conference' | 'mission';
}

const newsItems: NewsItem[] = [
  {
    id: 'implant-marathon',
    title: 'Dr. Khan in Santo Domingo taking Implant Marathon course with a team of doctors',
    description: 'Hands-on implant marathon training alongside a multidisciplinary team in Santo Domingo.',
    date: 'July 2014',
    images: ['DSC04404', 'DSC04448'],
    category: 'training',
  },
  {
    id: 'implant-surgery-dominican',
    title: 'Dr. Khan performing implant surgery on a patient from Dominican Republic',
    description: 'Live surgical placement and restoration for a Dominican Republic patient.',
    images: ['DSC04408', 'DSC04406'],
    category: 'training',
  },
  {
    id: 'diploma-interamericana',
    title: 'Dr. Khan receiving a diploma from La Universidad Interamericana',
    description: 'Recognition following intensive implant surgery participation in Santo Domingo.',
    images: ['DSC04405', 'DSC04514'],
    category: 'training',
  },
  {
    id: 'fndc-2014',
    title: 'Haines City Team at Florida National Dental Conference 2014',
    description: 'Team engagement and continuing education at FNDC 2014.',
    date: '2014',
    images: ['FNDC2014A'],
    category: 'conference',
  },
  {
    id: 'fla-mom-2014',
    title: 'Dr. Park volunteering at Florida Mission of Mercy (Tampa Fairgrounds)',
    description: 'FLA-MOM served more than 1600 people and delivered over $1 million in free care.',
    date: 'March 28, 2014',
    images: ['FLAMOM02', 'FLAMOM03', 'FLAMOM04', 'FLAMOM05'],
    category: 'mission',
  },
  {
    id: 'national-guard-2013',
    title: 'Dr. Khan serving at Florida National Guard in Lakeland, Florida',
    description: 'Supporting care for service members; committed to serving our war heroes.',
    date: 'October 2013',
    images: ['IMAG0381', 'IMAG0379', 'IMAG0375'],
    category: 'community',
  },
  {
    id: 'special-olympics-boston',
    title: 'Dr. Khan volunteering with Special Olympics in Boston',
    description: 'Community dental support for Special Olympics participants.',
    images: ['chp-community1'],
    category: 'community',
  },
  {
    id: 'peru-visit',
    title: 'Dr. Park on her visit to Peru',
    description: 'Dental outreach and cultural immersion during a visit to Peru.',
    images: ['Peru03', 'Peru01'],
    category: 'mission',
  },
];

const categoryConfig = {
  training: { icon: Award, color: 'from-blue-500 to-cyan-500', label: 'Training' },
  community: { icon: Globe, color: 'from-green-500 to-emerald-500', label: 'Community' },
  conference: { icon: Newspaper, color: 'from-purple-500 to-violet-500', label: 'Conference' },
  mission: { icon: Globe, color: 'from-orange-500 to-amber-500', label: 'Mission' },
};

export default function NewsPage() {
  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          News & <span className="gradient-text">Community</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Highlights from our doctors, team, and community service events.
        </p>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {newsItems.map((item, index) => {
          const CategoryIcon = categoryConfig[item.category].icon;
          return (
            <article
              key={item.id}
              className="glass-light p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${categoryConfig[item.category].color} text-white transition-transform hover:scale-110`}
                  >
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-dental-blue-600">
                      {categoryConfig[item.category].label}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{item.title}</h2>
                  </div>
                </div>
                {item.date && (
                  <div className="flex items-center gap-2 text-sm text-dental-blue-700">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {item.description}
              </p>

              {item.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {item.images.map((img) => (
                    <div
                      key={img}
                      className="relative aspect-square rounded-2xl overflow-hidden glass transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:scale-105"
                    >
                      <Image
                        src={`/${img}.${img.includes('FLAMOM') || img.includes('FNDC') ? 'png' : 'jpg'}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
