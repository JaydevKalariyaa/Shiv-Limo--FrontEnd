import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LuxurySedan from '../assets/luxury_sedan.jpg';
import fullSizeSuv from '../assets/fullsize-suv.jpg';
import compactSuv from '../assets/compact_suv.jpg';
import premiumSuv from '../assets/premium-suv.jpg';


const MotionCard = motion(Card);

const fleetData = [
  {
    name: "Luxury Sedan",
    image: LuxurySedan,
    capacity: "3 passengers",
    bags: "3 bags",
  },
  {
    name: "COMPACT SUV",
    image: compactSuv,
    capacity: "4 passengers",
    bags: "4 bags",
  },
  {
    name: "FULL-SIZE SUV",
    image: fullSizeSuv,
    capacity: "6 passengers",
    bags: "6 bags",
  },
  {
    name: "PREMIUM SUV",
    image: premiumSuv,
    capacity: "6 passengers",
    bags: "6 bags",
  },
];

const Fleet = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Compact Header Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'black',
          height: { xs: 56, md: 64 },
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          mb: { xs: 3, md: 4 },
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            color: 'grey.200',
            position: 'absolute',
            left: { xs: 12, md: 32 },
            '&:hover': {
              bgcolor: 'grey.900',
              color: 'white',
              transform: 'translateX(-2px) scale(1.08)',
            },
            transition: 'all 0.2s',
            p: 1.2,
          }}
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Typography
          variant="h5"
          sx={{
            color: 'grey.200',
            fontWeight: 700,
            letterSpacing: 1.5,
            textAlign: 'center',
            flex: 1,
            fontSize: { xs: '1.1rem', md: '1.35rem' },
            userSelect: 'none',
          }}
        >
          SHIV LIMO FLEET
        </Typography>
      </Box>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={3}>
            {fleetData.map((car, index) => (
              <Grid size={{xs:12, sm:6, md:3}} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={car.image}
                    alt={car.name}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: 'primary.main',
                      }}
                    >
                      {car.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                        fontSize: { xs: '1.1rem', sm: '1.2rem' },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 1.5,
                          py: 0.5,
                          bgcolor: 'grey.100',
                          borderRadius: 2,
                          fontWeight: 600,
                          color: 'grey.900',
                          fontSize: { xs: '1.15rem', sm: '1.25rem' },
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        <span role="img" aria-label="passengers">👥</span> {car.capacity.split(' ')[0]}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 1.5,
                          py: 0.5,
                          bgcolor: 'grey.100',
                          borderRadius: 2,
                          fontWeight: 600,
                          color: 'grey.900',
                          fontSize: { xs: '1.15rem', sm: '1.25rem' },
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}
                      >
                        <span role="img" aria-label="bags">🧳</span> {car.bags.split(' ')[0]}
                      </Box>
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

        
        </motion.div>
      </Container>
    </Box>
  );
};

export default Fleet; 