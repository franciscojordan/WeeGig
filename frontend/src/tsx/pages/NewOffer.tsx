import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../../css/components/Boxs.css";
import { useCookies } from "react-cookie";
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';
import { Autocomplete } from "@mui/material";
import getGoogleMapsApiClient from "../../../lib/googleApiClient";
import { setHours, setMinutes, subHours } from 'date-fns';
import { Google } from "@mui/icons-material";
import LocationAutocomplete from '../components/LocationAutocomplete';
import "../../css/components/customDatePickerWidth.css";

const NewOffert: React.FC = () => {
  const [cookies] = useCookies(["user"]);
  const user = cookies.user;

  console.log(user);
  if (user && user["userType"] === "Employee" || !user) {
    window.location.href = "/ofertas";
  }
  const [formData, setFormData] = useState({
    title: "",
    paymentType: "",
    payment: "",
    location: "",
    schedule: "",
    description: "",
    status: "open",
    idEmployer: user ? user.idUser : "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      status: "open",
      idEmployer: user.idUser
    };

    console.log(finalData);

    fetch("http://localhost:8080/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((schedule) => {
        console.log(schedule);
        alert("Oferta enviada con éxito!");
      })
      .catch((error) => {
        console.error("Hubo un error al enviar la oferta:", error);
        alert("Hubo un error enviando la oferta. Inténtalo de nuevo.");
      });
          console.log(formData);
  };
  console.log(formData);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#A8A8A8",
      },
      secondary: {
        main: "#555",
      },
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const handleDateChange = (schedule: Date | null) => {
    setSelectedDate(schedule); // Update the selectedDate state

    // Update the formData state as well
    setFormData((prevData) => ({
      ...prevData,
      schedule: schedule ? schedule.toISOString() : "", // Convert the schedule to ISO string format
    }));
    if (schedule != null){
      schedule = subHours(schedule, 0);
    }
    const formattedTimestamp = schedule
    ? `${schedule.toISOString().slice(0, 19).replace('T', ' ')}`
    : "";
    console.log(formattedTimestamp);
  };
  
  const minDate = new Date();
  minDate.setDate(minDate.getDate());

  const filterPassedTime = (time) => {
    const selectedDate = new Date(time);

    const minTime = new Date();
    minTime.setHours(minTime.getHours() + 2);
    minTime.setMinutes(0);

    return selectedDate >= minTime;
  };

  const handleLocationSelect = (location) => {
    // Handle the selected location
    console.log('Selected location:', location);
  
    // Update the formData state
    setFormData((prevData) => ({
      ...prevData,
      location: location,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="big-box">
        <div className="small-box">
          <h1>Nueva oferta</h1>
          <p>Publica tu nueva oferta!</p>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <TextField
                name="title"
                value={formData.title}
                onChange={handleChange}
                label="Titulo"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <TextField
                name="paymentType"
                value={formData.paymentType}
                onChange={handleChange}
                label="Tipo de pago"
                variant="outlined"
                style={{ width: "48%" }}
              />
              <TextField
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                label="Pago"
                variant="outlined"
                style={{ width: "48%" }}
              />
            </div>
            
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <LocationAutocomplete
                onSelect={(newLocation) => {
                  console.log('onSelect:', newLocation);
                  handleLocationSelect(newLocation);
                  setFormData((prevData) => ({
                    ...prevData,
                    location: newLocation,
                  }));
                }}
                onLocationChange={(newLocation) => {
                  console.log('onLocationChange:', newLocation);
                  setFormData((prevData) => ({
                    ...prevData,
                    location: newLocation,
                  }));
                }}
              />
            </div>  
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                width: "100%"
              }}
            >
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                minDate={minDate}
                filterTime={filterPassedTime}
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                customInput={<TextField label="Fecha" inputProps={{ readOnly: true }} />}
                variant="outlined"
                style={{ width: "100%", maxWidth: "200%" }}
                fullWidth
              />
            </div>  
            
            <div style={{ marginTop: "10px" }}>
              <TextField
                name="description"
                value={formData.description}
                onChange={handleChange}
                label="Descripcion"
                multiline
                maxRows={4}
                variant="outlined"
                fullWidth
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <Button type="submit" variant="contained">
                Enviar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NewOffert;
