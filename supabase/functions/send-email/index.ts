
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
  html: string;
  pdfAttachment?: {
    filename: string;
    content: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Email function called with method:", req.method);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, pdfAttachment }: EmailRequest = await req.json();

    console.log("Processing email request:", {
      to,
      subject: subject.substring(0, 50) + "...",
      hasPdfAttachment: !!pdfAttachment,
      attachmentSize: pdfAttachment?.content?.length || 0
    });

    // Validate email address
    if (!to || !to.includes('@')) {
      throw new Error('Invalid email address');
    }

    // Validate API key
    if (!Deno.env.get("RESEND_API_KEY")) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const emailOptions: any = {
      from: "DINE24 Restaurant <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    };

    // Add PDF attachment if provided
    if (pdfAttachment && pdfAttachment.content) {
      console.log("Adding PDF attachment:", pdfAttachment.filename);
      emailOptions.attachments = [{
        filename: pdfAttachment.filename,
        content: pdfAttachment.content,
      }];
    }

    console.log("Sending email via Resend...");
    const emailResponse = await resend.emails.send(emailOptions);
    
    console.log("Resend response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      throw new Error(`Email sending failed: ${emailResponse.error.message}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        id: emailResponse.data?.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Detailed error in send-email function:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        details: "Check function logs for more information"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
