import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CircularProgress } from '@mui/material';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ReceiptIcon from '@mui/icons-material/Receipt';

const PDFReceipt = ({ bookingDetails, paymentDetails }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    // Create a temporary div to render the receipt content
    const receiptContent = document.createElement('div');
    receiptContent.style.width = '800px';
    receiptContent.style.padding = '40px';
    receiptContent.style.backgroundColor = 'white';
    receiptContent.style.fontFamily = 'Arial, sans-serif';
    receiptContent.style.position = 'absolute';
    receiptContent.style.left = '-9999px';
    receiptContent.style.top = '0';

    receiptContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2e7d32; margin: 0; font-size: 34px; font-weight: 800; font-family: 'Arial Black', Arial, sans-serif;">SHIV LIMO SERVICES</h1>
        <p style="color: #666; margin: 3px 0; font-size: 16px; font-weight: 600;">Professional Limousine & Transportation Services</p>
        <p style="color: #666; margin: 3px 0; font-size: 14px; font-weight: 500;">RECEIPT & BOOKING CONFIRMATION</p>
      </div>

      <div style="border: 3px solid #4CAF50; border-radius: 6px; padding: 15px; margin-bottom: 20px; background-color: #f8f9fa;">
        <h2 style="color: #4CAF50; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">✅ PAYMENT CONFIRMED</h2>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 17px; font-weight: 700; color: #333;">Total Amount Paid:</span>
          <span style="font-size: 23px; font-weight: 800; color: #4CAF50;">$${paymentDetails?.amount?.toFixed(2)} USD</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
        <div>
          <h3 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; margin-bottom: 10px; font-size: 16px; font-weight: 700;">PAYMENT INFORMATION</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 4px 0; font-weight: 700; color: #555; width: 40%;">Payment ID:</td>
              <td style="padding: 4px 0; color: #333; font-family: 'Courier New', monospace; font-weight: 600;">${paymentDetails?.id}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 700; color: #555;">Status:</td>
              <td style="padding: 4px 0; color: #4CAF50; font-weight: 700;">✅ CONFIRMED</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 700; color: #555;">Date:</td>
              <td style="padding: 4px 0; color: #333; font-weight: 600;">${new Date().toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 700; color: #555;">Method:</td>
              <td style="padding: 4px 0; color: #333; font-weight: 600;">Credit/Debit Card</td>
            </tr>
          </table>
        </div>

        <div>
          <h3 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; margin-bottom: 10px; font-size: 16px; font-weight: 700;">CUSTOMER INFORMATION</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 4px 0; font-weight: 700; color: #555; width: 40%;">Name:</td>
              <td style="padding: 4px 0; color: #333; font-weight: 600;">${bookingDetails?.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 700; color: #555;">Email:</td>
              <td style="padding: 4px 0; color: #333; font-weight: 600;">${bookingDetails?.email}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: 700; color: #555;">Phone:</td>
              <td style="padding: 4px 0; color: #333; font-weight: 600;">${bookingDetails?.phone}</td>
            </tr>
          </table>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; margin-bottom: 10px; font-size: 16px; font-weight: 700;">BOOKING DETAILS</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 4px 0; font-weight: 700; color: #555; width: 35%;">Vehicle Type:</td>
            <td style="padding: 4px 0; color: #333; font-weight: 600;">${bookingDetails?.vehicle}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 700; color: #555;">Pickup Date & Time:</td>
            <td style="padding: 4px 0; color: #333; font-weight: 600;">${new Date(bookingDetails?.datetime).toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 700; color: #555;">Pickup Location:</td>
            <td style="padding: 4px 0; color: #333; font-weight: 600;">${bookingDetails?.pickup}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 700; color: #555;">Drop-off Location:</td>
            <td style="padding: 4px 0; color: #333; font-weight: 600;">${bookingDetails?.dropoff}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; font-weight: 700; color: #555;">Notes:</td>
            <td style="padding: 4px 0; color: #333; font-weight: 600;">${bookingDetails?.notes || 'No additional notes'}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #e8f5e8; padding: 12px; border-radius: 6px; margin-bottom: 20px;">
        <h3 style="color: #2e7d32; margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">🚗 WHAT'S NEXT?</h3>
        <p style="margin: 0; color: #2e7d32; line-height: 1.4; font-size: 14px; font-weight: 600;">
          Our limo service owner will contact you within 30 minutes to confirm your booking details. Please keep this receipt for your records.
        </p>
      </div>

      <div style="text-align: center; margin-top: 20px; padding-top: 15px; border-top: 2px solid #ddd;">
        <p style="color: #666; margin: 0; font-size: 12px; font-weight: 600;">
          Thank you for choosing Shiv Limo Services! 🚗✨
        </p>
        <p style="color: #666; margin: 3px 0 0 0; font-size: 11px; font-weight: 500;">
          Receipt generated on ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    document.body.appendChild(receiptContent);

    try {
      // Convert the HTML to canvas
      const canvas = await html2canvas(receiptContent, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename
      const fileName = `ShivLimo_Receipt_${new Date().toISOString().split('T')[0]}_${paymentDetails?.id?.slice(-8)}.pdf`;
      
      // Download the PDF
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Clean up
      document.body.removeChild(receiptContent);
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      variant="contained"
      sx={{
        bgcolor: '#4CAF50',
        fontWeight: 600,
        py: 1,
        px: 2,
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          bgcolor: '#45a049',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
        '&:disabled': {
          bgcolor: '#ccc',
        },
        transition: 'all 0.2s ease',
      }}
    >
      {isGenerating ? (
        <>
          <CircularProgress size={14} sx={{ color: 'white', mr: 1 }} />
          Generating...
        </>
      ) : (
        <>
          <ReceiptIcon sx={{ mr: 1, fontSize: 18 }} />
          Download Receipt
        </>
      )}
    </Button>
  );
};

export default PDFReceipt; 