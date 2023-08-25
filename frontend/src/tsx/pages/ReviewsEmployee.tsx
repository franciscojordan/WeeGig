import * as React from "react";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Chip, Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

function ReviewsEmployee() {
  const [cookies] = useCookies(["user"]);
  const [jobs, setJobs] = useState([]);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [sentReviews, setSentReviews] = useState({});
  const [successfulReviews, setSuccessfulReviews] = useState({});
  const user = cookies.user;
  const [existingReviews, setExistingReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/reviews`)
      .then((response) => response.json())
      .then((allReviews) => {
        // Filtramos para obtener solo las reseñas del usuario actual
        const userReviews = allReviews.filter(
          (review) => review.id_Reviewer === user.idUser
        );
        setExistingReviews(userReviews);
      });
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/job-applications/user/${user.idUser}`)
        .then((response) => response.json())
        .then(async (applications) => {
          // 1. Mapea cada oferta de trabajo a una promesa de fetch
          const jobDetailsPromises = applications.map((application) =>
            fetch(`http://localhost:8080/jobs/${application.jobId}`).then(
              (resp) => resp.json()
            )
          );

          // 2. Usa Promise.all para esperar a todas las promesas
          const jobDetails = await Promise.all(jobDetailsPromises);
          console.log("JOB DETAILS", jobDetails);
          setJobs(jobDetails);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation:",
            error.message
          );
        });
    }
  }, [user]);

  // Manejar la calificación para un usuario específico
  const handleRatingChange = (jobId, userId, newValue) => {
    console.log("Inside handleRatingChange:", jobId, userId, newValue);
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
    console.log("Job ID:", jobId);
    console.log("User ID:", userId);
    const key = `${jobId}-${userId}`;
    const rating = ratings[key] || 1; // Esto garantiza que si el rating es nulo o undefined, tomará el valor predeterminado 1

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
    console.log("Key:", key);
    console.log("Rating:", rating);
    console.log("Review:", review);
    console.log("Datos a enviar:", reviewData);

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
        setSuccessfulReviews((prev) => ({
          ...prev,
          [`${jobId}-${userId}`]: true,
        }));
      })
      .catch((error) => {
        console.error("Hubo un error al enviar la reseña:", error);
        // Aquí puedes mostrar el mensaje de error en tu UI
      });
  };

  return (
    <div className="big-box" style={{ backgroundColor: "#fff9f9" }}>
      <div className="small-box" style={{ padding: "5vh" }}>
        <Typography variant="h4" gutterBottom>
        Reseñas por realizar
        </Typography>
        <h4>
          Sólo puedes realizar reseñas después de 24 horas de haber culminado el
          trabajo.
        </h4>
        <Grid container spacing={3}>
          {jobs
            .filter((job) => {
              const isClosed = job.status === "close";
              const jobDate = new Date(job.schedule);
              const currentDate = new Date();
              const timeDifference = currentDate - jobDate;
              const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
              const isMoreThan24Hours = timeDifference > oneDayInMilliseconds;
              return isClosed && isMoreThan24Hours;
            })
            .filter((job) => {
              // Agregamos esta verificación: si la reseña ha sido enviada exitosamente, no mostramos el contenido.
              const key = `${job.idJobOffers}-${job.idEmployer}`;
              return !successfulReviews[key];
            })
            .filter((job) => {
              return !existingReviews.some(
                (review) => review.id_Job === job.idJobOffers
              );
            })
            .map((job) => (
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
                    <div key={job.idEmployer}>
                      <Rating
                        name={`rating-${job.idJobOffers}-${job.idEmployer}`}
                        value={
                          ratings[`${job.idJobOffers}-${job.idEmployer}`] || 1
                        }
                        onChange={(event, newValue) =>
                          handleRatingChange(
                            job.idJobOffers,
                            job.idEmployer,
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
                          reviews[`${job.idJobOffers}-${job.idEmployer}`] || ""
                        }
                        onChange={(event) =>
                          handleReviewChange(
                            job.idJobOffers,
                            job.idEmployer,
                            event
                          )
                        }
                        error={
                          reviews[`${job.idJobOffers}-${job.idEmployer}`] &&
                          reviews[`${job.idJobOffers}-${job.idEmployer}`]
                            .length < 10
                        }
                        helperText={
                          reviews[`${job.idJobOffers}-${job.idEmployer}`] &&
                          reviews[`${job.idJobOffers}-${job.idEmployer}`]
                            .length < 10
                            ? "La reseña debe tener al menos 10 caracteres"
                            : ""
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
                        disabled={
                          !reviews[`${job.idJobOffers}-${job.idEmployer}`] ||
                          reviews[`${job.idJobOffers}-${job.idEmployer}`]
                            .length < 10
                        }
                        onClick={() =>
                          handleSendReview(job.idJobOffers, job.idEmployer)
                        }
                        style={{ backgroundColor: "#A8A8A8", color: "white" }} // Cambia el color del fondo y el color del texto
                      >
                        Enviar reseña
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default ReviewsEmployee;
