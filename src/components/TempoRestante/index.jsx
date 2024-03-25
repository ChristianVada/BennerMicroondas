import React from "react";

const TempoRestante = ({ tempo }) => {
  const exibirTempo = () => {
    if (tempo > 60 && tempo <= 120) {
      const minutos = Math.floor(tempo / 60);
      const segundos = tempo % 60;
      return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
    }
    return tempo;
  };

  return <p>Tempo restante: {exibirTempo()}</p>;
};

export default TempoRestante;
