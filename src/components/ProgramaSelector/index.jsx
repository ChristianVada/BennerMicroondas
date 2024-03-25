import React from "react";

const ProgramaSelector = ({
  programasPreDefinidos,
  programasCustomizados,
  onSelectPrograma,
}) => {
  return (
    <div>
      <label>Programa</label>
      <select onChange={(e) => onSelectPrograma(e.target.value)}>
        <option value="">Selecione um programa</option>
        {programasPreDefinidos.map((programa, index) => (
          <option key={index} value={index}>
            {programa.nome}
          </option>
        ))}
        {programasCustomizados.map((programa, index) => (
          <option
            key={index + programasPreDefinidos.length}
            value={index + programasPreDefinidos.length}
          >
            {programa.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgramaSelector;
