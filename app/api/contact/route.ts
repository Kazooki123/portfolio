import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/sendemail';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide name, email, and message' },
        { status: 400 }
      );
    }
    
    // Send email
    const result = await sendContactEmail({ name, email, message });
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error while processing your request' },
      { status: 500 }
    );
  }
}