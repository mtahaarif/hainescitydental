import { getAllContent } from '@/lib/content';
import Image from 'next/image';

interface StaffMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default async function Staff() {
  const staffMembers = (await getAllContent('staff')) as StaffMember[];
  
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((member, index) => (
          <div
            key={index}
            className="glass-light rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-full h-64 bg-gradient-to-br from-dental-blue-100 to-cyan-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-dental-blue-600 font-semibold mb-3">{member.role}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
