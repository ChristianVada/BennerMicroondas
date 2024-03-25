import React from "react";

const NovoProgramaForm = ({
  novoPrograma,
  onInputChange,
  adicionarProgramaCustomizado,
}) => {
  return (
    <div>
      <h2>Cadastrar Novo Programa de Aquecimento</h2>
      <label>Nome:</label>
      <input
        type="text"
        name="nome"
        value={novoPrograma.nome}
        onChange={onInputChange}
      />

      <label>Alimento:</label>
      <input
        type="text"
        name="alimento"
        value={novoPrograma.alimento}
        onChange={onInputChange}
      />

      <label>Potência:</label>
      <input
        type="number"
        name="potencia"
        value={novoPrograma.potencia}
        onChange={onInputChange}
      />

      <label>Caractere de Aquecimento:</label>
      <input
        type="text"
        name="caractereAquecimento"
        value={novoPrograma.caractereAquecimento}
        onChange={onInputChange}
      />

      <label>Tempo:</label>
      <input
        type="number"
        name="tempo"
        value={novoPrograma.tempo}
        onChange={onInputChange}
      />

      <label>Instruções:</label>
      <textarea
        name="instrucoes"
        value={novoPrograma.instrucoes}
        onChange={onInputChange}
      />

      <button onClick={adicionarProgramaCustomizado}>Adicionar Programa</button>
    </div>
  );
};

export default NovoProgramaForm;
