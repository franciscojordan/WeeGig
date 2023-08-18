import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "../../css/components/Boxs.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Chip from "@mui/material/Chip";
import DoDisturbOffIcon from "@mui/icons-material/DoDisturbOff";
import HowToRegIcon from "@mui/icons-material/HowToReg";

function RecipeReviewCard({ title, schedule, description }) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#BDBDBD" }} aria-label="recipe">
            <AssignmentIcon />
          </Avatar>
        }
        title={title}
        subheader={schedule}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Box>
  );
}

function Ofertas() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [cookies] = useCookies(["user"]);
  const user = cookies.user;

  useEffect(() => {
    async function fetchOfertas() {
      try {
        const url = "http://localhost:8080/jobs/open";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (Array.isArray(result)) {
          setJobs(result);
        } else {
          console.log("API response is not an array");
        }
      } catch (error) {
        console.error(
          "Ocurrió un error al obtener los datos de las ofertas:",
          error
        );
        alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
      }
    }
    fetchOfertas();
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/job-applications/user/${user.idUser}`)
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch((error) => console.error("Hubo un error:", error));
    }
  }, [user]);

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh"}}>
      <div style={{ maxWidth: "1040px" }}>
        <h1 style={{ textAlign: "center" }}>Ofertas Component</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px", // Espacio de separación respecto al footer
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.idJobOffers}
              style={{
                flex: "0 0 calc(25% - 20px)",
                margin: "10px",
                textAlign: "left",
                backgroundColor: "#F2F2F2",
                borderRadius: "10px",
                padding: "10px",
                minWidth: "240px",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E0E0E0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F2F2F2";
              }}
            >
              <Link to={`/jobs/${job.idJobOffers}`}>
                <RecipeReviewCard
                  title={job.title}
                  schedule={job.schedule}
                  description={job.description}
                />
              </Link>
              <div style={{ textAlign: "center" }}>
                {applications.some(
                  (app) =>
                    app.jobId === job.idJobOffers &&
                    app.applicationStatus === "Applied"
                ) && (
                  <Chip
                    icon={<HourglassTopIcon />}
                    label="En espera"
                    variant="outlined"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ofertas;
