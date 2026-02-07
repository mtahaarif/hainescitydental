import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...formData } = body;

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP not configured, returning mailto fallback');
      return NextResponse.json(
        { 
          message: 'Email service not configured',
          useMailto: true,
          formData: { type, ...formData }
        },
        { status: 200 }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let subject = '';
    let htmlContent = '';

    if (type === 'contact') {
      // Contact form
      subject = `New Contact Form Submission from ${formData.name}`;
      htmlContent = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `;
    } else if (type === 'appointment') {
      // Patient appointment request
      subject = `New Appointment Request from ${formData.firstName} ${formData.lastName}`;
      htmlContent = `
        <h2>New Appointment Request</h2>
        <p><strong>First Name:</strong> ${formData.firstName}</p>
        <p><strong>Last Name:</strong> ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Preferred Date:</strong> ${formData.preferredDate || 'Not specified'}</p>
        <p><strong>Preferred Time:</strong> ${formData.preferredTime || 'Not specified'}</p>
        <p><strong>How they heard about us:</strong> ${formData.aboutUs || 'Not specified'}</p>
        <p><strong>Additional Information:</strong></p>
        <p>${formData.additionalInfo || 'None provided'}</p>
      `;
    }

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || 'office@hainescitydental.com',
      subject,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        message: 'Failed to send email',
        error: String(error),
        useMailto: true
      },
      { status: 200 } // Return 200 to allow mailto fallback
    );
  }
}
