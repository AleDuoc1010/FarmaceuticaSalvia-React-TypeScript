import React from "react";
import videoSobreNosotros from "../assets/fondo_productos.mp4";

const SobreNosotros: React.FC = () => {
  return (
    <div className="sobre-nosotros-page container mt-5 text-center">
      <h1 className="mb-4">Sobre Nosotros</h1>

      
      <div className="texto-sobre-nosotros">
        <p className="lead">
          En <strong>Farmacéutica Salvia</strong> nos especializamos en ofrecer
          productos de salud y bienestar de la más alta calidad. Nuestro
          compromiso es con la confianza, la innovación y el cuidado de nuestros
          pacientes.
        </p>

        <p>
          Trabajamos día a día para brindar soluciones farmacéuticas seguras,
          accesibles y efectivas, con un enfoque en la atención humana y la
          excelencia profesional.
        </p>

        <p>
          Gracias por confiar en nosotros para cuidar lo más importante: tu
          salud.
        </p>

        {/* video*/}
      <div className="video-recuadro mb-4">
        <video controls className="video-sobre-nosotros">
          <source src={videoSobreNosotros} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
