import React from 'react';

export const metadata = {
  title: 'Admin - Haines City Dental',
  description: 'Content Management System',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
