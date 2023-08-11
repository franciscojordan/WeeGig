import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Intenta obtener el nombre de usuario de las cookies
    const user = Cookies.get("user");
    setUser(JSON.parse(user));
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      {user ? (
        <>
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
            <strong>Numero de telefono:</strong> {user.phone_number}
          </p>
          <p>
            <strong>Fecha de nacimiento:</strong> {user.birthdate}
          </p>
          <p>
            <strong>Nombre de compañia:</strong> {user.company_name || "N/A"}
          </p>
        </>
      ) : (
        <p>No eres un usuario...</p>
      )}
    </div>
  );
};

export default Perfil;
