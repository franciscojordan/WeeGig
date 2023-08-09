import * as React from 'react';
import Cookies from 'js-cookie';

const Perfil: React.FC = () => {
  const [username, setUsername] = React.useState<string | undefined>(Cookies.get('username'));

  React.useEffect(() => {
    const checkUsername = () => {
      const cookieValue = Cookies.get('username');
      if (cookieValue !== username) {
        setUsername(cookieValue);
      }
    };

    const intervalId = setInterval(checkUsername, 1000); // Verifica cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [username]);

  return (
    <div>
      {username ? (
        <p>Bienvenido, {username}!</p>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </div>
  );
};

export default Perfil;