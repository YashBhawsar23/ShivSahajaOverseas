import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

interface EnquiryPayload {
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  commodity: string;
  volume: string;
  incoterm: string;
  dischargePort?: string;
  message: string;
  website_honeypot?: string; // Anti-spam field
}

export const POST: APIRoute = async ({ request }) => {
  try {
    let payload: EnquiryPayload;

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      payload = {
        fullName: String(formData.get('fullName') || ''),
        companyName: String(formData.get('companyName') || ''),
        country: String(formData.get('country') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        commodity: String(formData.get('commodity') || ''),
        volume: String(formData.get('volume') || ''),
        incoterm: String(formData.get('incoterm') || 'FOB'),
        dischargePort: String(formData.get('dischargePort') || ''),
        message: String(formData.get('message') || ''),
        website_honeypot: String(formData.get('website_honeypot') || ''),
      };
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported Content-Type' }), {
        status: 415,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Honeypot Anti-Spam Check
    if (payload.website_honeypot && payload.website_honeypot.trim().length > 0) {
      // Bot filled hidden field, return silent success
      return new Response(JSON.stringify({ success: true, message: 'Inquiry processed.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Validate Required Fields
    const { fullName, companyName, country, email, phone, commodity, message } = payload;
    if (!fullName || !companyName || !country || !email || !commodity) {
      return new Response(
        JSON.stringify({
          error: 'Please fill in all required fields (Name, Company, Country, Email, and Commodity).',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid corporate email address.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Format Resend Email Content
    const env = (import.meta as any).env || {};
    const resendApiKey = env.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : '');
    const resendFromEmail = env.RESEND_FROM_EMAIL || (typeof process !== 'undefined' ? process.env?.RESEND_FROM_EMAIL : '') || 'onboarding@resend.dev';
    const recipientEmail = env.ENQUIRY_RECIPIENT_EMAIL || (typeof process !== 'undefined' ? process.env?.ENQUIRY_RECIPIENT_EMAIL : '') || 'enquiry@shivsahajaoverseas.com';

    const emailSubject = `[B2B Trade Inquiry] ${commodity} - ${companyName} (${country})`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8f7f3; color: #102c50; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e8e5dc; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #102c50; color: #ffffff; padding: 24px; text-align: center; }
          .badge { display: inline-block; background: #b69a63; color: #102c50; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-bottom: 8px; }
          .title { font-size: 20px; font-weight: bold; margin: 0; color: #ffffff; }
          .content { padding: 24px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
          .table td { padding: 10px 12px; border-bottom: 1px solid #f0efea; }
          .table td.label { font-weight: bold; color: #64748b; width: 35%; }
          .table td.val { color: #102c50; font-weight: 500; }
          .message-box { background: #f8f7f3; border-left: 4px solid #b69a63; padding: 16px; margin-top: 20px; border-radius: 4px; font-size: 14px; line-height: 1.6; }
          .footer { background: #f8f7f3; color: #94a3b8; font-size: 12px; text-align: center; padding: 16px; border-top: 1px solid #e8e5dc; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">Shivsahaja Overseas Trade Desk</div>
            <h1 class="title">New Commercial Trade Inquiry</h1>
          </div>
          <div class="content">
            <p style="margin: 0 0 16px 0; font-size: 15px;">A new B2B trade inquiry has been submitted through the corporate website:</p>
            
            <table class="table">
              <tr>
                <td class="label">Target Commodity</td>
                <td class="val"><strong>${commodity}</strong></td>
              </tr>
              <tr>
                <td class="label">Volume / Quantity</td>
                <td class="val">${payload.volume || 'Not specified'}</td>
              </tr>
              <tr>
                <td class="label">Preferred Incoterm</td>
                <td class="val"><strong>${payload.incoterm || 'FOB'}</strong></td>
              </tr>
              <tr>
                <td class="label">Destination Discharge Port</td>
                <td class="val">${payload.dischargePort || 'To be advised'}</td>
              </tr>
              <tr>
                <td class="label">Buyer Company</td>
                <td class="val">${companyName}</td>
              </tr>
              <tr>
                <td class="label">Contact Person</td>
                <td class="val">${fullName}</td>
              </tr>
              <tr>
                <td class="label">Country / Location</td>
                <td class="val">${country}</td>
              </tr>
              <tr>
                <td class="label">Corporate Email</td>
                <td class="val"><a href="mailto:${email}" style="color: #102c50; font-weight: bold;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Phone / WhatsApp</td>
                <td class="val">${phone || 'Not provided'}</td>
              </tr>
            </table>

            <div class="message-box">
              <strong style="display: block; margin-bottom: 6px; color: #102c50;">Buyer Message & Specifications:</strong>
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <div class="footer">
            Shivsahaja Overseas &bull; Global Trade &bull; Trusted Partner &bull; Borderless Growth
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Send with Resend if API Key is configured, or mock in development
    if (resendApiKey && resendApiKey !== 're_your_api_key_here' && resendApiKey.startsWith('re_')) {
      const resend = new Resend(resendApiKey);
      const emailResult = await resend.emails.send({
        from: `Shivsahaja Trade Desk <${resendFromEmail}>`,
        to: [recipientEmail],
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });

      if (emailResult.error) {
        console.error('[Resend Error]', emailResult.error);
        return new Response(
          JSON.stringify({
            error: 'Failed to deliver email through mail service. Please contact us directly at enquiry@shivsahajaoverseas.com.',
            details: emailResult.error.message,
          }),
          {
            status: 502,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      // Development mock mode: log the payload to console
      console.log('----------------------------------------------------');
      console.log('📌 [DEV MOCK] RESEND_API_KEY not configured or placeholder.');
      console.log(`📩 Simulated Trade Inquiry to: ${recipientEmail}`);
      console.log(`👤 From: ${fullName} (${companyName}, ${country})`);
      console.log(`📦 Commodity: ${commodity} | Volume: ${payload.volume} | Incoterm: ${payload.incoterm}`);
      console.log(`💬 Message: ${message}`);
      console.log('----------------------------------------------------');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your inquiry. Our international trade desk has received your request and will contact you with a formal Proforma Invoice and rate quotation within 24 business hours.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('[API Enquiry Error]', err);
    return new Response(
      JSON.stringify({
        error: 'An unexpected server error occurred while processing your trade inquiry.',
        details: err?.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
