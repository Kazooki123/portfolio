/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';

type EmailData = {
  name: string;
  email: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendContactEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    // Validate inputs
    if (!data.name || !data.email || !data.message) {
      return { 
        success: false, 
        message: 'Please provide name, email, and message' 
      };
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #6d28d9;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #6d28d9;">
    <h3 style="margin-top: 0;">Message:</h3>
    <p>${data.message.replace(/\n/g, '<br/>')}</p>
  </div>
</div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    };
  }
}

export async function handleContactFormSubmission(req: any, res: any): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, message } = req.body;
    const result = await sendContactEmail({ name, email, message });
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while processing your request' 
    });
  }
}