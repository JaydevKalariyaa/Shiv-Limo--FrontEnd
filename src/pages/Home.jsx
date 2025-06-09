import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { Phone, Email, Save, DirectionsCar, AttachMoney, Event } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

const Home = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '' });

  const handleSaveContact = () => {
    // Create vCard content
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:Bharat Sanariya
ORG:Shiv Limo
TITLE:Owner / Chauffer
TEL;TYPE=CELL:+8152953812
EMAIL:shivlimousine@gmail.com
URL:https://shivlimo.com
NOTE:Premium Car Service
END:VCARD`;

    // Create blob and download link
    const blob = new Blob([vCardContent], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bharat-Sanariya.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success message
    setSnackbar({
      open: true,
      message: 'Contact saved successfully!',
    });
  };

  const options = [
    {
      title: 'Save My Contact',
      icon: <Save sx={{ fontSize: 32 }} />,
      onClick: handleSaveContact,
    },
    {
      title: 'View Pricing',
      icon: <AttachMoney sx={{ fontSize: 32 }} />,
      onClick: () => {
       navigate('/pricing')
      },
    },
    {
      title: 'View Fleet',
      icon: <DirectionsCar sx={{ fontSize: 32 }} />,
      onClick: () => navigate('/fleet'),
    },
    {
      title: 'Book a Ride',
      icon: <Event sx={{ fontSize: 32 }} />,
      onClick: () => {
        // Add booking functionality
        navigate('/book-ride')
      },
    },
  ];

  const services = [
    {
      title: 'LUXURY CHAUFFEUR SERVICES',
      icon: '🚗',
      description: 'Professional chauffeur services for your comfort and convenience',
    },
    {
      title: 'AIRPORT TRANSFERS',
      icon: '✈️',
      description: 'Reliable and punctual airport pickup and drop-off services',
    },
    {
      title: 'HOURLY BOOKINGS',
      icon: '🕒',
      description: 'Flexible hourly booking options for your travel needs',
    },
    {
      title: 'EVENTS & SPECIAL OCCASIONS',
      icon: '🎉',
      description: 'Premium transportation for weddings, corporate events, and special occasions',
    },
  ];

  return (
    <Box sx={{ overflow: 'hidden', width: '100%' }}>
      {/* Hero Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          bgcolor: 'grey.900',
          color: 'white',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, px: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 2, sm: 4 },
              mb: 4,
            }}
          >
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                bgcolor: 'white',
                p: 1.2,
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: { xs: 60, sm: 70 },
                width: { xs: 60, sm: 70 },
                minWidth: { xs: 60, sm: 70 },
                minHeight: { xs: 60, sm: 70 },
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Shiv Limo Logo"
                sx={{
                  height: { xs: 38, sm: 48 },
                  width: 'auto',
                  filter: 'brightness(0.9)',
                  display: 'block',
                  mx: 'auto',
                }}
              />
            </MotionBox>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-start' },
                justifyContent: 'center',
                gap: 0.5,
                minWidth: 0,
              }}
            >
              <MotionTypography
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                variant="h1"
                component="h1"
                sx={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  fontSize: { xs: '1.7rem', sm: '1.9rem' },
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(45deg, #fff 30%, #f5f5f5 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 0.2,
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                Shiv Limo
              </MotionTypography>
              <MotionTypography
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                variant="h6"
                sx={{
                  color: 'secondary.main',
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  opacity: 0.9,
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                Premium Car Service
              </MotionTypography>
            </Box>
          </Box>

          <MotionBox
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              mb: 4,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: 'grey.300',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Owner / Chauffer
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.5rem', sm: '1.7rem' },
                fontWeight: 600,
                letterSpacing: '0.02em',
                background: 'linear-gradient(45deg, #fff 30%, #f5f5f5 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Bharat Sanariya
            </Typography>
          </MotionBox>

          <Box
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{flexDirection:'row !important',display:'flex ',alignItems:'center',justifyContent:'center',gap:'6px'}}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Phone />}
              href="tel:+1234567890"
              sx={{
                bgcolor: 'white',
                color: 'grey.900',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
                padding:"10px 0",
               flex:3,
                width: { xs: '100%', sm: 'auto' },
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              +91 8152953812
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Email />}
              href="mailto:info@shivlimo.com"
              sx={{
                bgcolor: 'white',
                color: 'grey.900',  padding:"10px 0",
                flex:4,
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                },
                width: { xs: '100%', sm: 'auto' },
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            >
              
              shivlimousine@gmail.com
            </Button>
          </Box>
        </Container>
      </MotionBox>

      {/* Main Options */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={1.5}>
          {options.map((option, index) => (
            <Grid size={12} key={index}>
              <MotionCard
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={option.onClick}
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '3px',
                    height: '100%',
                    bgcolor: 'primary.main',
                  },
                  '&:hover': {
                    '& .MuiCardContent-root': {
                      transform: 'translateX(8px)',
                    },
                    '& .option-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      color: 'primary.main',
                    },
                    '& .option-title': {
                      color: 'primary.main',
                    },
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 1.2, sm: 2.5 },
                    transition: 'all 0.3s ease',
                    paddingBottom:'12px !important'
                  }}
                >
                  <Box
                    className="option-icon"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: 45, sm: 50 },
                      height: { xs: 45, sm: 50 },
                      borderRadius: '8px',
                      bgcolor: 'background.paper',
                     marginRight:'22px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {React.cloneElement(option.icon, {
                      sx: {
                        fontSize: { xs: 22, sm: 28 },
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                      },
                    })}
                  </Box>
                  <Box sx={{ flex: 1}}>
                    <Typography
                      className="option-title"
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        transition: 'color 0.3s ease',
                        fontSize: { xs: '1.2rem', sm: '1.4rem' },
                        letterSpacing: '0.02em',
                      }}
                    >
                      {option.title}
                    </Typography>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Services Section */}
      <Box sx={{ py: { xs: 3, md: 4 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                textAlign: 'center',
                mb: 3,
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '1.8rem', md: '2.3rem' },
              }}
            >
              Our Services
            </Typography>

            <Grid container spacing={2}>
              {services.map((service, index) => (
                <Grid size={{xs:12, sm:6}} key={index}>
                  <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 1 }}>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: '2.5rem',
                          mb: 1.5,
                        }}
                      >
                        {service.icon}
                      </Typography>
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          mb: 1.5,
                          color: 'primary.main',
                          fontSize: { xs: '1rem', sm: '1.2rem' },
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          maxWidth: '90%',
                          mx: 'auto',
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home; 