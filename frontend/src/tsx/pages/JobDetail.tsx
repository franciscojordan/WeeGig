import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";
import "../../css/components/Boxs.css";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const handleStatusChange = (applicationId, status) => {
  const updateData = {
    applicationId: applicationId,
    status: status,
  };

  fetch("http://localhost:8080/job-applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Estado actualizado con éxito");
      // Aquí puedes actualizar el estado local o refrescar los datos si es necesario
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

  console.log(user.idUser);

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
      applicationStatus: "Applied",
    };

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
                {jobApplications.map((application) => (
                  <div key={application.id}>
                    <Link to={`/perfil/${application.userId}`}>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                      Nombre: {userDetails[application.userId]}
                    </Link>
                    <div>
                      <Button
                        variant="text"
                        color="success"
                        onClick={() =>
                          handleStatusChange(application.id, "accepted")
                        }
                      >
                        Aceptar
                      </Button>
                      <Button
                        variant="text"
                        color="error"
                        onClick={() =>
                          handleStatusChange(application.id, "rejected")
                        }
                      >
                        Rechazar
                      </Button>
                    </div>
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
