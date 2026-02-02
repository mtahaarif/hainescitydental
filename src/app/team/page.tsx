"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Member = {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  department?: string;
  image?: string;
};

export default function TeamPage() {
  const [team, setTeam] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        if (!mounted) return;
        setTeam(data.team || []);
      })
      .catch(err => {
        console.error(err);
        if (mounted) setError('Failed to load team');
      });
    return () => { mounted = false };
  }, []);

  const doctors = team.filter(t => String(t.department || '').toLowerCase() === 'doctors');
  const hygienists = team.filter(t => String(t.department || '').toLowerCase() === 'hygienist');
  const staff = team.filter(t => {
    const d = String(t.department || '').toLowerCase();
    return d === 'staff' || d === 'assistant';
  });

  return (
    <div className="min-h-screen">
      <div className="w-full px-0 py-8">
        {error && <div className="text-red-600 mb-6">{error}</div>}

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Doctors</h2>
          <div className="space-y-8">
            {doctors.map(d => (
              <div key={d.id} className="flex gap-6 items-center bg-white p-6 rounded-2xl shadow">
                {d.image ? (
                  <div className="w-48 h-48 relative rounded-xl overflow-hidden">
                    <Image src={d.image} alt={d.name} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded-xl bg-gray-200" />
                )}

                <div>
                  <h3 className="text-2xl font-bold">{d.name}</h3>
                  {d.role && <p className="text-dental-blue-600 mt-1 whitespace-pre-line">{d.role}</p>}
                  {d.bio && <p className="mt-4 text-gray-700 whitespace-pre-line">{d.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Hygienists</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hygienists.map(h => (
              <div key={h.id} className="bg-white p-4 rounded-xl shadow">
                {h.image && (
                  <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
                    <Image src={h.image} alt={h.name} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{h.name}</h3>
                {h.role && <p className="text-sm text-dental-blue-600">{h.role}</p>}
                {h.bio && <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{h.bio}</p>}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {staff.map(s => (
              <div key={s.id} className="bg-white p-4 rounded-xl shadow">
                {s.image && (
                  <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden">
                    <Image src={s.image} alt={s.name} fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{s.name}</h3>
                {s.role && <p className="text-sm text-dental-blue-600">{s.role}</p>}
                {s.bio && <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">{s.bio}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
