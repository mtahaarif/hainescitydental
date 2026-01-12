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
  return <DoctorsClient doctors={doctors} />;
}
