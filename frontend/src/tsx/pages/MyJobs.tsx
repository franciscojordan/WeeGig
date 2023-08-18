import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Divider from '@mui/material/Divider';

const MyJobs: React.FC = () => {
    const [applications, setApplications] = useState([]);
    const [jobDetails, setJobDetails] = useState({}); // Nuevo estado para almacenar detalles de trabajos

    const [cookies] = useCookies(["user"]);
    const user = cookies.user;
  
    useEffect(() => {
      fetch(`http://localhost:8080/jobs/employer/${user.idUser}`)
        .then((response) => response.json())
        .then((data) => {
          setApplications(data);

          console.log(data);
          // Obtener los detalles de cada trabajo
          data.forEach(application => {
            fetch(`http://localhost:8080/jobs/${application.idJobOffers}`)
              .then(res => res.json())
              .then(jobDetail => {
                setJobDetails(prevDetails => ({
                  ...prevDetails,
                  [application.idJobOffers]: jobDetail
                }));
              });
          });
        })
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
                    <p>{`Titulo: ${jobDetails[application.idJobOffers]?.title || "Cargando..."}`}</p>
                    <p>{`Descripción: ${jobDetails[application.idJobOffers]?.description || "Cargando..."}`}</p>
                    <p>{`Estado: ${application.status}`}</p>
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
