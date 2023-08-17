import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {""}
      <Link color="inherit" href="./Home.tsx  "></Link>{" "}
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

export default function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [showAlert, setShowAlertErrorEmail] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  

  const navigate = useNavigate();
  const username = Cookies.get("username");

  React.useEffect(() => {
    if (username) {
      window.location.href = "/ofertas"; // Navega a la página y recarga
    }
  }, [username, navigate]); // Dependencias del efecto

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString() || "";
    const password = data.get("password")?.toString() || "";
    const rememberMe = data.get("remember") === "on"; // Verifica si el checkbox está seleccionado

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);

    try {
      const url = "http://localhost:8080/authentication";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log("POST DONE");
      const result = await response.json();
      if (result["status"] == "success") {
        Cookies.set("user", JSON.stringify(result["user"]), {
          expires: rememberMe ? 30 : undefined,
        });
        console.log("GUARDADO EN COOKIES == " + result["user"]);
        setShowAlertErrorEmail(false);
        setShowSuccessAlert(true);
        window.location.href = '/ofertas';
      } else {
        setShowAlertErrorEmail(true);
        setShowSuccessAlert(false);
      }
    } catch (error) {
      console.error("Ocurrió un error al autenticar:", error);
      alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };


  return (
    <div className="box-contact">
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
            Iniciar sesión
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
            error={emailError}
            helperText={emailError ? "Correo electrónico inválido." : ""}
            margin="normal"
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
                      {showAlert && (
            <Alert severity="error">Correo electrónico o contraseña incorrectos.</Alert>
          )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }} // Agregar color: "white"
            >
              Ingresar
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Has olvidado tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="./registrar" variant="body2">
                  {"¿No tienes una cuenta? Crea tu cuenta"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    </div>
  );
}
