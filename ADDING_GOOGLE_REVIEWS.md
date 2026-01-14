# Adding Real Google Reviews to Website

## Current Status
✅ The homepage testimonials section has been updated with placeholder Google reviews.
✅ Each review includes: name, content, rating, date, and source (Google).

## How to Add Real Google Reviews

### Manual Method (Immediate)
1. Visit your Google Business Profile reviews: https://business.google.com/
2. Find 5-star reviews
3. Copy the review text, reviewer name, and date
4. Open `src/components/Testimonials.tsx`
5. Update the `testimonials` array with real reviews:

```typescript
{
  id: 1,
  name: 'John Smith',  // Use first name + last initial for privacy
  role: 'Google Review',
  content: 'Paste the actual review text here...',
  rating: 5,
  date: '2 weeks ago',  // Copy from Google
  source: 'Google',
}
```

### Automatic Method (Using Google Places API)

To automatically fetch and display Google reviews:

1. **Get Google Places API Key:**
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Enable "Places API"
   - Create credentials (API Key)
   - Restrict API key to your domain

2. **Add Environment Variable:**
   Create `.env.local` file:
   ```
   GOOGLE_PLACES_API_KEY=your_api_key_here
   GOOGLE_PLACE_ID=ChIJ_your_place_id_here
   ```

3. **Find Your Place ID:**
   - Visit: https://developers.google.com/maps/documentation/places/web-service/place-id
   - Search for "Haines City Dental, 205 E Hinson Ave"
   - Copy the Place ID

4. **Create API Route:**
   Create `src/app/api/google-reviews/route.ts`:
   ```typescript
   import { NextResponse } from 'next/server';

   export async function GET() {
     const apiKey = process.env.GOOGLE_PLACES_API_KEY;
     const placeId = process.env.GOOGLE_PLACE_ID;
     
     const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`;
     
     const response = await fetch(url);
     const data = await response.json();
     
     // Filter only 5-star reviews
     const fiveStarReviews = data.result.reviews
       .filter((review: any) => review.rating === 5)
       .map((review: any, index: number) => ({
         id: index + 1,
         name: review.author_name,
         role: 'Google Review',
         content: review.text,
         rating: review.rating,
         date: review.relative_time_description,
         source: 'Google',
       }));
     
     return NextResponse.json(fiveStarReviews);
   }
   ```

5. **Update Testimonials Component:**
   Replace static array with API fetch:
   ```typescript
   const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
   
   useEffect(() => {
     fetch('/api/google-reviews')
       .then(res => res.json())
       .then(data => setTestimonials(data));
   }, []);
   ```

## Notes
- Google Places API has usage limits (free tier: 1000 requests/month)
- Consider caching reviews to reduce API calls
- Update reviews weekly or monthly to keep content fresh
- Always verify reviews meet Google's terms of service for displaying reviews

## Privacy Considerations
- Use only first name + last initial (e.g., "Sarah M.")
- Don't include full names unless explicitly permitted
- Never edit or modify review content
- Always attribute reviews to Google
