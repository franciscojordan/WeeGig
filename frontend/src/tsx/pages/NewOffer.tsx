import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../../css/components/Boxs.css";
import { useCookies } from "react-cookie";

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
    date: "",
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
      .then((data) => {
        console.log(data);
        alert("Oferta enviada con éxito!");
      })
      .catch((error) => {
        console.error("Hubo un error al enviar la oferta:", error);
        alert("Hubo un error enviando la oferta. Inténtalo de nuevo.");
      });
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
              <TextField
                name="location"
                value={formData.location}
                onChange={handleChange}
                label="Ubicacion"
                variant="outlined"
                style={{ width: "48%" }}
              />
              <TextField
                name="date"
                value={formData.date}
                onChange={handleChange}
                label="Fecha"
                variant="outlined"
                style={{ width: "48%" }}
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
