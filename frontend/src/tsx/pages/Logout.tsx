import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Eliminar la cookie de username
    Cookies.remove('username');

    // Redirigir al usuario a la página principal
    // navigate('/');
    window.location.href = '/'; // Navega a la página y recarga
  }, [navigate]); // Dependencia del efecto

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
};

export default Logout;
