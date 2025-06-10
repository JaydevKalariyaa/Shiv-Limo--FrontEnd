import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import LuxurySedan from "../assets/luxury_sedan.jpg";
import fullSizeSuv from "../assets/fullsize-suv.jpg";
import compactSuv from "../assets/compact_suv.jpg";
import premiumSuv from "../assets/premium-suv.jpg";

const vehicleTypes = [
  { name: "Luxury Sedan", image: LuxurySedan },
  { name: "COMPACT SUV", image: compactSuv },
  { name: "FULL-SIZE SUV", image: fullSizeSuv },
  { name: "PREMIUM SUV", image: premiumSuv },
];

const BookRide = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickup: "",
    dropoff: "",
    datetime: "",
    vehicle: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [pickupOptions, setPickupOptions] = useState([]);
  const [dropoffOptions, setDropoffOptions] = useState([]);
  const [pickupSearchValue, setPickupSearchValue] = useState("");
  const [dropoffSearchValue, setDropoffSearchValue] = useState("");
  const [debouncedPickupSearch, setDebouncedPickupSearch] = useState("");
  const [debouncedDropoffSearch, setDebouncedDropoffSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const pickupTimer = setTimeout(() => {
      setDebouncedPickupSearch(pickupSearchValue);
    }, 300);

    const dropoffTimer = setTimeout(() => {
      setDebouncedDropoffSearch(dropoffSearchValue);
    }, 300);

    return () => {
      clearTimeout(pickupTimer);
      clearTimeout(dropoffTimer);
    };
  }, [pickupSearchValue, dropoffSearchValue]);

  useEffect(() => {
    if (debouncedPickupSearch) {
      const sessionToken =
        new window.google.maps.places.AutocompleteSessionToken();
      const service = new window.google.maps.places.AutocompleteService();

      const request = {
        input: debouncedPickupSearch,
        types: ["address"],
        sessionToken: sessionToken,
      };

      service.getPlacePredictions(request, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPickupOptions(
            predictions.map((prediction) => ({
              label: prediction.description,
              value: prediction.description,
            }))
          );
        }
      });
    }
  }, [debouncedPickupSearch]);

  useEffect(() => {
    if (debouncedDropoffSearch) {
      const sessionToken =
        new window.google.maps.places.AutocompleteSessionToken();
      const service = new window.google.maps.places.AutocompleteService();

      const request = {
        input: debouncedDropoffSearch,
        types: ["address"],
        sessionToken: sessionToken,
      };

      service.getPlacePredictions(request, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setDropoffOptions(
            predictions.map((prediction) => ({
              label: prediction.description,
              value: prediction.description,
            }))
          );
        }
      });
    }
  }, [debouncedDropoffSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Prepare payload with required keys
    const payload = {
      customerName: form.fullName,
      customerEmail: form.email,
      customerPhone: form.phone,
      carType: form.vehicle,
      pickupLocation: form.pickup,
      dropLocation: form.dropoff,
      bookingDateTime: form.datetime,
      note: form.notes,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book ride");
      }
      toast.success(
        "Your request has been submitted. The owner will contact you soon."
      );
      setForm({
        fullName: "",
        email: "",
        phone: "",
        pickup: "",
        dropoff: "",
        datetime: "",
        vehicle: "",
        notes: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Find selected vehicle object
  const selectedVehicle = vehicleTypes.find((v) => v.name === form.vehicle);

  return (
    <Box sx={{ bgcolor: "grey.50", minHeight: "100vh" }}>
      {/* Compact Header Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
          height: { xs: 56, md: 64 },
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            color: "grey.200",
            position: "absolute",
            left: { xs: 12, md: 32 },
            "&:hover": {
              bgcolor: "grey.900",
              color: "white",
              transform: "translateX(-2px) scale(1.08)",
            },
            transition: "all 0.2s",
            p: 1.2,
          }}
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Typography
          variant="h5"
          sx={{
            color: "grey.200",
            fontWeight: 700,
            letterSpacing: 1.5,
            textAlign: "center",
            flex: 1,
            fontSize: { xs: "1.1rem", md: "1.35rem" },
            userSelect: "none",
          }}
        >
          BOOK A RIDE
        </Typography>
      </Box>
      <Container maxWidth="sm" sx={{ pt: { xs: 3, md: 5 }, pb: 6 }}>
        <Box
          component="form"
          //   onSubmit={handleSubmit}
          sx={{
            bgcolor: "grey.100",
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
            border: "1.5px solid #e0e0e0",
            mt: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          {/* Full Name */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Full Name
            </Typography>
            <TextField
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
            />
          </Box>
          {/* Email */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Email
            </Typography>
            <TextField
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
            />
          </Box>
          {/* Phone Number */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Phone Number
            </Typography>
            <TextField
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
            />
          </Box>
          {/* Pickup Address */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Pickup Address
            </Typography>
            <Autocomplete
              freeSolo
              options={pickupOptions}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
              inputValue={pickupSearchValue}
              onInputChange={(_, newValue) => {
                setPickupSearchValue(newValue);
              }}
              onChange={(_, newValue) => {
                const value =
                  typeof newValue === "string" ? newValue : newValue?.label;
                setForm({ ...form, pickup: value });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: false }}
                />
              )}
            />
          </Box>
          {/* Drop Off Address */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Drop Off Address
            </Typography>
            <Autocomplete
              freeSolo
              options={dropoffOptions}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
              inputValue={dropoffSearchValue}
              onInputChange={(_, newValue) => {
                setDropoffSearchValue(newValue);
              }}
              onChange={(_, newValue) => {
                const value =
                  typeof newValue === "string" ? newValue : newValue?.label;
                setForm({ ...form, dropoff: value });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: false }}
                />
              )}
            />
          </Box>
          {/* Pickup Date & Time */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Pickup Date & Time
            </Typography>
            <TextField
              name="datetime"
              value={form.datetime}
              onChange={handleChange}
              type="datetime-local"
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          {/* Vehicle Type */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Vehicle Type
            </Typography>
            <TextField
              select
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          {/* Show vehicle image if selected */}
          {selectedVehicle && (
            <Box
              sx={{
                mt: 2,
                mb: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                sx={{
                  width: { xs: "100%", sm: 320 },
                  maxWidth: 360,
                  height: { xs: 160, sm: 180 },
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                  border: "1.5px solid #e0e0e0",
                }}
              />
            </Box>
          )}
          {/* Additional Notes */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Additional Notes
            </Typography>
            <TextField
              name="notes"
              value={form.notes}
              onChange={handleChange}
              multiline
              minRows={3}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, fontWeight: 600, letterSpacing: 1 }}
            fullWidth
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Book Now"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BookRide;
