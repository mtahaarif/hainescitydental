'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, GraduationCap, Award, Heart, Users } from 'lucide-react';

interface DoctorSection {
  title: string;
  content: string;
}

interface Doctor {
  name: string;
  title: string;
  image: string;
  bioSections: DoctorSection[];
}


export default function DoctorsClient() {
  return null;
}
