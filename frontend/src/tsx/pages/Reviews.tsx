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
  const [sentReviews, setSentReviews] = useState({});

  const user = cookies.user;

  // Manejar la calificación para un usuario específico
  const handleRatingChange = (jobId, userId, newValue) => {
    const key = `${jobId}-${userId}`;
    setRatings((prevRatings) => ({ ...prevRatings, [key]: newValue }));
  };

  // Manejar el cambio en el área de texto de reseña para un usuario específico
  const handleReviewChange = (jobId, userId, event) => {
    const key = `${jobId}-${userId}`;
    setReviews((prevReviews) => ({
      ...prevReviews,
      [key]: event.target.value,
    }));
  };

  // TODO: Implementar la función para enviar la reseña a tu API/backend
  const handleSendReview = (jobId, userId) => {
    const key = `${jobId}-${userId}`;
    const rating = ratings[key];
    const review = reviews[key];

    const reviewData = {
      idReviews: null, // Si tienes autoincremento en la base de datos
      reviewTitle: review,
      reviewContent: review,
      rating: rating,
      idReviewer: user.idUser, // Suponiendo que la cookie `user` tiene un idUser
      idReviewed: userId,
      idJob: jobId,
      reviewDate: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:8080/reviews/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (!response.ok) {
          // Si hay un error, obtener el mensaje de error del cuerpo de la respuesta
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json(); // Si todo está bien, obtener el objeto Review
      })
      .then((data) => {
        // Aquí puedes manejar el objeto Review que fue guardado
        // Por ejemplo, mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error("Hubo un error al enviar la reseña:", error);
        // Aquí puedes mostrar el mensaje de error en tu UI
      });
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
                    {job.acceptedApplications.map((app) =>
                      !sentReviews[`${job.idJobOffers}-${app.userId}`] ? (
                        <div key={app.userId}>
                          <Avatar>{user.name.charAt(0)}</Avatar>
                          <Chip
                            label={app.userName}
                            variant="outlined"
                            style={{ marginRight: "8px", marginBottom: "8px" }}
                          />
                          <Rating
                            name={`rating-${job.idJobOffers}-${app.userId}`}
                            value={
                              ratings[`${job.idJobOffers}-${app.userId}`] || 1
                            }
                            onChange={(event, newValue) =>
                              handleRatingChange(
                                job.idJobOffers,
                                app.userId,
                                newValue
                              )
                            }
                          />
                          <TextField
                            label="Añadir reseña"
                            variant="outlined"
                            multiline
                            rows={3}
                            value={
                              reviews[`${job.idJobOffers}-${app.userId}`] || ""
                            }
                            onChange={(event) =>
                              handleReviewChange(
                                job.idJobOffers,
                                app.userId,
                                event
                              )
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
                            onClick={() =>
                              handleSendReview(job.idJobOffers, app.userId)
                            }
                          >
                            Enviar reseña
                          </Button>
                        </div>
                      ) : null
                    )}
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
