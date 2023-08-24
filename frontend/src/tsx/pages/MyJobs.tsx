import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const MyJobs: React.FC = () => {
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState({});

  const [cookies] = useCookies(["user"]);
  const user = cookies.user;

  useEffect(() => {
    fetch(`http://localhost:8080/jobs/employer/${user.idUser}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);

        data.forEach((application) => {
          fetch(`http://localhost:8080/jobs/${application.idJobOffers}`)
            .then((res) => res.json())
            .then((jobDetail) => {
              setJobDetails((prevDetails) => ({
                ...prevDetails,
                [application.idJobOffers]: jobDetail,
              }));
            });
        });
      })
      .catch((error) => console.error("Hubo un error:", error));
  }, []);

  return (
    <div className="big-box">
      <div className="small-box">
        <h1>Mis Ofertas de Trabajo</h1>
        {applications.length > 0 ? (
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: "20px",
              padding: "0",
              listStyle: "none",
            }}
          >
            {applications.map((application, index) => (
              <li
                key={index}
                style={{
                  background: "#f5f5f5",
                  borderRadius: "10px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  flex: "0 1 calc(30% - 20px)", // Ajustamos el valor de flex
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <Link
                  to={`/jobs/${application.idJobOffers}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {jobDetails[application.idJobOffers]?.title ||
                      "Cargando..."}
                  </p>
                  <p style={{ flexGrow: "1" }}>
                    {jobDetails[application.idJobOffers]?.description ||
                      "Cargando..."}
                  </p>
                  {application.status === "open" && <Chip variant="outlined" color="success" label="Abierto" />}
                  {application.status === "close" && <Chip variant="outlined" color="error" label="Cerrado" />}
                  
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aun no has ofrecido ningun empleo, ¿A que estas esperando?</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
