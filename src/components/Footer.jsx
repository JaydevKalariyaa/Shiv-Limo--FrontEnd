import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

const Footer = () => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 4, md: 6 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 2,
                  bgcolor: 'white',
                },
              }}
            >
              Shiv Limo
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                lineHeight: 1.6,
              }}
            >
              Premium car service for all your transportation needs.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 2,
                  bgcolor: 'white',
                },
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Phone: +91 8152953812
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Email: shivlimousine@gmail.com

              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Address: 780, Hampton ct, Unit 2, Bourbonnais, IL 60914
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 2,
                  bgcolor: 'white',
                },
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: <Facebook />, label: 'Facebook' },
                { icon: <Twitter />, label: 'Twitter' },
                { icon: <Instagram />, label: 'Instagram' },
                { icon: <LinkedIn />, label: 'LinkedIn' },
              ].map((social, index) => (
                <MotionIconButton
                  key={index}
                  color="inherit"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  {social.icon}
                </MotionIconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{
            mt: 5,
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{
              opacity: 0.8,
            }}
          >
            {'© '}
            {new Date().getFullYear()}
            {' Shiv Limo. All rights reserved.'}
          </Typography>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default Footer; 