import React, { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import "../../css/components/Ofertas.css";


function RecipeReviewCard({title, schedule, description}) {

  return (
    <Box sx={{ maxWidth: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
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
  return (
    <>
      <h1>Ofertas Component</h1>
      <div className="box-flex">
        {jobs.map((job) => (
            <RecipeReviewCard
              title={job.title}
              schedule={job.schedule}
              description={job.description}
            />
          ))}
      </div>
    </>
  );
}

export default Ofertas;
