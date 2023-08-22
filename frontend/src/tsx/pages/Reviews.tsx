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
            <h2>Reseñas por realizar</h2>

        </div>
    )
}

export default Reviews;