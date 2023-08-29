import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';
import RegisterLocationAutocomplete from '../components/RegisterLocationAutocomplete';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#A8A8A8",
    },
  },
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerPassword, setShowVerPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const [userPayload, setUserPayload] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [emailError, setEmailError] = useState(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.get("email") as string)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    
    console.log("Selected location in handleSubmit:", selectedLocation);

    const userPayload = {
      username: data.get("email"),
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("firstName"),
      surname: data.get("lastName"),
      docType: parseInt(data.get("tipeOfDocument") as string),
      document: data.get("document"),
      phoneNumber: data.get("phone"),
      birthdate: selectedDate,
      userType: checked ? "Employer" : "Employee",
      companyName: data.get("nameOfCompany"),
      companyNif: data.get("nif"),
      address: selectedLocation,
      companyPhoneNumber: data.get("numberOfCompany"),
      website: data.get("website")
    };

    console.log(userPayload);

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPayload),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("Usuario registrado con éxito!");
        setRegistrationSuccess(true);
        
        // Redirigir después de 5 segundos
        setTimeout(() => {
            window.location.href = "/login/";
        }, 2000);
      } else {
        console.error("Error al registrar:", data.message);
        setRegistrationSuccess(false);
      }
    })
    .catch(error => {
      console.error("Error al enviar los datos:", error);
      setRegistrationSuccess(false);
    });
  };

  // ... (resto de tu código, como handleChange y el componente renderizado)
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("2005-08-31")
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Update the selectedDate state
  };

  const handleLocationSelect = (location) => {
    console.log('Selected location:', location);
    setSelectedLocation(location); // Update selectedLocation
  };
  
  const handleLocationChange = (newLocation) => {
    console.log('Location changed:', newLocation);
    setSelectedLocation(newLocation); // Update selectedLocation
  };
  

  return (
    <div className="big-box">
      <div className="contact-us">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Regístrate
              </Typography>
              {registrationSuccess && <Alert severity="success">Registrado correctamente</Alert>}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      fullWidth
                      id="firstName"
                      label="Nombre"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label="Apellidos"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Tipo de documento
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        name="tipeOfDocument"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>DNI</MenuItem>
                        <MenuItem value={2}>NIE</MenuItem>
                        <MenuItem value={3}>Pasaporte</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="document"
                      label="Documento"
                      name="document"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="phone"
                      fullWidth
                      id="phone"
                      label="Número de teléfono"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd"
                      customInput={<TextField label="Fecha de nacimiento" inputProps={{ readOnly: true }}/>}
                      maxDate={new Date("2005-08-31")}
                      showYearDropdown
                      showMonthDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={50}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={emailError}
                      helperText={
                        emailError ? "Correo electrónico inválido." : ""
                      }
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Correo Electrónico"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="verPassword"
                      label="Verificar contraseña"
                      type={showVerPassword ? "text" : "password"}
                      id="verPassword"
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle verification password visibility"
                              onClick={() =>
                                setShowVerPassword(!showVerPassword)
                              }
                            >
                              {showVerPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12}>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        style={{
                          textAlign: "center",
                          paddingLeft: "20px",
                          paddingTop: "20px",
                        }}
                      >
                        <FormLabel id="demo-radio-buttons-group-label">
                          ¿Quieres ofrecer trabajo?
                        </FormLabel>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "30px",
                          }}
                        >
                          <Switch
                            checked={checked}
                            onChange={handleChange2}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </div>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                  {checked && (
                    <>
                      <Alert
                        severity="info"
                        style={{ margin: "0 auto", maxWidth: "600px" }}
                      >
                        Al ofrecer trabajo, te estas negando a poder aplicar a estos. Los campos de abajo no son obligatorios por ahora. Podríamos requerir más información en el futuro.
                      </Alert>

                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="nameOfCompany"
                          fullWidth
                          id="nameOfCompany"
                          label="Nombre de compañia"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="nif"
                          label="NIF"
                          name="nif"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="numberOfCompany"
                          label="Número de teléfono"
                          name="numberOfCompany"
                          autoComplete="family-name"
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <RegisterLocationAutocomplete
                        onSelect={handleLocationSelect}
                        onLocationChange={handleLocationChange}
                        selectedLocation={selectedLocation}
                      />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="website"
                          fullWidth
                          id="website"
                          label="Pagina web"
                          autoFocus
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, color: "white" }}
                >
                  Registrate
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="./Login" variant="body2">
                      ¿Ya tienes una cuenta? Inicia sesion
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
