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
    if (id) {
      fetch(`http://localhost:8080/users/search?id=${id}`)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error(error));
    }
  
    if (cookies.user && id) {
      fetch(`http://localhost:8080/reviews?to=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setReviews(data);
          } else {
            // console.error("Data is not an array:", data);
            setReviews([]); // establece reviews a un array vacío o maneja este caso de error de manera diferente si lo prefieres
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id, cookies.user]);
  

  return (
    <div className="big-box">
  <div className="small-box">
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "80%",
        margin: "5vh auto", // Agregado margen superior e inferior
      }}
    >
      <div
        style={{
          width: "40%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          textAlign: "left",
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
          </>
        ) : (
          <p>No eres un usuario...</p>
        )}
      </div>
      <div
        style={{
          width: "40%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          textAlign: "left",
        }}
      >
        <h3>Reseñas:</h3>
        {reviews ? (
          reviews.map((review) => (
            <div
              key={review.id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <Rating name="read-only" value={review.rating} readOnly />
              <p>{review.review_content}</p>
              <p>{review.reviewerName}</p>
            </div>
          ))
        ) : (
          <p>Cargando reseñas...</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
  
  
};

export default Profile;
