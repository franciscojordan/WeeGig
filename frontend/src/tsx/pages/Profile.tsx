import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [cookies] = useCookies(["user"]);
  const [reviews, setReviews] = useState(null);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/users/search?id=${id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));

    if (cookies.user) {
      fetch(`http://localhost:8080/reviews?to=${id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((error) => console.error(error));
    }
  }, [id, cookies.user]);

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
          {userData ? (
            <>
              <Avatar>{userData.name.charAt(0)}</Avatar>
              <h2>
                {userData.name} {userData.surname}
              </h2>
              <p>
                <strong>Usuario:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Número de teléfono:</strong> {userData.phone_number}
              </p>
              <p>
                <strong>Fecha de nacimiento:</strong> {userData.birthdate}
              </p>
              <p>
                <strong>Nombre de compañía:</strong>{" "}
                {userData.company_name || "N/A"}
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

export default Profile;
