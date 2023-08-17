import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../css/components/Ofertas.css";
import AssignmentIcon from '@mui/icons-material/Assignment';
import "../../css/components/Boxs.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Chip from "@mui/material/Chip";

function RecipeReviewCard({title, schedule, description}) {

  return (
    <Box sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#BDBDBD" }} aria-label="recipe"><AssignmentIcon /></Avatar>
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

function BoxSx() {
  return (
    <Box
      sx={{
        width: 600,
        height: 200,
        backgroundColor: "primary.dark",
      }}
    >
    </Box>
  );
}

function Ofertas(): JSX.Element {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [cookies] = useCookies(["user"]);
  const user = cookies.user;

  useEffect(() => {
    async function fetchOfertas() {
      try {
        const url = "http://localhost:8080/jobs";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("GET DONE");
        const result = await response.json();
        console.log(result);
        if (Array.isArray(result)) {
          console.log("pasa");
          console.log(result);
          setJobs(result);
        } else {
          console.log("API response is not an array");
        }
      } catch (error) {
        console.error("Ocurrió un error al obtener los datos de las ofertas:", error);
        alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
      }
    }
    fetchOfertas()
  }, []);

    useEffect(() => { // <--- Nuevo useEffect para obtener las aplicaciones del usuario
      if (user) {
        fetch(`http://localhost:8080/job-applications/user/${user.idUser}`)
          .then((response) => response.json())
          .then((data) => setApplications(data))
          .catch((error) => console.error("Hubo un error:", error));
      }
    }, [user]);
    




  
    return (
      <>
        <div className="big-box">
          <div className="small-box">
            <h1>Ofertas Component</h1>
            <div className="box-flex">
              {jobs.map((job) => (
                <div key={job.idJobOffers}>
                  <Link to={`/jobs/${job.idJobOffers}`}>
                    <RecipeReviewCard
                      title={job.title}
                      schedule={job.schedule}
                      description={job.description}
                    />
                  </Link>
                  {applications.some(app => app.jobId === job.idJobOffers && app.applicationStatus === "Pending") && <Chip icon={<HourglassTopIcon />} label="En espera" variant="outlined"/>}

                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default Ofertas;
