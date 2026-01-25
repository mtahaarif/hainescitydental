import { getAllContent } from '@/lib/content';
import TeamCarousel from '@/components/TeamCarousel';

interface Doctor {
  name: string;
  title: string;
  image: string;
  bioSections: Array<{ title: string; content: string }>;
}

interface Staff {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default async function TeamCarouselServer() {
  const doctors = (await getAllContent('doctors')) as Doctor[];
  const staff = (await getAllContent('staff')) as Staff[];

  // Combine doctors and staff into a single array for the carousel
  // Move Dr. Sohail Khan to the front if present
  const orderedDoctors = (() => {
    const idx = doctors.findIndex((d) => d.name?.toLowerCase().includes('sohail'));
    if (idx > 0) {
      const copy = [...doctors];
      const [item] = copy.splice(idx, 1);
      copy.unshift(item);
      return copy;
    }
    return doctors;
  })();

  const allTeamMembers = [
    ...orderedDoctors.map((doc) => ({
      name: doc.name,
      role: doc.title,
      title: doc.title,
      bio: doc.bioSections[0]?.content || '',
      image: doc.image,
    })),
    ...staff.map((member) => ({
      name: member.name,
      role: member.role,
      title: member.role,
      bio: member.bio,
      image: member.image,
    })),
  ];

  return <TeamCarousel members={allTeamMembers} />;
}
