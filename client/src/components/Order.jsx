import React, { useState } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



const API_KEY = "";

function Order() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    carMake: '',
    carModel: '',
    carYear: '',
    dateTime: new Date(),
    location: { lat: 40.7128, lng: -74.0060 },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateTime: date });
  };

  const handleClickMap = (e) => {
    setFormData({
      ...formData,
      location: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    });
  };

  const handleSubmit = () => {
    // Save the order to the database
    console.log("Form Data:", formData);
  };

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter = {
    lat: formData.location.lat,
    lng: formData.location.lng,
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Car Wash Detailing Order
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Car Make"
              name="carMake"
              value={formData.carMake}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Car Model"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Car Year"
              name="carYear"
              value={formData.carYear}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                fullWidth
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                label="Wash Date"
                name="washDate"
                value={formData.dateTime}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </form>
      <Typography variant="h6" align="center" gutterBottom>
        Car Location
      </Typography>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={11}
          onClick={handleClickMap}
        >
          <Marker position={formData.location} />
        </GoogleMap>
      </LoadScript>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={handleSubmit}
      >
        Save Order
      </Button>
    </>
  );
}

export default Order;