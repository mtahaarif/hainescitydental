import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Testimonials from '@/components/Testimonials';

export default function TestimonialsPage() {
  const dataPath = path.join(process.cwd(), 'src', 'data', 'google_review.json');
  let review: any = null;

  try {
    if (fs.existsSync(dataPath)) {
      const raw = fs.readFileSync(dataPath, 'utf8');
      review = JSON.parse(raw);
    }
  } catch (e) {
    review = null;
  }

  return (
    <div className="min-h-screen text-justify">
      <div className="w-full">
        {review ? (
          <div className="bg-white border-y shadow py-8 px-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {review.avatar ? (
                  // If avatar is a local path placed under public, show it
                  <img src={review.avatar.startsWith('/') ? review.avatar : review.avatar} alt={review.author || 'Reviewer'} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-gray-600">{(review.author || 'P').charAt(0)}</span>
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">{review.author || 'Anonymous'}</h1>
                <p className="text-sm text-dental-blue-600">Google Review • {review.relative_time_description || review.date || ''}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed text-justify">{review.text}</p>
            </div>

            {review.url && (
              <div className="text-right">
                <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-dental-blue-600 font-semibold hover:underline">View on Google</a>
              </div>
            )}
          </div>
        ) : (
          // Fallback to the existing carousel component if no extracted JSON is present
          <Testimonials />
        )}
      </div>
    </div>
  );
}
