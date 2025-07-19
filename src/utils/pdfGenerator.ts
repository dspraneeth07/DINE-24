
// Load jsPDF with better error handling and retry mechanism
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
    script.src = 'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      console.log('jsPDF script loaded');
      // Wait for jsPDF to be available on window
      let attempts = 0;
      const checkJsPDF = () => {
        attempts++;
        if (window.jsPDF) {
          console.log('jsPDF is available');
          resolve();
        } else if (attempts < 10) {
          setTimeout(checkJsPDF, 100);
        } else {
          reject(new Error('jsPDF failed to initialize after multiple attempts'));
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

export const generateReservationPDF = async (reservationData: any, orderItems?: any[]) => {
  try {
    console.log('Starting PDF generation with data:', reservationData);
    
    // Load jsPDF with retry mechanism
    await loadJsPDF();
    
    if (!window.jsPDF) {
      throw new Error('jsPDF is not available on window object');
    }

    const { jsPDF } = window;
    const doc = new jsPDF();

    // Header section
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

    // Logo and title
    doc.setFontSize(24);
    doc.setTextColor(212, 175, 55);
    doc.text('🍽️ DINE 24', 20, 25);
    
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('Premium Dining Experience', 20, 35);

    // Main title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('RESERVATION CONFIRMATION', 105, 50, { align: 'center' });

    // Decorative line
    doc.setLineWidth(1);
    doc.setDrawColor(212, 175, 55);
    doc.line(20, 55, 190, 55);

    let yPos = 70;

    // Customer Details
    doc.setFontSize(14);
    doc.setTextColor(212, 175, 55);
    doc.text('CUSTOMER DETAILS', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    const reservationId = reservationData.id ? reservationData.id.slice(0, 8).toUpperCase() : 'N/A';
    doc.text(`Reservation ID: #${reservationId}`, 20, yPos);
    yPos += 7;
    doc.text(`Name: ${reservationData.full_name || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Email: ${reservationData.email || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Phone: ${reservationData.phone || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Guests: ${reservationData.num_people || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Purpose: ${reservationData.purpose || 'N/A'}`, 20, yPos);

    // Reservation Details
    yPos += 20;
    doc.setFontSize(14);
    doc.setTextColor(212, 175, 55);
    doc.text('RESERVATION DETAILS', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    const arrivalDate = reservationData.arrival_date ? 
      new Date(reservationData.arrival_date).toLocaleDateString('en-IN') : 'N/A';
    doc.text(`Date: ${arrivalDate}`, 20, yPos);
    yPos += 7;
    doc.text(`Time: ${reservationData.arrival_time || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Table: ${reservationData.table_number || 'N/A'}`, 20, yPos);
    yPos += 7;
    doc.text(`Table Capacity: ${reservationData.table_capacity || 'N/A'} guests`, 20, yPos);

    // Order Details
    if (orderItems && orderItems.length > 0) {
      yPos += 20;
      doc.setFontSize(14);
      doc.setTextColor(212, 175, 55);
      doc.text('ORDER DETAILS', 20, yPos);
      
      yPos += 15;
      // Table headers
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text('Item', 20, yPos);
      doc.text('Qty', 100, yPos);
      doc.text('Price', 125, yPos);
      doc.text('Total', 165, yPos);
      
      yPos += 5;
      doc.line(20, yPos, 190, yPos);
      yPos += 8;

      let subtotal = 0;
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

      // Calculations
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
      doc.text('TOTAL:', 125, yPos);
      doc.text(`₹${total}`, 165, yPos);
    }

    // Footer
    yPos += 30;
    doc.setFontSize(12);
    doc.setTextColor(212, 175, 55);
    doc.text('Thank you for choosing Dine 24!', 105, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Contact: +91 98765 43210 | Email: info@dine24.com', 105, yPos, { align: 'center' });

    console.log('PDF generated successfully');
    return doc.output('datauristring');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};
