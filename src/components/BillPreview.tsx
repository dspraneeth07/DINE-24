
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Mail } from "lucide-react";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BillItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface BillPreviewProps {
  reservationData: any;
  selectedItems: any[];
  selectedTable: any;
  totalAmount: number;
  onClose: () => void;
}

const BillPreview = ({ 
  reservationData, 
  selectedItems, 
  selectedTable, 
  totalAmount, 
  onClose 
}: BillPreviewProps) => {
  
  const generatePDF = async () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.width;
      
      // Header
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("DINE 24", pageWidth / 2, 20, { align: "center" });
      
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Royal Dining Experience", pageWidth / 2, 30, { align: "center" });
      pdf.text("Phone: +91 1234567890 | Email: info@dine24.com", pageWidth / 2, 38, { align: "center" });
      
      // Line separator
      pdf.line(20, 45, pageWidth - 20, 45);
      
      // Bill Details
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("RESERVATION BILL", pageWidth / 2, 55, { align: "center" });
      
      let yPos = 70;
      
      // Customer Details
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text("Customer Details:", 20, yPos);
      yPos += 8;
      pdf.text(`Name: ${reservationData.fullName}`, 25, yPos);
      yPos += 6;
      pdf.text(`Email: ${reservationData.email}`, 25, yPos);
      yPos += 6;
      pdf.text(`Phone: ${reservationData.phone}`, 25, yPos);
      yPos += 6;
      pdf.text(`Date: ${reservationData.arrivalDate}`, 25, yPos);
      yPos += 6;
      pdf.text(`Time: ${reservationData.arrivalTime}`, 25, yPos);
      yPos += 6;
      pdf.text(`Table: ${selectedTable?.table_number} (${reservationData.numPeople} people)`, 25, yPos);
      yPos += 15;
      
      // Items Header
      pdf.setFont("helvetica", "bold");
      pdf.text("Item", 20, yPos);
      pdf.text("Qty", 120, yPos);
      pdf.text("Price", 140, yPos);
      pdf.text("Total", 170, yPos);
      
      // Line under header
      pdf.line(20, yPos + 2, pageWidth - 20, yPos + 2);
      yPos += 10;
      
      // Items
      pdf.setFont("helvetica", "normal");
      selectedItems.forEach((item) => {
        pdf.text(item.name.substring(0, 30), 20, yPos);
        pdf.text(item.quantity.toString(), 120, yPos);
        pdf.text(`₹${item.price}`, 140, yPos);
        pdf.text(`₹${item.price * item.quantity}`, 170, yPos);
        yPos += 8;
      });
      
      // Total section
      yPos += 10;
      pdf.line(20, yPos, pageWidth - 20, yPos);
      yPos += 10;
      
      pdf.setFont("helvetica", "bold");
      pdf.text("Total Amount:", 140, yPos);
      pdf.text(`₹${totalAmount}`, 170, yPos);
      
      // Footer
      yPos += 30;
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "italic");
      pdf.text("Thank you for dining with us!", pageWidth / 2, yPos, { align: "center" });
      pdf.text("Visit us again for another royal experience!", pageWidth / 2, yPos + 8, { align: "center" });
      
      // Download PDF
      pdf.save(`Dine24_Bill_${reservationData.fullName.replace(/\s+/g, '_')}.pdf`);
      toast.success("Bill downloaded successfully!");
      
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const sendEmail = async () => {
    try {
      toast.loading("Sending email...");
      
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: reservationData.email,
          subject: "Your Dine 24 Reservation Bill",
          reservationData,
          selectedItems,
          selectedTable,
          totalAmount
        }
      });

      if (error) throw error;
      
      toast.success("Bill sent to your email successfully!");
    } catch (error) {
      console.error("Email sending error:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="bg-royal-gold text-black">
          <CardTitle className="text-center">Bill Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Bill Content */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-royal-gold">DINE 24</h2>
            <p className="text-sm text-muted-foreground">Royal Dining Experience</p>
            <p className="text-xs">Phone: +91 1234567890 | Email: info@dine24.com</p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-royal-gold mb-2">Customer Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {reservationData.fullName}</p>
                <p><span className="font-medium">Email:</span> {reservationData.email}</p>
                <p><span className="font-medium">Phone:</span> {reservationData.phone}</p>
                <p><span className="font-medium">Date:</span> {reservationData.arrivalDate}</p>
                <p><span className="font-medium">Time:</span> {reservationData.arrivalTime}</p>
                <p><span className="font-medium">Table:</span> {selectedTable?.table_number} ({reservationData.numPeople} people)</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold text-royal-gold mb-2">Order Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between font-medium text-sm border-b pb-1">
                  <span>Item</span>
                  <span>Qty</span>
                  <span>Price</span>
                  <span>Total</span>
                </div>
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="flex-1">{item.name}</span>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <span className="w-16 text-center">₹{item.price}</span>
                    <span className="w-16 text-right">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount:</span>
              <span className="text-royal-gold">₹{totalAmount}</span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <Button onClick={generatePDF} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={sendEmail} variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Email Bill
            </Button>
          </div>
          
          <Button onClick={onClose} variant="outline" className="w-full mt-4">
            Close Preview
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillPreview;
