import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MotionCard = motion(Card);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false, // Show postal code for US addresses
  supportedCountries: ['US'], // Only support US
};

const StripePayment = ({ amount, customerDetails, onPaymentSuccess, onPaymentError, isProcessing, setIsProcessing, isProcessingPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);
    setIsProcessing(true);

    try {
      // Create payment intent on the backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/stripe/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          customerName: customerDetails?.fullName || '',
          customerEmail: customerDetails?.email || '',
          customerPhone: customerDetails?.phone || '',
          pickupLocation: customerDetails?.pickup || '',
          dropLocation: customerDetails?.dropoff || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        onPaymentError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent);
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      onPaymentError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
      
    }
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CreditCardIcon sx={{ fontSize: 28, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'grey.900' }}>
              Secure Payment
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.600' }}>
              Your payment is protected by Stripe
            </Typography>
          </Box>
        </Box>

       

        {/* Security Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SecurityIcon sx={{ fontSize: 20, color: 'success.main', mr: 1 }} />
          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
            Secure Payment Gateway
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Payment Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'grey.900' }}>
            Card Details
          </Typography>
          
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              p: 2,
              mb: 3,
              bgcolor: '#fafafa',
            }}
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>

          {/* Error Display */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Payment Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!stripe || processing || isProcessing || isProcessingPayment}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&:disabled': {
                bgcolor: 'grey.400',
              },
            }}
          >
            {processing || isProcessing ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                Processing Payment...
              </Box>
            ) : isProcessingPayment ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                Completing Booking...
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ mr: 1 }} />
                Pay ${amount.toFixed(2)}
              </Box>
            )}
          </Button>
        </Box>

        {/* Payment Info */}
        <Box sx={{ mt: 3, textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: 'grey.600' }}>
              🔒 Your payment information is encrypted and secure • PCI DSS Compliant
            </Typography>
          </Box>
          
          {/* US Payment Info */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: 'grey.500', fontSize: '0.75rem' }}>
              💳 Accepts all major US credit cards • Visa, Mastercard, American Express, Discover
            </Typography>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

export default StripePayment; 