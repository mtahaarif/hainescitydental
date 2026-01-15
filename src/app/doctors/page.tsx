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
  // TODO: Update to fetch from /api/doctors
  const doctors: Doctor[] = [];
  return <DoctorsClient doctors={doctors} />;
}
