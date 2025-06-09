import React from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTableContainer = motion(TableContainer);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const Pricing = () => {
  const navigate = useNavigate();

  const pointToPointPricing = [
    { vehicle: 'Sedan', baseFare: '$100', perMile: '$3.00' },
    { vehicle: 'Compact SUV', baseFare: '$120', perMile: '$3.50' },
    { vehicle: 'Full-Size SUV', baseFare: '$125', perMile: '$4.00' },
    { vehicle: 'Premium SUV', baseFare: '$150', perMile: '$4.50' },
  ];

  const hourlyPricing = [
    { vehicle: 'Sedan', rate: '$90/hour' },
    { vehicle: 'Compact SUV', rate: '$100/hour' },
    { vehicle: 'Full-Size SUV', rate: '$105/hour' },
    { vehicle: 'Premium SUV', rate: '$125/hour' },
  ];

  const extraServices = [
    { service: 'Booster Seat', rate: '$25' },
    { service: 'Car Seat', rate: '$25' },
    { service: 'Meet and Greet', rate: '$50' },
  ];

  const tableHeaderStyle = {
    bgcolor: 'grey.200',
    color: 'grey.900',
    fontWeight: 700,
    fontSize: { xs: '0.9rem', sm: '1.05rem' },
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    border: '1px solid #bdbdbd',
    textAlign: 'center',
    py: 1.5,
    transition: 'background 0.2s, transform 0.2s',
  };
  const tableCellStyle = {
    fontSize: { xs: '0.98rem', sm: '1.05rem' },
    border: '1px solid #bdbdbd',
    textAlign: 'center',
    py: 1.5,
    transition: 'background 0.2s, transform 0.2s',
  };

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
          SHIV LIMO PRICING
        </Typography>
      </Box>
      <Container maxWidth="sm" sx={{ pt: { xs: 1, md: 2 }, pb: 6, mt: { xs: 3, md: 4 } }}>
        {/* Point-to-Point Pricing */}
        <MotionBox
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: 3.5, mt: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'grey.800',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                mb: 0.5,
              }}
            >
              Point-to-Point Pricing
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'grey.600',
                fontWeight: 500,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
              }}
            >
              (Includes 20 Miles)
            </Typography>
          </Box>
          <MotionTableContainer
            component={Paper}
            sx={{
              boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)',
              borderRadius: 3,
              mb: 5,
              overflow: 'hidden',
              border: '1px solid #bdbdbd',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeaderStyle}>Vehicle Type</TableCell>
                  <TableCell sx={tableHeaderStyle}>Base Fare (0 - 20 mi)</TableCell>
                  <TableCell sx={tableHeaderStyle}>Per Mile After 20 mi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pointToPointPricing.map((row) => (
                  <motion.tr
                    key={row.vehicle}
                    whileHover={{ scale: 1.015, backgroundColor: '#f5f5f5' }}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={tableCellStyle}>{row.vehicle}</TableCell>
                    <TableCell sx={tableCellStyle}>{row.baseFare}</TableCell>
                    <TableCell sx={tableCellStyle}>{row.perMile}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </MotionTableContainer>
        </MotionBox>
        {/* Hourly Charter Pricing */}
        <MotionBox
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: 3.5, mt: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: 'grey.800',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                mb: 0.5,
              }}
            >
              Hourly Charter Pricing
            </Typography>
          </Box>
          <MotionTableContainer
            component={Paper}
            sx={{
              boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)',
              borderRadius: 3,
              mb: 5,
              overflow: 'hidden',
              border: '1px solid #bdbdbd',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeaderStyle}>Vehicle Type</TableCell>
                  <TableCell sx={tableHeaderStyle}>Hourly Rate (2-Hour Minimum)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hourlyPricing.map((row) => (
                  <motion.tr
                    key={row.vehicle}
                    whileHover={{ scale: 1.015, backgroundColor: '#f5f5f5' }}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={tableCellStyle}>{row.vehicle}</TableCell>
                    <TableCell sx={tableCellStyle}>{row.rate}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </MotionTableContainer>
        </MotionBox>
        {/* Extra Services */}
        <MotionBox
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeInUp}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'grey.800',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              mb: 2.5,
              mt: 2,
              fontSize: { xs: '1.2rem', md: '1.4rem' },
            }}
          >
            Extra Services
          </Typography>
          <MotionTableContainer
            component={Paper}
            sx={{
              boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10)',
              borderRadius: 3,
              mb: 2,
              overflow: 'hidden',
              border: '1px solid #bdbdbd',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableHeaderStyle}>Service</TableCell>
                  <TableCell sx={tableHeaderStyle}>Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {extraServices.map((row) => (
                  <motion.tr
                    key={row.service}
                    whileHover={{ scale: 1.015, backgroundColor: '#f5f5f5' }}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={tableCellStyle}>{row.service}</TableCell>
                    <TableCell sx={tableCellStyle}>{row.rate}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </MotionTableContainer>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Pricing; 