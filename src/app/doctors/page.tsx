import { getAllContent } from '@/lib/content';
import DoctorsClient from './DoctorsClient';

interface DoctorSection {
  title: string;
  content: string;
}

interface Doctor {
  name: string;
  title: string;
  image: string;
  bioSections: DoctorSection[];
  order?: number;
}

export default async function DoctorsPage() {
  const doctors = (await getAllContent('doctors')) as Doctor[];
  // Ensure Dr. Sohail Khan appears first on the doctors page
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

  return <DoctorsClient doctors={orderedDoctors} />;
}
