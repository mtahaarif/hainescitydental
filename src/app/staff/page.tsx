import { getAllContent } from '@/lib/content';
import StaffClient from './StaffClient';

interface StaffMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  order?: number;
}

export default async function StaffPage() {
  const staffMembers = (await getAllContent('staff')) as StaffMember[];

  return <StaffClient staffMembers={staffMembers} />;
}
