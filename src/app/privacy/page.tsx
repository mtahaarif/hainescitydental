import { redirect } from 'next/navigation';

export default function PrivacyRedirect() {
  // Redirect to the PDF so the privacy policy is only served as the PDF file.
  redirect('/forms/hipaa-privacy-notice.pdf');
}
