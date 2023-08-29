import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Chip, Grid } from "@mui/material";
import { TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import Rating from "@mui/material/Rating";

function ReviewsEmployer() {
  const [cookies] = useCookies(["user"]);
  const [jobs, setJobs] = useState([]);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [sentReviews, setSentReviews] = useState({});
  const [successfulReviews, setSuccessfulReviews] = useState({});

  const user = cookies.user;

  const [existingReviews, setExistingReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/reviews")
      .then((response) => response.json())
      .then((data) => {
        setExistingReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const hasReviewBeenGiven = (jobId, userId) => {
    return existingReviews.some(
      (review) =>
        review.id_Reviewer === user.idUser &&
        review.id_Reviewed === userId &&
        review.id_Job === jobId
    );
  };

  const handleRatingChange = (jobId, userId, newValue) => {
    const key = `${jobId}-${userId}`;
    setRatings((prevRatings) => ({ ...prevRatings, [key]: newValue }));
  };

  const handleReviewChange = (jobId, userId, event) => {
    const key = `${jobId}-${userId}`;
    setReviews((prevReviews) => ({
      ...prevReviews,
      [key]: event.target.value,
    }));
  };

  const handleSendReview = (jobId, userId) => {
    const key = `${jobId}-${userId}`;
    const rating = ratings[key] || 1;

    const review = reviews[key];

    const reviewData = {
      idReviews: null,
      reviewTitle: review,
      reviewContent: review,
      rating: rating,
      idReviewer: user.idUser,
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
          return response.text().then((text) => Promise.reject(text));
        }
        return response.json();
      })
      .then((data) => {
        setSuccessfulReviews((prev) => ({
          ...prev,
          [`${jobId}-${userId}`]: true,
        }));
      })
      .catch((error) => {
        console.error("Hubo un error al enviar la reseña:", error);
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
            return now - jobSchedule >= 1;
            // return now - jobSchedule >= 24 * 60 * 60 * 1000;
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
                acceptedApp.userName = userDetails.name;
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
            .filter((job) => job.acceptedApplications)
            .filter((job) =>
              job.acceptedApplications.some(
                (app) =>
                  !successfulReviews[`${job.idJobOffers}-${app.userId}`] &&
                  !hasReviewBeenGiven(job.idJobOffers, app.userId)
              )
            )
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

                    {job.acceptedApplications && (
                      <div>
                        <Typography variant="subtitle1" gutterBottom>
                          Aceptados:
                        </Typography>
                        {job.acceptedApplications.map((app) => {
                          const key = `${job.idJobOffers}-${app.userId}`;

                          if (successfulReviews[key]) {
                            return (
                              <Typography key={`success-${key}`}>
                                Reseña enviada correctamente
                              </Typography>
                            );
                          }
                          if (
                            !sentReviews[key] &&
                            !hasReviewBeenGiven(job.idJobOffers, app.userId)
                          ) {
                            return (
                              <div key={app.userId}>
                                <Avatar>{user.name.charAt(0)}</Avatar>
                                <Chip
                                  label={app.userName}
                                  variant="outlined"
                                  style={{
                                    marginRight: "8px",
                                    marginBottom: "8px",
                                  }}
                                />
                                <Rating
                                  name={`rating-${job.idJobOffers}-${app.userId}`}
                                  value={ratings[key] || 1}
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
                                  value={reviews[key] || ""}
                                  onChange={(event) =>
                                    handleReviewChange(
                                      job.idJobOffers,
                                      app.userId,
                                      event
                                    )
                                  }
                                  error={
                                    reviews[key] && reviews[key].length < 10
                                  }
                                  helperText={
                                    reviews[key] && reviews[key].length < 10
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
                                    !reviews[key] || reviews[key].length < 10
                                  }
                                  onClick={() =>
                                    handleSendReview(
                                      job.idJobOffers,
                                      app.userId
                                    )
                                  }
                                  style={{
                                    backgroundColor: "#A8A8A8",
                                    color: "white",
                                  }}
                                >
                                  Enviar reseña
                                </Button>
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default ReviewsEmployer;
