import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DoDisturbOffIcon from "@mui/icons-material/DoDisturbOff";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function MyOfferts() {
  const [applications, setApplications] = useState([]);

  const [cookies] = useCookies(["user"]);
  const user = cookies.user;

  if (user && user["userType"] === "Employer") {
    window.location.href = "/nueva-oferta";
  }

  useEffect(() => {
    fetch(`http://localhost:8080/job-applications/user/${user.idUser}`)
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Hubo un error:", error));
    }, []);
    

  return (
    <div className="big-box">
      <div className="small-box">
        <h1>Mis Ofertas</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "20px", maxWidth: "1200px", margin: "0 auto" }}>
          {applications.length > 0 ? (
            <ul style={{ padding: "0", listStyle: "none" }}>
              {applications.map((application, index) => (
                <li key={index} style={{ background: "#f5f5f5", borderRadius: "10px", padding: "10px", border: "1px solid #ccc", flex: "0 1 calc(30% - 20px)", marginBottom: "20px", display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <Link to={`/jobs/${application.jobId}`}>
                    <p>{`Trabajo ID: ${application.jobId}`}</p>
                    <p>{`Fecha de aplicación: ${application.applicationDate}`}</p>
                    {application.applicationStatus === "applied" && <Chip icon={<HourglassTopIcon />} label="En espera" variant="outlined" />}
                    {application.applicationStatus === "accepted" && <Chip icon={<HowToRegIcon />} label="Aceptado" variant="outlined" />}
                    {application.applicationStatus === "rejected" && <Chip icon={<DoDisturbOffIcon />} label="Rechazado" variant="outlined" />}
                    {application.applicationStatus === "done" && <Chip icon={<DoneIcon />} label="Trabajo realizado" variant="outlined" />}

                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay aplicaciones disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOfferts;
