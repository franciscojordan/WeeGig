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
  }, [user]);

  return (
    <div className="big-box">
      <div className="small-box">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            maxWidth: "700px",
            margin: "20px auto",
          }}
        >
          {user ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    borderRight: "1px solid #ccc",
                    paddingRight: "20px",
                    marginRight: "20px",
                    textAlign: "left", // Alinea el texto hacia la izquierda
                  }}
                >
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
                    <strong>Número de teléfonos:</strong> {user.phone_number}
                  </p>
                  <p>
                    <strong>Fecha de nacimiento:</strong> {user.birthdate}
                  </p>
                  <p>
                    <strong>Nombre de compañía:</strong>{" "}
                    {user.company_name || "N/A"}
                  </p>
                </div>
                <div
                  style={{
                    paddingLeft: "20px",
                    marginLeft: "20px",
                    textAlign: "left", // Alinea el texto hacia la izquierda
                  }}
                >
                  <h3>Reseñas:</h3>
                  {reviews ? (
                    reviews.map((review) => (
                      <div key={review.id}>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          readOnly
                        />
                        <p>{review.review_content}</p>
                        <p>{review.reviewerName}</p>
                      </div>
                    ))
                  ) : (
                    <p>Cargando reseñas...</p>
                  )}
                </div>
              </div>
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
