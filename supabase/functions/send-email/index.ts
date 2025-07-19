
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  reservationData: any;
  selectedItems: any[];
  selectedTable: any;
  totalAmount: number;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Email function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      to, 
      subject, 
      reservationData, 
      selectedItems, 
      selectedTable, 
      totalAmount 
    }: EmailRequest = await req.json();

    console.log("Email request data:", { to, subject, totalAmount });

    // Generate HTML bill content
    const itemsHtml = selectedItems.map(item => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 8px; text-align: left;">${item.name}</td>
        <td style="padding: 8px; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; text-align: right;">₹${item.price}</td>
        <td style="padding: 8px; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Dine 24 - Reservation Bill</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; }
          .logo { color: #D4AF37; font-size: 28px; font-weight: bold; margin-bottom: 5px; }
          .tagline { color: #666; font-size: 14px; }
          .section { margin-bottom: 25px; }
          .section-title { color: #D4AF37; font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .customer-details { background: #f9f9f9; padding: 15px; border-radius: 5px; }
          .detail-row { margin-bottom: 8px; }
          .detail-label { font-weight: bold; display: inline-block; width: 80px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #D4AF37; color: white; padding: 12px 8px; text-align: left; }
          td { padding: 8px; }
          .total-row { font-weight: bold; font-size: 18px; background: #f0f0f0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">DINE 24</div>
            <div class="tagline">Royal Dining Experience</div>
            <div style="font-size: 12px; margin-top: 10px;">
              Phone: +91 1234567890 | Email: info@dine24.com
            </div>
          </div>

          <div class="section">
            <div class="section-title">Customer Details</div>
            <div class="customer-details">
              <div class="detail-row">
                <span class="detail-label">Name:</span> ${reservationData.fullName}
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span> ${reservationData.email}
              </div>
              <div class="detail-row">
                <span class="detail-label">Phone:</span> ${reservationData.phone}
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span> ${reservationData.arrivalDate}
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span> ${reservationData.arrivalTime}
              </div>
              <div class="detail-row">
                <span class="detail-label">Table:</span> ${selectedTable?.table_number} (${reservationData.numPeople} people)
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Order Details</div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="total-row">
                  <td colspan="3" style="text-align: right; padding: 15px 8px;">Total Amount:</td>
                  <td style="text-align: right; padding: 15px 8px; color: #D4AF37;">₹${totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p><strong>Thank you for choosing Dine 24!</strong></p>
            <p>We look forward to serving you with our royal dining experience.</p>
            <p style="font-size: 12px; margin-top: 15px;">
              This is an automated email. Please don't reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    console.log("Sending email to:", to);

    const emailResponse = await resend.emails.send({
      from: "Dine 24 <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        emailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
