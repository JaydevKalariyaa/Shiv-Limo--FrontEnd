import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';

const PaymentDemo = () => {
  const features = [
    {
      icon: <CreditCardIcon sx={{ color: 'primary.main' }} />,
      title: 'Secure Card Payments',
      description: 'Accept credit and debit cards securely through Stripe',
    },
    {
      icon: <PaymentIcon sx={{ color: 'primary.main' }} />,
      title: 'Two Payment Options',
      description: 'Book now and pay later, or pay immediately',
    },
    {
      icon: <SecurityIcon sx={{ color: 'primary.main' }} />,
      title: 'PCI Compliant',
      description: 'All payment data is handled securely by Stripe',
    },
    {
      icon: <CheckCircleIcon sx={{ color: 'primary.main' }} />,
      title: 'Instant Confirmation',
      description: 'Get immediate booking confirmation after payment',
    },
  ];

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
          🚗 Payment Integration Features
        </Typography>
        
        <List>
          {features.map((feature, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemIcon>{feature.icon}</ListItemIcon>
              <ListItemText
                primary={feature.title}
                secondary={feature.description}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            US Test Cards for Development:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip 
              label="Visa: 4242 4242 4242 4242" 
              size="small" 
              color="success" 
              variant="outlined"
            />
            <Chip 
              label="Amex: 3782 822463 10005" 
              size="small" 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              label="Discover: 6011 1111 1111 1117" 
              size="small" 
              color="secondary" 
              variant="outlined"
            />
            <Chip 
              label="Decline: 4000 0000 0000 0002" 
              size="small" 
              color="error" 
              variant="outlined"
            />
          </Box>
          <Typography variant="caption" sx={{ color: 'grey.600', mt: 1, display: 'block' }}>
            💡 Use any future expiry date and 3-digit CVC (4-digit for Amex)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentDemo; 