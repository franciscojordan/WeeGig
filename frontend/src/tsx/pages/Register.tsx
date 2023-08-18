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
  const [emailError, setEmailError] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.get("email"))) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });
    console.log(data);
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
                Regístrate
              </Typography>
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
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
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
