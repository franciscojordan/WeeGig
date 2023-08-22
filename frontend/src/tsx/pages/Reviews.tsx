import * as React from "react";

import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Chip, Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import Rating from "@mui/material/Rating";

function Reviews() {
  const [cookies] = useCookies(["user"]);
  const [jobs, setJobs] = useState([]);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});

  const user = cookies.user;

  // Manejar la calificación para un usuario específico
  const handleRatingChange = (userId, newValue) => {
    setRatings((prevRatings) => ({ ...prevRatings, [userId]: newValue }));
  };

  // Manejar el cambio en el área de texto de reseña para un usuario específico
  const handleReviewChange = (userId, event) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [userId]: event.target.value,
    }));
  };

  // TODO: Implementar la función para enviar la reseña a tu API/backend
  const handleSendReview = (userId) => {
    const rating = ratings[userId];
    const review = reviews[userId];
    // Aquí envías `rating` y `review` a tu backend/API
  };

  useEffect(() => {
    if (user && user.userType === "Employer") {
      fetch(`http://localhost:8080/jobs/employer/${user.idUser}`)
        .then((response) => response.json())
        .then(async (data) => {
          const now = new Date();
          const validJobs = data.filter((job) => {
            const jobSchedule = new Date(job.schedule);
            return now - jobSchedule >= 24 * 60 * 60 * 1000;
          });

          for (let job of validJobs) {
            if (job.status === "close") {
              const response = await fetch(
                `http://localhost:8080/job-applications/job/${job.idJobOffers}`
              );
              const applications = await response.json();
              job.acceptedApplications = applications.filter(
                (app) => app.applicationStatus === "accepted"
              );

              for (let acceptedApp of job.acceptedApplications) {
                const userResponse = await fetch(
                  `http://localhost:8080/users/search?id=${acceptedApp.userId}`
                );
                const userDetails = await userResponse.json();
                acceptedApp.userName = userDetails.name; // Suponiendo que el objeto de respuesta tiene una propiedad 'name'
              }
            }
          }

          setJobs(validJobs);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        });
    }
  }, [cookies.user]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Reseñas por realizar
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job.idJobOffers}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {job.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  ID: {job.idJobOffers}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Fecha: {job.schedule}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Status: {job.status}
                </Typography>
                {job.acceptedApplications && (
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Aceptados:
                    </Typography>
                    {job.acceptedApplications.map((app) => (
                      <div key={app.userId}>
                        <Avatar>{user.name.charAt(0)}</Avatar>
                        <Chip
                          label={app.userName}
                          variant="outlined"
                          style={{ marginRight: "8px", marginBottom: "8px" }}
                        />
                        <Rating
                          name={`rating-${app.userId}`}
                          value={ratings[app.userId] || 0}
                          onChange={(event, newValue) =>
                            handleRatingChange(app.userId, newValue)
                          }
                        />
                        <TextField
                          label="Añadir reseña"
                          variant="outlined"
                          multiline
                          rows={3}
                          value={reviews[app.userId] || ""}
                          onChange={(event) =>
                            handleReviewChange(app.userId, event)
                          }
                          style={{
                            marginTop: "8px",
                            marginBottom: "8px",
                            width: "100%",
                          }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleSendReview(app.userId)}
                        >
                          Enviar
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Reviews;
