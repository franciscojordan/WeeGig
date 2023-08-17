import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Divider from '@mui/material/Divider';

const MyJobs: React.FC = () => {
    const [applications, setApplications] = useState([]);

    const [cookies] = useCookies(["user"]);
    const user = cookies.user;

  
    useEffect(() => {
      fetch(`http://localhost:8080/jobs/employer/${user.idUser}`)
        .then((response) => response.json())
        .then((data) => setApplications(data))
        .catch((error) => console.error("Hubo un error:", error));
    }, []);
  
    return (
      <div className="big-box">
        <div className="small-box">
          <h1>Mis Trabajos</h1>
          {applications.length > 0 ? (
            <ul>
              {applications.map((application, index) => (
                <div key={index}>
                  <Link to={`/jobs/${application.idJobOffers}`}>
                    <p>{`Trabajo ID: ${application.idJobOffers}`}</p>
                    <p>{`Fecha de aplicación: ${application.applicationDate}`}</p>
                    <p>{`Estado: ${application.applicationStatus}`}</p>
                  </Link>
                  <Divider />
                </div>
              ))}
            </ul>
          ) : (
            <p>No hay aplicaciones disponibles.</p>
          )}
        </div>
      </div>
    );
  }

export default MyJobs;
