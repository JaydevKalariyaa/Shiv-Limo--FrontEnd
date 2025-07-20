import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PDFReceipt from './PDFReceipt';

const MotionBox = motion(Box);

const PaymentSuccessDialog = ({ open, onClose, bookingDetails, paymentDetails }) => {
  console.log("paymentDetails",paymentDetails)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: 'white',
          overflow: 'hidden',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Success Header */}
        <Box
          sx={{
            bgcolor: 'success.main',
            color: 'white',
            p: 2.5,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <CheckCircleIcon sx={{ fontSize: 60, mb: 1.5 }} />
          </MotionBox>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Your ride has been booked and confirmed
          </Typography>
        </Box>

        {/* Booking Details */}
        <Box sx={{ p: 2.5 }}>
          {/* Payment Amount Highlight with Download Button */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main', mb: 0.5 }}>
              ${paymentDetails?.amount?.toFixed(2)} USD
            </Typography>
            <Typography variant="body2" color="grey.600" sx={{ mb: 2 }}>
              Total Amount Paid
            </Typography>
            <PDFReceipt 
              bookingDetails={bookingDetails} 
              paymentDetails={paymentDetails} 
            />
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Compact Booking Summary */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'grey.900',fontSize:17 }}>
              Booking Summary
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <DirectionsCarIcon sx={{ color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600,fontSize:14 }}>
                  {bookingDetails?.vehicle}
                </Typography>
                <Typography variant="body2" color="grey.600" sx={{fontSize:13 }}>
                  Vehicle Type
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <AccessTimeIcon sx={{ color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600,fontSize:14 }}>
                  {new Date(bookingDetails?.datetime).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="grey.600" sx={{fontSize:13 }}>
                  Pickup Date & Time
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <LocationOnIcon sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600,fontSize:14 }}>
                  {bookingDetails?.pickup}
                </Typography>
                <Typography variant="body2" color="grey.600" sx={{fontSize:13 }}>
                  Pickup Location
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
              <LocationOnIcon sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600,fontSize:14 }}>
                  {bookingDetails?.dropoff}
                </Typography>
                <Typography variant="body2" color="grey.600" sx={{fontSize:13 }}>
                  Drop-off Location
                </Typography>
              </Box>
            </Box>
          </Box>

        

          {/* Compact Next Steps */}
         


        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessDialog; 