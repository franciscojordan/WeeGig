import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../../css/components/Boxs.css";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
    console.log(formData);
    alert("Mensaje enviado!");
  };

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

  return (
    <ThemeProvider theme={theme}>
      <div className="big-box">
        <div className="small-box">
          <h1>Contáctanos</h1>
          <p>
            Si tienes alguna pregunta o inquietud, no dudes en enviarnos un
            mensaje.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                label="Nombre"
                variant="outlined"
                style={{ width: "48%" }}
              />
              <TextField
                name="email"
                value={formData.email}
                onChange={handleChange}
                label="Email"
                variant="outlined"
                style={{ width: "48%" }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <TextField
                name="message"
                value={formData.message}
                onChange={handleChange}
                label="Mensaje"
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

export default ContactUs;
