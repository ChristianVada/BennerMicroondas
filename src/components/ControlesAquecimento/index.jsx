import React from "react";

const ControlesAquecimento = ({
  iniciarAquecimento,
  pausarOuCancelar,
  inicioRapido,
  pausado,
}) => {
  return (
    <div>
      <button onClick={iniciarAquecimento}>Iniciar</button>
      <button onClick={pausarOuCancelar}>
        {pausado ? "Cancelar" : "Pausar"}
      </button>
      <button onClick={inicioRapido}>Início Rápido</button>
    </div>
  );
};

export default ControlesAquecimento;
