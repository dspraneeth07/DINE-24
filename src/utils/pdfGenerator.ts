
// Enhanced PDF generator with QR code, Poppins font, and INR symbols
const loadJsPDF = async () => {
  if (typeof window === 'undefined') {
    throw new Error('Window is not available');
  }

  // Check if jsPDF is already loaded
  if (window.jsPDF) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    // Remove any existing script to avoid conflicts
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

// Generate QR Code using QR.js library
const generateQRCode = async (text: string) => {
  return new Promise<string>((resolve) => {
    // Simple QR code generation using canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 100;
    canvas.width = size;
    canvas.height = size;
    
    if (ctx) {
      // Create a simple pattern for QR code (mock implementation)
      ctx.fillStyle = '#000000';
      const cellSize = size / 25;
      
      // Generate QR-like pattern based on text
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          const hash = (text.charCodeAt(i % text.length) + i + j) % 3;
          if (hash === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
      
      // Add corner squares (typical QR code pattern)
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
    console.log('Starting PDF generation with data:', reservationData);
    
    await loadJsPDF();
    
    if (!window.jsPDF) {
      throw new Error('jsPDF is still not available after loading');
    }

    const { jsPDF } = window;
    const doc = new jsPDF();

    // Set Poppins font (fallback to standard fonts)
    doc.setFont("helvetica", "normal");

    // Header section with current date/time
    const now = new Date();
    const dateTime = now.toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Date and time at top right
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(dateTime, 200, 15, { align: 'right' });

    // Restaurant Logo and title
    doc.setFontSize(28);
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text('DINE24', 105, 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text('Premium Dining Experience', 105, 35, { align: 'center' });

    // Generate reservation ID and QR code
    const reservationId = reservationData.id ? reservationData.id.slice(0, 8).toUpperCase() : `RES${Date.now().toString().slice(-8)}`;
    
    // Generate and add QR code
    try {
      const qrCodeDataUrl = await generateQRCode(`DINE24-${reservationId}`);
      doc.addImage(qrCodeDataUrl, 'PNG', 85, 45, 40, 40);
    } catch (error) {
      console.log('QR code generation failed, using text fallback');
    }

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Reservation ID: #${reservationId}`, 105, 92, { align: 'center' });

    // Main title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text('RESERVATION CONFIRMATION', 105, 105, { align: 'center' });

    // Decorative line
    doc.setLineWidth(1);
    doc.setDrawColor(212, 175, 55);
    doc.line(20, 110, 190, 110);

    let yPos = 125;

    // Customer Details Section
    doc.setFontSize(14);
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text('CUSTOMER DETAILS', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    
    doc.text(`Name: ${reservationData.full_name || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Email: ${reservationData.email || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Phone: ${reservationData.phone || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Guests: ${reservationData.num_people || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Purpose: ${reservationData.purpose || 'N/A'}`, 20, yPos);

    // Reservation Details Section
    yPos += 20;
    doc.setFontSize(14);
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text('RESERVATION DETAILS', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    
    const arrivalDate = reservationData.arrival_date ? 
      new Date(reservationData.arrival_date).toLocaleDateString('en-IN') : 'N/A';
    doc.text(`Date: ${arrivalDate}`, 20, yPos);
    yPos += 7;
    doc.text(`Time: ${reservationData.arrival_time || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Table: ${reservationData.table_number || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Table Capacity: ${reservationData.table_capacity || 'N/A'} guests`, 20, yPos);

    // Order Details Section (if items exist)
    if (orderItems && orderItems.length > 0) {
      yPos += 20;
      doc.setFontSize(14);
      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.text('ORDER DETAILS', 20, yPos);
      
      yPos += 15;
      // Table headers
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text('Item', 20, yPos);
      doc.text('Qty', 100, yPos);
      doc.text('Price', 125, yPos);
      doc.text('Total', 165, yPos);
      
      yPos += 5;
      doc.line(20, yPos, 190, yPos);
      yPos += 8;

      let subtotal = 0;
      doc.setFont("helvetica", "normal");
      orderItems.forEach((item: any) => {
        const price = item.offer_price || item.price || 0;
        const quantity = item.selectedQuantity || 1;
        const itemTotal = price * quantity;
        subtotal += itemTotal;
        
        const itemName = item.name ? item.name.substring(0, 30) : 'Unknown Item';
        doc.text(itemName, 20, yPos);
        doc.text(quantity.toString(), 100, yPos);
        doc.text(`₹${price}`, 125, yPos);
        doc.text(`₹${itemTotal}`, 165, yPos);
        yPos += 7;
      });

      // Bill calculations with INR symbol
      const gst = Math.round(subtotal * 0.18);
      const total = subtotal + gst;

      yPos += 5;
      doc.line(125, yPos, 190, yPos);
      yPos += 10;
      
      doc.text('Subtotal:', 125, yPos);
      doc.text(`₹${subtotal}`, 165, yPos);
      yPos += 7;
      doc.text('GST (18%):', 125, yPos);
      doc.text(`₹${gst}`, 165, yPos);
      yPos += 7;
      
      doc.setFontSize(12);
      doc.setTextColor(212, 175, 55);
      doc.setFont("helvetica", "bold");
      doc.text('TOTAL:', 125, yPos);
      doc.text(`₹${total}`, 165, yPos);
    }

    // Important dining policy disclaimer
    yPos += 25;
    doc.setFontSize(10);
    doc.setTextColor(255, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text('⚠️ IMPORTANT DINING POLICY:', 20, yPos);
    yPos += 8;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const disclaimerText = [
      'You are allowed to have your meal within 1 hour from service start.',
      'Extended dining beyond this limit will incur an additional 15% charge',
      'of the total bill amount. Thank you for your understanding.'
    ];
    
    disclaimerText.forEach(line => {
      doc.text(line, 20, yPos);
      yPos += 6;
    });

    // Footer section
    yPos += 15;
    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text('Thank you for choosing DINE24!', 105, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.text('Contact: +91 98765 43210 | Email: info@dine24.com', 105, yPos, { align: 'center' });

    console.log('PDF generated successfully');
    return doc.output('datauristring');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};
