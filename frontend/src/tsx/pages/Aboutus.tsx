import Image1 from "../../assets/img/fran.jpg";
import Image2 from "../../assets/img/victor.jpg";
import Image3 from "../../assets/img/ale.jpg";

const AboutUs: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <video autoPlay loop muted style={{ width: "100%", height: "auto" }}>
          <source src="./src/assets/img/sexo.mp4" type="video/mp4" />
          Tu navegador no admite la etiqueta de video.
        </video>
        <div>
          <h1
            style={{
              fontSize: "48px",
              position: "absolute",
              top: "90px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              textAlign: "center",
            }}
          >
            Sobre Nosotros
          </h1>
          <p
            style={{
              fontSize: "24px",
              position: "absolute",
              top: "205px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              textAlign: "center",
              display: "block",
            }}
          >
            Nuestra empresa promueve el empleo sostenible a través de soluciones
            tecnológicas avanzadas. Nos dedicamos a brindar servicios y
            productos de alta calidad que impulsan tanto a nuestros clientes
            como al desarrollo laboral sostenible.
          </p>
        </div>
      </div>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Nuestro Equipo</h1>
        <div
          style={{
            maxWidth: "990px",
            margin: "0 auto", // Centrar el contenido
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ margin: "0 20px" }}>
              <img
                src={Image1}
                alt="Imagen 1"
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
              <h2>Francisco</h2>
            </div>
            <div style={{ margin: "0 20px" }}>
              <img
                src={Image2}
                alt="Imagen 2"
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
              <h2>Victor</h2>
            </div>
            <div style={{ margin: "0 20px" }}>
              <img
                src={Image3}
                alt="Imagen 3"
                style={{ width: "400px", height: "400px", borderRadius: "10%" }}
              />
              <h2>Alejandro</h2>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#F2F2F2",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Contacto</h1>
        <address>
          Dirección: Carrer d'En Llàstics, 2, 08003 Barcelona
          <br />
          Teléfono: (+34) 611 16 87 37
          <br />
          Email: info@weegig.com
        </address>
      </div>
    </div>
  );
};

export default AboutUs;
