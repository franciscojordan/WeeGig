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

const handleStatusChange = (userId, jobId, status) => {
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

      // Actualizar el estado local
      setJobApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.userId === userId && app.jobId === jobId
            ? { ...app, applicationStatus: status }
            : app
        )
      );
    })
    .catch((error) => console.error("Error:", error));
};

function JobDetail() {
  const [cookies] = useCookies(["user"]);
  const [userDetails, setUserDetails] = useState({});
  const user = cookies.user;
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [hasApplied, setHasApplied] = useState(false);
  const [jobOffer, setJobOffer] = useState(null);

  // console.log(user.idUser);

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
        // Fetch user details for each userId
        data.forEach((application) => {
          fetch(`http://localhost:8080/users/search?id=${application.userId}`)
            .then((response) => response.json())
            .then((userData) => {
              setUserDetails((prevDetails) => ({
                ...prevDetails,
                [application.userId]: userData.name, // Assuming the userData object has a 'name' field
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
  };
  // console.log(jobOffer.idEmployer);
  return (
    <div className="big-box">
      <div className="small-box">
        {jobOffer ? (
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
              <Button variant="outlined" onClick={handleApply}>
                Aplicar
              </Button>
            )}
            {jobOffer.idEmployer === user.idUser && (
              <div>
                <h2>Usuarios que han aplicado:</h2>
                {jobApplications.map((application, index) => (
                  <div key={index}>
                    <Link to={`/perfil/${application.userId}`}>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                      Nombre: {userDetails[application.userId]}
                    </Link>
                    {application.applicationStatus === "applied" ? (
                      <div>
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
                      <div>
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
                    )}
                  </div>
                ))}
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
