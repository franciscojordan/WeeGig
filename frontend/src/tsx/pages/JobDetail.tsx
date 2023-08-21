import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";
import "../../css/components/Boxs.css";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import DoDisturbOffIcon from "@mui/icons-material/DoDisturbOff";
import HowToRegIcon from "@mui/icons-material/HowToReg";
// import { useNavigate } from "react-router-dom";

function JobDetail() {
  // const navigate = useNavigate();

  const [cookies] = useCookies(["user"]);
  const [userDetails, setUserDetails] = useState({});

  const user = cookies.user;
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [hasApplied, setHasApplied] = useState(false);
  const [jobOffer, setJobOffer] = useState(null);

  //   useEffect(() => {
  //     if (!user || !user.idUser) {
  //         navigate("/ofertas");
  //     }
  // }, [user, navigate]);

  const handleCloseJobProcess = () => {
    fetch(`http://localhost:8080/jobs/${id}/close`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Proceso de selección terminado:", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleStatusChange = (userId, jobId, status) => {
    if (user && user.idUser) {
      fetch(
        `http://localhost:8080/job-applications?userId=${userId}&jobId=${jobId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicationStatus: status }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Datos enviados a la API:", data);
          console.log("Estado actualizado con éxito");

          setJobApplications((prevApplications) =>
            prevApplications.map((app) =>
              app.userId === userId && app.jobId === jobId
                ? { ...app, applicationStatus: status }
                : app
            )
          );
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setJobOffer(data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    if (user && user.idUser) {
      fetch(`http://localhost:8080/job-applications/user/${user.idUser}`)
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);
          const alreadyApplied = data.some((app) => app.jobId === parseInt(id));
          setHasApplied(alreadyApplied);
        })
        .catch((error) => console.error("Hubo un error:", error));
    }
  }, [user, id]);

  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/job-applications/job/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setJobApplications(data);
        data.forEach((application) => {
          fetch(`http://localhost:8080/users/search?id=${application.userId}`)
            .then((response) => response.json())
            .then((userData) => {
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                [application.userId]: userData.name,
              }));
            })
            .catch((error) =>
              console.error("Error fetching user details:", error)
            );
        });
      })
      .catch((error) =>
        console.error("Error al cargar las aplicaciones:", error)
      );
  }, [id]);

  const handleApply = () => {
    if (user && user.idUser) {
    const applicationData = {
      userId: user.idUser,
      jobId: parseInt(id),
      applicationDate: new Date().toISOString(),
      applicationStatus: "applied",
    };
    console.log("Datos enviados a la API:", applicationData);
    fetch("http://localhost:8080/job-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((response) => response.json())
      .then((data) => {
        setHasApplied(true);
      })
      .catch((error) => console.error("Error:", error));
    }
  };

  const hasAcceptedUsers = jobApplications.some(
    (application) => application.applicationStatus === "accepted"
  );
  return (
    <div className="big-box">
      <div className="small-box">
        {jobOffer ? (
          <div
            style={{
              background: "#f5f5f5", // Cambiar al color deseado
              borderRadius: "10px",
              padding: "20px",
              border: "1px solid #ccc",
              maxWidth: "800px",
              margin: "20px auto",
              textAlign: "left",
              display: "grid",
              gridTemplateColumns: "2fr 1fr", // Ajusta el ancho de las columnas
              columnGap: "20px", // Ajusta el espacio entre las columnas
              alignItems: "start", // Alinea contenido arriba
            }}
          >
            <div>
              <h1>{jobOffer.title}</h1>
              <p>
                <strong>Descripción:</strong> {jobOffer.description}
              </p>
              <p>
                <strong>Tipo de Pago:</strong> {jobOffer.paymentType}
              </p>
              <p>
                <strong>Pago:</strong> {jobOffer.payment}
              </p>
              <p>
                <strong>Ubicación:</strong> {jobOffer.location}
              </p>
              <p>
                <strong>Horario:</strong>{" "}
                {new Date(jobOffer.schedule).toLocaleString()}
              </p>
              <p>
                <strong>Categoría:</strong> {jobOffer.category}
              </p>
              <p>
                <strong>ID del Empleador:</strong> {jobOffer.idEmployer}
              </p>
              {user && user["userType"] === "Employee" && !hasApplied && (
                <div style={{ textAlign: "right" }}>
                  <Button
                    variant="outlined"
                    style={{
                      color: "#ffffff", // Cambia el color del texto
                      backgroundColor: "#A8A8A8", // Cambia el color de fondo
                      borderColor: "#A8A8A8", // Cambia el color del borde
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}
                    className="hover-button"
                    onClick={handleApply}
                  >
                    Aplicar
                  </Button>
                </div>
              )}
            </div>
            {jobOffer.idEmployer === user.idUser && (
              <div>
                <h2>Usuarios que han aplicado ({jobApplications.length}):</h2>
                {jobApplications.map((application, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center" }}>
                    <Link to={`/perfil/${application.userId}`}>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                      Nombre: {userDetails[application.userId]}
                    </Link>
                    {application.applicationStatus === "applied" ? (
                      <div style={{ marginLeft: "10px" }}>
                        <Button
                          variant="text"
                          color="success"
                          onClick={() =>
                            handleStatusChange(
                              application.userId,
                              application.jobId,
                              "accepted"
                            )
                          }
                        >
                          Aceptar
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() =>
                            handleStatusChange(
                              application.userId,
                              application.jobId,
                              "rejected"
                            )
                          }
                        >
                          Rechazar
                        </Button>
                      </div>
                    ) : (
                      <div style={{ displey: "flex" }}>
                        <div style={{ marginLeft: "10px" }}>
                        {application.applicationStatus === "rejected" && (
                          <Chip
                            icon={<DoDisturbOffIcon />}
                            label="Rechazado"
                            variant="outlined"
                          />
                        )}
                        {application.applicationStatus === "accepted" && (
                          <Chip
                            icon={<HowToRegIcon />}
                            label="Aceptado"
                            variant="outlined"
                          />
                        )}
                      </div>
                      </div>
                    )}
                  </div>
                ))}
                {jobOffer.idEmployer === user.idUser && hasAcceptedUsers && (
                  <Button variant="outlined" onClick={handleCloseJobProcess}>
                    Terminar proceso de seleccion
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Cargando detalles de la oferta...</p>
        )}
      </div>
    </div>
  );
}

export default JobDetail;