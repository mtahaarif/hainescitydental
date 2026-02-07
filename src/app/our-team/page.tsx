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

export default function OurTeamPage() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    
    const fetchTeam = async (attempt = 1) => {
      try {
        const res = await fetch('/api/team');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        if (!mounted) return;
        setTeam(Array.isArray(data.team) ? data.team : []);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error(`[Team] Fetch attempt ${attempt} failed:`, err);
        
        if (!mounted) return;
        
        // Retry up to 3 times with exponential backoff
        if (attempt < 3) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`[Team] Retrying in ${delay}ms...`);
          setRetryCount(attempt);
          setTimeout(() => fetchTeam(attempt + 1), delay);
        } else {
          console.log('[Team] All retries exhausted, reloading page in 2s...');
          setError('Unable to load team. Reloading page...');
          setTimeout(() => window.location.reload(), 2000);
        }
      }
    };
    
    fetchTeam();
    
    return () => {
      mounted = false;
    };
  }, []);

  const doctors = team.filter((t) => String(t.department || '').toLowerCase().includes('doctor'));
  const staff = team.filter((t) => {
    const d = String(t.department || '').toLowerCase();
    return !d.includes('doctor');
  });

  return (
    <div className="min-h-screen text-justify">
      <div className="w-full">
        <div className="bg-dental-blue-50/90 border-y border-dental-blue-100 py-8 px-0 shadow-sm">
          <main>
            <section className="text-center mb-6">
              <h1 className="text-2xl font-bold text-dental-blue-600 text-center">Our Team</h1>
            </section>

            {error && <div className="text-red-600 mb-6 text-center">{error}</div>}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center gap-3 text-dental-blue-700">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-dental-blue-600 border-t-transparent" />
                  <span className="text-sm font-medium">
                    {retryCount > 0 ? `Retrying connection (${retryCount}/2)...` : 'Loading team...'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-bold mb-6 text-black text-center">Meet Our Doctors</h2>
                  <div className="flex flex-col gap-6">
                    {doctors.map((d) => (
                      <div key={d.id} className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
                        {d.image && (
                          <div className="w-48 h-64 relative mb-4 rounded-lg overflow-hidden">
                            <Image src={d.image} alt={d.name} fill sizes="192px" className="object-cover" />
                          </div>
                        )}
                        <h3 className="text-xl font-bold">{d.name}</h3>
                        {d.role && <p className="text-base text-dental-blue-600 mt-2">{d.role}</p>}
                        {d.bio && <p className="mt-3 text-base text-gray-700 whitespace-pre-line text-justify">{d.bio}</p>}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-6 text-dental-blue-600 text-center">Staff</h2>
                  <div className="flex flex-col gap-6">
                    {staff.map((s) => (
                      <div key={s.id} className="bg-white p-6 rounded-xl shadow flex flex-col items-center text-center">
                        {s.image && (
                          <div className="w-48 h-64 relative mb-4 rounded-lg overflow-hidden">
                            <Image src={s.image} alt={s.name} fill sizes="192px" className="object-cover" />
                          </div>
                        )}
                        <h3 className="text-xl font-bold">{s.name}</h3>
                        {s.role && <p className="text-base text-dental-blue-600 mt-2">{s.role}</p>}
                        {s.bio && <p className="mt-3 text-base text-gray-700 whitespace-pre-line text-justify">{s.bio}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
