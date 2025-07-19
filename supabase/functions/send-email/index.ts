
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
    content: string; // Base64 content without data URL prefix
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Email function called");
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, pdfAttachment }: EmailRequest = await req.json();

    console.log("Email request data:", { to, subject, hasPdfAttachment: !!pdfAttachment });

    const emailOptions: any = {
      from: "Dine 24 <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    };

    // Add PDF attachment if provided
    if (pdfAttachment) {
      emailOptions.attachments = [{
        filename: pdfAttachment.filename,
        content: pdfAttachment.content,
      }];
    }

    console.log("Sending email with options:", { ...emailOptions, attachments: emailOptions.attachments ? 'Present' : 'None' });

    const emailResponse = await resend.emails.send(emailOptions);
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
