import React, { useState, useEffect } from "react";
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
            setReviews([]);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [id, cookies.user]);

  // Function to format the date in 'YYYY-MM-DD' format
  const formatDate = (dateString) => {
    console.log("formatDate is being executed"); // Debugging output
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  console.log("userData:", userData); // Debugging output

  return (
    <div className="big-box">
      <div className="small-box">
        {userData && (
          <div>
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
              <strong>Fecha de nacimiento:</strong>{" "}
              {userData.birthdate ? formatDate(userData.birthdate) : "N/A"}
            </p>
            <p>
              <strong>Nombre de compañía:</strong>{" "}
              {userData.company_name || "N/A"}
            </p>
          </div>
        )}
        {/* ... (other JSX) */}
      </div>
    </div>
  );
};

export default Profile;
