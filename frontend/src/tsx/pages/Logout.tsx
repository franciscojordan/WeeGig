import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove('user');
    window.location.href = '/';
  }, [navigate]);

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
};

export default Logout;
