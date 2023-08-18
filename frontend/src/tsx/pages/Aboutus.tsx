import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        <div>
          <h1>Sobre Nosotros</h1>
          <p>
            Somos una empresa dedicada a brindar las mejores soluciones
            tecnológicas. Nuestra misión es ofrecer productos y servicios de
            alta calidad que agreguen valor a nuestros clientes.
          </p>
          <p>
            Con años de experiencia en la industria, hemos construido un equipo
            fuerte y apasionado que trabaja arduamente para alcanzar nuestros
            objetivos y visión.
          </p>
        </div>
        <div>
          <h2>Nuestro Equipo</h2>
          <p>
            Nuestro equipo está compuesto por profesionales altamente
            calificados en diferentes áreas de la tecnología. Trabajamos juntos
            para innovar y crear soluciones que marquen la diferencia.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src="./src/assets/img/fran.jpg" alt="Imagen 1" style={{ margin: "10px", width: "100px", height: "100px" }} />
            <img src="./src/assets/img/victor.jpg" alt="Imagen 2" style={{ margin: "10px", width: "100px", height: "100px" }} />
            <img src="./src/assets/img/ale.jpg" alt="Imagen 3" style={{ margin: "10px", width: "100px", height: "100px" }} />
          </div>
        </div>
        <div>
          <h2>Contacto</h2>
          <address>
            Dirección: 123 Calle Principal, Ciudad, País
            <br />
            Teléfono: (123) 456-7890
            <br />
            Email: info@nuestraempresa.com
          </address>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
