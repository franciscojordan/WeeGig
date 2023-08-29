import Image1 from "../../assets/img/fran.jpg";
import Image2 from "../../assets/img/victor.jpg";
import Image3 from "../../assets/img/alej.jpg";
import MapComponent from '../components/Map';

const AboutUs: React.FC = () => {
  const mapCenter = { lat: 41.38837180727378, lng: 2.1799002828303 };
  const mapZoom = 15;
  const markerPosition = {lat: 41.38837180727378, lng: 2.1799002828303 };
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
              top: "5vh",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              textAlign: "center",
            }}
          >
            Sobre Nosotros
          </h1>
          <p className="manky"
          style={{
            fontSize: "24px",
            position: "absolute",
            top: "205px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            textAlign: "center",
            display: "none",
          }}
        >
          Nuestra empresa promueve el empleo sostenible a través de soluciones
          tecnológicas avanzadas. Nos dedicamos a brindar servicios y productos
          de alta calidad que impulsan tanto a nuestros clientes como al
          desarrollo laboral sostenible.
        </p>
        </div>
      </div>
      <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Nuestro Equipo</h1>
      <div
        style={{
          maxWidth: "990px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "0 20px", flex: "0 1 calc(33.33% - 40px)" }}>
          <img
            src={Image1}
            alt="Imagen 1"
            style={{ width: "100%", borderRadius: "10%" }}
          />
          <h2 style={{ textAlign: "center" }}>Francisco</h2>
          <p style={{ textAlign: "center" }}>Chico Back</p>
        </div>
        <div style={{ margin: "0 20px", flex: "0 1 calc(33.33% - 40px)" }}>
          <img
            src={Image2}
            alt="Imagen 2"
            style={{ width: "100%", borderRadius: "10%" }}
          />
          <h2 style={{ textAlign: "center" }}>Victor</h2>
          <p style={{ textAlign: "center" }}>Chico Git</p>
        </div>
        <div style={{ margin: "0 20px", flex: "0 1 calc(33.33% - 40px)" }}>
          <img
            src={Image3}
            alt="Imagen 3"
            style={{ width: "100%", borderRadius: "10%" }}
          />
          <h2 style={{ textAlign: "center" }}>Alejandro</h2>
          <p style={{ textAlign: "center" }}>Chico Front</p>
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
        <h1>Donde encontrarnos</h1>
        <address>
          <p>
          Dirección: Carrer d'En Llàstics, 2, 08003 Barcelona
          </p>
        </address>
        <MapComponent center={mapCenter} zoom={mapZoom} markerPosition={markerPosition} />
      </div>
    </div>
  );
  
};

export default AboutUs;
