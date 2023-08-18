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
        {applications.length > 0 ? (
          <ul>
            {applications.map((application, index) => (
              <div key={index}>
                <Link to={`/jobs/${application.jobId}`}>
                  <p>{`Trabajo ID: ${application.jobId}`}</p>
                  <p>{`Fecha de aplicación: ${application.applicationDate}`}</p>
                  {application.applicationStatus === "Pending" && <Chip icon={<HourglassTopIcon />} label="En espera" variant="outlined"/>}

                </Link>
                <Stack direction="row" spacing={1}>
                  <Chip icon={<HourglassTopIcon />} label="En espera" />
                  <Chip icon={<HowToRegIcon />} label="Aceptado" />
                  <Chip icon={<DoDisturbOffIcon />} label="Rechazado" />
                  <Chip icon={<DoneIcon />} label="Trabajo realizado" />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip
                    icon={<HourglassTopIcon />}
                    label="En espera"
                    variant="outlined"
                  />
                  <Chip
                    icon={<HowToRegIcon />}
                    label="Aceptado"
                    variant="outlined"
                  />
                  <Chip
                    icon={<DoDisturbOffIcon />}
                    label="Rechazado"
                    variant="outlined"
                  />
                  <Chip
                    icon={<DoneIcon />}
                    label="Trabajo realizado"
                    variant="outlined"
                  />
                </Stack>
              </div>
            ))}
          </ul>
        ) : (
          <p>No hay aplicaciones disponibles.</p>
        )}
      </div>
    </div>
  );
}

export default MyOfferts;
