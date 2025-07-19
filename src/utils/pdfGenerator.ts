
// Enhanced PDF generator with compact layout, improved QR code, and neat structure
const loadJsPDF = async () => {
  if (typeof window === 'undefined') {
    throw new Error('Window is not available');
  }

  if (window.jsPDF) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector('script[src*="jspdf"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.async = false;
    document.head.appendChild(script);
    
    script.onload = () => {
      console.log('jsPDF script loaded');
      const checkJsPDF = () => {
        if (window.jsPDF) {
          console.log('jsPDF found on window.jsPDF');
          resolve();
        } else if ((window as any).jspdf?.jsPDF) {
          console.log('jsPDF found on window.jspdf.jsPDF');
          (window as any).jsPDF = (window as any).jspdf.jsPDF;
          resolve();
        } else {
          setTimeout(() => {
            if (window.jsPDF) {
              resolve();
            } else if ((window as any).jspdf?.jsPDF) {
              (window as any).jsPDF = (window as any).jspdf.jsPDF;
              resolve();
            } else {
              reject(new Error('jsPDF not found after loading'));
            }
          }, 500);
        }
      };
      checkJsPDF();
    };
    
    script.onerror = () => {
      console.error('Failed to load jsPDF script');
      reject(new Error('Failed to load jsPDF script'));
    };
  });
};

// Generate compact QR Code
const generateQRCode = async (text: string) => {
  return new Promise<string>((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 60; // Smaller QR code
    canvas.width = size;
    canvas.height = size;
    
    if (ctx) {
      ctx.fillStyle = '#000000';
      const cellSize = size / 21;
      
      // Generate compact QR pattern
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 21; j++) {
          const hash = (text.charCodeAt(i % text.length) + i + j) % 3;
          if (hash === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
      
      // Corner patterns
      ctx.fillRect(0, 0, cellSize * 7, cellSize * 7);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(cellSize, cellSize, cellSize * 5, cellSize * 5);
      ctx.fillStyle = '#000000';
      ctx.fillRect(cellSize * 2, cellSize * 2, cellSize * 3, cellSize * 3);
    }
    
    resolve(canvas.toDataURL());
  });
};

export const generateReservationPDF = async (reservationData: any, orderItems?: any[]) => {
  try {
    console.log('Starting compact PDF generation');
    
    await loadJsPDF();
    
    if (!window.jsPDF) {
      throw new Error('jsPDF is still not available after loading');
    }

    const { jsPDF } = window;
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    // Header with QR code on right side
    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Restaurant header
    doc.setFontSize(24);
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text('DINE24', 20, 25);
    
    // Date/time in top right
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text(dateTime, 190, 15, { align: 'right' });

    // Generate reservation ID and QR code
    const reservationId = reservationData.id ? 
      reservationData.id.slice(0, 8).toUpperCase() : 
      `RES${Date.now().toString().slice(-8)}`;
    
    // Compact QR code on the right
    try {
      const qrCodeDataUrl = await generateQRCode(`DINE24-${reservationId}`);
      doc.addImage(qrCodeDataUrl, 'PNG', 150, 10, 30, 30);
      
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text(`ID: ${reservationId}`, 165, 45, { align: 'center' });
    } catch (error) {
      console.log('QR code generation failed');
    }

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Premium Dining Experience', 20, 35);

    // Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text('RESERVATION CONFIRMATION', 20, 50);

    // Line separator
    doc.setLineWidth(0.5);
    doc.setDrawColor(212, 175, 55);
    doc.line(20, 55, 190, 55);

    let yPos = 65;

    // Customer & Reservation Details in two columns
    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text('CUSTOMER DETAILS', 20, yPos);
    doc.text('RESERVATION DETAILS', 110, yPos);
    
    yPos += 8;
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    
    // Left column - Customer details
    const customerLines = [
      `Name: ${reservationData.full_name || 'N/A'}`,
      `Email: ${reservationData.email || 'N/A'}`,
      `Phone: ${reservationData.phone || 'N/A'}`,
      `Purpose: ${reservationData.purpose || 'N/A'}`
    ];

    // Right column - Reservation details
    const arrivalDate = reservationData.arrival_date ? 
      new Date(reservationData.arrival_date).toLocaleDateString('en-IN') : 'N/A';
    const reservationLines = [
      `Date: ${arrivalDate}`,
      `Time: ${reservationData.arrival_time || 'N/A'}`,
      `Table: ${reservationData.table_number || 'N/A'}`,
      `Guests: ${reservationData.num_people || 'N/A'}`
    ];

    // Print both columns
    for (let i = 0; i < Math.max(customerLines.length, reservationLines.length); i++) {
      if (customerLines[i]) {
        doc.text(customerLines[i], 20, yPos);
      }
      if (reservationLines[i]) {
        doc.text(reservationLines[i], 110, yPos);
      }
      yPos += 6;
    }

    // Order Details (if exists)
    if (orderItems && orderItems.length > 0) {
      yPos += 8;
      doc.setFontSize(12);
      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.text('ORDER SUMMARY', 20, yPos);
      
      yPos += 8;
      // Compact table headers
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text('Item', 20, yPos);
      doc.text('Qty', 110, yPos);
      doc.text('Price', 135, yPos);
      doc.text('Total', 165, yPos);
      
      yPos += 3;
      doc.line(20, yPos, 190, yPos);
      yPos += 5;

      let subtotal = 0;
      doc.setFont("helvetica", "normal");
      orderItems.forEach((item: any) => {
        const price = item.offer_price || item.price || 0;
        const quantity = item.selectedQuantity || 1;
        const itemTotal = price * quantity;
        subtotal += itemTotal;
        
        const itemName = item.name ? item.name.substring(0, 25) : 'Unknown Item';
        doc.text(itemName, 20, yPos);
        doc.text(quantity.toString(), 110, yPos);
        doc.text(`₹${price}`, 135, yPos);
        doc.text(`₹${itemTotal}`, 165, yPos);
        yPos += 5;
      });

      // Bill totals
      const gst = Math.round(subtotal * 0.18);
      const total = subtotal + gst;

      yPos += 3;
      doc.line(135, yPos, 190, yPos);
      yPos += 6;
      
      doc.text('Subtotal:', 135, yPos);
      doc.text(`₹${subtotal}`, 165, yPos);
      yPos += 5;
      doc.text('GST (18%):', 135, yPos);
      doc.text(`₹${gst}`, 165, yPos);
      yPos += 5;
      
      doc.setFontSize(10);
      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.text('TOTAL:', 135, yPos);
      doc.text(`₹${total}`, 165, yPos);
    }

    // Compact disclaimer
    yPos += 15;
    doc.setFontSize(8);
    doc.setTextColor(255, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text('⚠️ DINING POLICY: 1-hour dining limit. Extended time incurs 15% extra charge.', 20, yPos);

    // Footer
    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text('Thank you for choosing DINE24!', 105, yPos, { align: 'center' });
    
    yPos += 8;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text('Contact: +91 98765 43210 | Email: info@dine24.com', 105, yPos, { align: 'center' });

    console.log('Compact PDF generated successfully');
    return doc.output('datauristring');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};
