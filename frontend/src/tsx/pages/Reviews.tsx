import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";

function Reviews(){
    const [cookies] = useCookies(["user"]);
    const [reviews, setReviews] = useState(null);
    const user = cookies.user;
  
  
    useEffect(() => {
      if (user) {
        fetch(`http://localhost:8080/reviews?to=${user.idUser}`)
          .then((res) => res.json())
          .then((data) => setReviews(data))
          .catch((error) => console.error(error));
      }
    }, [user]);
    return (
        <div>
            <h2>Trabajos pendientes de hacer reseña</h2>
            <h2>Reseñas</h2>
                          {reviews ? (
                reviews.map((review) => (
                  <div key={review.id}>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <h4>{review.reviewTitle}</h4>
                    <p>{review.reviewContent}</p>
                    <p>{review.reviewerName}</p>
                  </div>
                ))
              ) : (
                <p>Cargando reseñas...</p>
              )}
        </div>
    )
}

export default Reviews;