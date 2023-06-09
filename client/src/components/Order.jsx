import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import OrderLookUp from "../apis/OrderLookUp";
import { toast } from "react-toastify";
import PackageInfo from "../apis/PackageInfo";

import {
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import "./Order.css"

function Order() {

  const [selectedPackage, setSelectedPackage] = useState([]);
  const [packages, setPackages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    carMake: "",
    carModel: "",
    carYear: "",
    package: "",
    dateTime: new Date(),
    lat: null,
    lng: null,
    jwt: localStorage.getItem("token"),
  });

  const fetchPackages = async () => {
    try {
      const response = await PackageInfo.getPackages();
      const packages = response.data;
      setPackages(packages);
      // setSelectedPackage(packages[0].id);
    } catch (err) {
      toast.error("Error fetching packages");
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateTime: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = { ...formData, 
                    packageId: selectedPackage };
      const response = await OrderLookUp.post("/auth/order", body, {
        headers: { token: localStorage.token }
      });

      if(response.data){
        toast.success("Order placed successfully")
        window.location.href = "/"
      } else {
        toast.error(response.data)
        // console.error(response.data)
      }
    } catch (err) {
      toast.error(err.response.data);
      console.error(err.message);
    }
    // console.log("Form Data:", formData);
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setFormData({ ...formData, lat, lng });
      },
    });

    return formData.lat === null ? null : (
      <Marker position={{ lat: formData.lat, lng: formData.lng }} />
    );
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".15rem",
          color: "white",
          textDecoration: "none",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingLeft: "20px",
        }}
      >
        Order
      </Typography>
      <form>
        <Grid 
          className="transparent-card"
          container
          spacing={2}
          style={{ paddingLeft: "20px", paddingRight: "20px"}}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // InputProps={{
              //   style: {
              //     color: "white",
              //     // backgroundColor: "white",
              //   },
              // }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              // InputProps={{
              //   style: {
              //     color: "white",
              //   },
              // }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Car Make"
              name="carMake"
              value={formData.carMake}
              onChange={handleChange}
              // InputProps={{
              //   style: {
              //     color: "white",
              //   },
              // }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Car Model"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              // InputProps={{
              //   style: {
              //     color: "white",
              //   },
              // }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Car Year"
              name="carYear"
              value={formData.carYear}
              onChange={handleChange}
              // InputProps={{
              //   style: {
              //     color: "white",
              //   },
              // }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Package</InputLabel>
            <Select
              fullWidth
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              inputProps={{
                name: "package",
                id: "package-select",
                style: {
                  color: "white",
              },
            }}
            >
            {packages.map((pkg) => (
              <MenuItem key={pkg.package_id} value={pkg.package_id}>
                {pkg.package_name}
              </MenuItem>
            ))}
            </Select>
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
                InputProps={{
                  style: {
                    color: "white",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <MapContainer
              center={{ lat: 54.675761, lng: 25.281944 }}
              zoom={13}
              style={{ height: 500, width: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationMarker />
            </MapContainer>
          </Grid>
        </Grid>
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px"
        }}
      >
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Save Order
        </Button>
      </div>
    </>
  );
}

export default Order;
