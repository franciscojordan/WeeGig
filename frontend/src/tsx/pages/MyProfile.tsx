import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";

const MyProfile = () => {
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
    <div className="big-box">
      <div className="small-box">
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            maxWidth: "700px",
            margin: "20px auto",
          }}
        >
          {user ? (
            <>
              <Avatar>{user.name.charAt(0)}</Avatar>
              <h2>
                {user.name} {user.surname}
              </h2>
              <p>
                <strong>Usuario:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Número de teléfono:</strong> {user.phone_number}
              </p>
              <p>
                <strong>Fecha de nacimiento:</strong> {user.birthdate}
              </p>
              <p>
                <strong>Nombre de compañía:</strong>{" "}
                {user.company_name || "N/A"}
              </p>
              <h3>Reseñas:</h3>
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
            </>
          ) : (
            <p>No eres un usuario...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
