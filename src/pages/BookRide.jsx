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
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StraightenIcon from "@mui/icons-material/Straighten";
import PlaceIcon from "@mui/icons-material/Place";
import LuxurySedan from "../assets/luxury_sedan.jpg";
import fullSizeSuv from "../assets/fullsize-suv.jpg";
import compactSuv from "../assets/compact_suv.jpg";
import premiumSuv from "../assets/premium-suv.jpg";

const MotionCard = motion(Card);

const vehicleTypes = [
  { name: "Luxury Sedan", image: LuxurySedan },
  { name: "COMPACT SUV", image: compactSuv },
  { name: "FULL-SIZE SUV", image: fullSizeSuv },
  { name: "PREMIUM SUV", image: premiumSuv },
];

// Pricing data from Pricing component
const pointToPointPricing = [
  { vehicle: "Luxury Sedan", baseFare: 100, perMile: 3.0 },
  { vehicle: "COMPACT SUV", baseFare: 120, perMile: 3.5 },
  { vehicle: "FULL-SIZE SUV", baseFare: 125, perMile: 4.0 },
  { vehicle: "PREMIUM SUV", baseFare: 150, perMile: 4.5 },
];

const gratuityOptions = [
  { value: "none", label: "None", percentage: 0 },
  { value: "10", label: "10%", percentage: 10 },
  { value: "15", label: "15%", percentage: 15 },
  { value: "20", label: "20%", percentage: 20 },
  { value: "25", label: "25%", percentage: 25 },
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
    gratuity: "none",
  });
  const [submitting, setSubmitting] = useState(false);
  const [pickupOptions, setPickupOptions] = useState([]);
  const [dropoffOptions, setDropoffOptions] = useState([]);
  const [pickupSearchValue, setPickupSearchValue] = useState("");
  const [dropoffSearchValue, setDropoffSearchValue] = useState("");
  const [debouncedPickupSearch, setDebouncedPickupSearch] = useState("");
  const [debouncedDropoffSearch, setDebouncedDropoffSearch] = useState("");

  // Fare estimation states
  const [fareEstimate, setFareEstimate] = useState(null);
  const [isCalculatingFare, setIsCalculatingFare] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "fullName": {
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Full name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value.trim()))
          return "Full name can only contain letters and spaces";
        return "";
      }

      case "email": {
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim()))
          return "Please enter a valid email address";
        return "";
      }

      case "phone": {
        if (!value.trim()) return "Phone number is required";
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/[\s\-()]/g, "");
        if (!phoneRegex.test(cleanPhone))
          return "Please enter a valid phone number";
        if (cleanPhone.length < 10)
          return "Phone number must be at least 10 digits";
        return "";
      }

      case "pickup": {
        if (!value.trim()) return "Pickup address is required";
        if (value.trim().length < 5)
          return "Please enter a complete pickup address";
        return "";
      }

      case "dropoff": {
        if (!value.trim()) return "Drop-off address is required";
        if (value.trim().length < 5)
          return "Please enter a complete drop-off address";
        return "";
      }

      case "datetime": {
        if (!value) return "Pickup date and time is required";
        const selectedDate = new Date(value);
        const now = new Date();
        if (selectedDate <= now) return "Pickup time must be in the future";
        return "";
      }

      case "vehicle": {
        if (!value) return "Please select a vehicle type";
        return "";
      }

      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (key !== "notes" && key !== "gratuity") {
        const error = validateField(key, form[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (touched[name] && errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Calculate distance between two addresses using Google Maps Distance Matrix API
  const calculateDistance = (origin, destination) => {
    if (!origin || !destination) return Promise.resolve(0);

    const service = new window.google.maps.DistanceMatrixService();

    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        },
        (response, status) => {
          if (status === "OK") {
            const result = response.rows[0].elements[0];
            if (result.status === "OK") {
              console.log(result);
              const distance = result.distance.value / 1609.34; // Convert meters to miles
              if (distance === 0) {
                resolve(1);
                return;
              }
              resolve(distance);
            } else {
              reject(new Error("Unable to calculate distance"));
            }
          } else {
            reject(new Error("Failed to fetch distance matrix"));
          }
        }
      );
    });
  };

  // Calculate fare based on vehicle type and distance
  const calculateFare = (vehicleType, distance, gratuityPercentage = 0) => {
    console.log(vehicleType, distance);
    const pricing = pointToPointPricing.find((p) => p.vehicle === vehicleType);
    console.log(pricing);
    if (!pricing) return 0;

    let baseFare;
    if (distance <= 20) {
      baseFare = pricing.baseFare;
    } else {
      const extraMiles = distance - 20;
      baseFare = pricing.baseFare + extraMiles * pricing.perMile;
    }

    const gratuityAmount = (baseFare * gratuityPercentage) / 100;
    const totalFare = baseFare + gratuityAmount;

    return {
      baseFare,
      gratuityAmount,
      totalFare,
      distance,
      vehicle: vehicleType,
      perMileRate: pricing.perMile,
    };
  };

  // Estimate fare when vehicle, pickup, and dropoff are selected
  useEffect(() => {
    const estimateFare = async () => {
      if (form.vehicle && form.pickup && form.dropoff) {
        setIsCalculatingFare(true);
        console.log(form.pickup, form.dropoff);
        try {
          const distance = await calculateDistance(form.pickup, form.dropoff);
          console.log(distance);
          const fare = calculateFare(
            form.vehicle,
            distance,
            gratuityOptions.find((g) => g.value === form.gratuity)
              ?.percentage || 0
          );
          setFareEstimate(fare);
        } catch (error) {
          console.error("Error estimating fare:", error);
          toast.error("Unable to calculate fare. Please try again.");
        } finally {
          setIsCalculatingFare(false);
        }
      } else {
        setFareEstimate(null);
      }
    };

    // Debounce the fare calculation
    const timer = setTimeout(estimateFare, 1000);
    return () => clearTimeout(timer);
  }, [form.vehicle, form.pickup, form.dropoff, form.gratuity]);
  console.log(form);
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

    // Validate all fields before submission
    if (!validateForm()) {
      toast.error("Please fill all details in the form before submitting.");
      return;
    }

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
      estimatedFare: fareEstimate?.totalFare,
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
        gratuity: "none",
      });
      setErrors({});
      setTouched({});
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
              onBlur={() => handleFieldBlur("fullName")}
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              error={touched.fullName && errors.fullName}
              helperText={touched.fullName && errors.fullName}
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
              onBlur={() => handleFieldBlur("email")}
              type="email"
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
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
              onBlur={() => handleFieldBlur("phone")}
              type="tel"
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              error={touched.phone && errors.phone}
              helperText={touched.phone && errors.phone}
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
                if (newValue) {
                  const value =
                    typeof newValue === "string" ? newValue : newValue?.label;
                  setForm({ ...form, pickup: value });
                  setPickupSearchValue(value);
                } else {
                  // Handle clear button click
                  setForm({ ...form, pickup: "" });
                  setPickupSearchValue("");
                }
              }}
              onBlur={() => {
                // Ensure the current input value is saved when user clicks outside
                if (pickupSearchValue && pickupSearchValue.trim()) {
                  setForm({ ...form, pickup: pickupSearchValue });
                }
                // Validate the field
                handleFieldBlur("pickup");
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ py: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <PlaceIcon
                      sx={{
                        fontSize: 18,
                        color: "primary.main",
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "grey.800",
                        lineHeight: 1.3,
                        flex: 1,
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: false }}
                  error={touched.pickup && errors.pickup}
                  helperText={touched.pickup && errors.pickup}
                />
              )}
              sx={{
                "& .MuiAutocomplete-listbox": {
                  py: 0,
                  "& li": {
                    borderBottom: "1px solid #f0f0f0",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                    },
                  },
                },
              }}
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
                if (newValue) {
                  const value =
                    typeof newValue === "string" ? newValue : newValue?.label;
                  setForm({ ...form, dropoff: value });
                  setDropoffSearchValue(value);
                } else {
                  // Handle clear button click
                  setForm({ ...form, dropoff: "" });
                  setDropoffSearchValue("");
                }
              }}
              onBlur={() => {
                // Ensure the current input value is saved when user clicks outside
                if (dropoffSearchValue && dropoffSearchValue.trim()) {
                  setForm({ ...form, dropoff: dropoffSearchValue });
                }
                // Validate the field
                handleFieldBlur("dropoff");
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ py: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <PlaceIcon
                      sx={{
                        fontSize: 18,
                        color: "primary.main",
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "grey.800",
                        lineHeight: 1.3,
                        flex: 1,
                      }}
                    >
                      {option.label}
                    </Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: false }}
                  error={touched.dropoff && errors.dropoff}
                  helperText={touched.dropoff && errors.dropoff}
                />
              )}
              sx={{
                "& .MuiAutocomplete-listbox": {
                  py: 0,
                  "& li": {
                    borderBottom: "1px solid #f0f0f0",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                    },
                  },
                },
              }}
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
              onBlur={() => handleFieldBlur("datetime")}
              type="datetime-local"
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
              error={touched.datetime && errors.datetime}
              helperText={touched.datetime && errors.datetime}
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
              onBlur={() => handleFieldBlur("vehicle")}
              required
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              error={touched.vehicle && errors.vehicle}
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Gratuity */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "grey.900",
                fontSize: "0.95rem",
                mb: 0.5,
              }}
            >
              Gratuity
            </Typography>
            <TextField
              select
              name="gratuity"
              value={form.gratuity}
              onChange={handleChange}
              onBlur={() => handleFieldBlur("gratuity")}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: false }}
              error={touched.gratuity && errors.gratuity}
            >
              {gratuityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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

          {/* Fare Estimation Card */}
          {form.vehicle && form.pickup && form.dropoff && (
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                mt: 2,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AttachMoneyIcon sx={{ fontSize: 28, mr: 1 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", sm: "1.3rem" },
                    }}
                  >
                    Estimated Fare
                  </Typography>
                </Box>

                {isCalculatingFare ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 3,
                    }}
                  >
                    <CircularProgress
                      size={24}
                      sx={{ color: "white", mr: 2 }}
                    />
                    <Typography sx={{ fontWeight: 500 }}>
                      Calculating fare...
                    </Typography>
                  </Box>
                ) : fareEstimate ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                        Total Fare
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.5rem", sm: "1.8rem" },
                          color: "#ffd700",
                        }}
                      >
                        ${fareEstimate?.totalFare?.toFixed(2)}
                      </Typography>
                    </Box>

                    <Divider
                      sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", my: 2 }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <DirectionsCarIcon sx={{ fontSize: 20, mr: 1 }} />
                          <Typography sx={{ fontWeight: 500 }}>
                            {fareEstimate.vehicle}
                          </Typography>
                        </Box>
                        <Chip
                          label={`$${fareEstimate.baseFare.toFixed(2)}`}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      {fareEstimate.gratuityAmount > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AttachMoneyIcon sx={{ fontSize: 20, mr: 1 }} />
                            <Typography sx={{ fontWeight: 500 }}>
                              Gratuity (
                              {
                                gratuityOptions.find(
                                  (g) => g.value === form.gratuity
                                )?.label
                              }
                              )
                            </Typography>
                          </Box>
                          <Chip
                            label={`$${fareEstimate.gratuityAmount.toFixed(2)}`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.2)",
                              color: "white",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <StraightenIcon sx={{ fontSize: 20, mr: 1 }} />
                          <Typography sx={{ fontWeight: 500 }}>
                            Distance
                          </Typography>
                        </Box>
                        <Chip
                          label={`${fareEstimate?.distance?.toFixed(1)} mi`}
                          size="small"
                          sx={{
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Box>

                      {fareEstimate.distance > 20 && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocationOnIcon sx={{ fontSize: 20, mr: 1 }} />
                            <Typography sx={{ fontWeight: 500 }}>
                              Extra Miles (after 20 mi)
                            </Typography>
                          </Box>
                          <Chip
                            label={`$${fareEstimate.perMileRate}/mi`}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255, 255, 255, 0.2)",
                              color: "white",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          opacity: 0.9,
                          textAlign: "center",
                        }}
                      >
                        💡 Base fare includes first 20 miles. Additional miles
                        charged at ${fareEstimate.perMileRate}/mi
                        {fareEstimate.gratuityAmount > 0 && (
                          <span>
                            {" "}
                            • Gratuity:{" "}
                            {
                              gratuityOptions.find(
                                (g) => g.value === form.gratuity
                              )?.label
                            }
                          </span>
                        )}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Typography sx={{ textAlign: "center", py: 2 }}>
                    Unable to calculate fare. Please check your addresses.
                  </Typography>
                )}
              </CardContent>
            </MotionCard>
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
