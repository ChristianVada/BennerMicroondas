import React, { useState } from "react";

const programasPreDefinidos = [
  {
    nome: "Pipoca",
    alimento: "Pipoca (de micro-ondas)",
    tempo: 180,
    potencia: 7,
    instrucoes:
      "Observar o barulho de estouros do milho, caso houver um intervalo de mais de 10 segundos entre um estouro e outro, interrompa o aquecimento.",
  },
  {
    nome: "Leite",
    alimento: "Leite",
    tempo: 300,
    potencia: 5,
    instrucoes:
      "Cuidado com aquecimento de líquidos, o choque térmico aliado ao movimento do recipiente pode causar fervura imediata causando risco de queimaduras.",
  },
  {
    nome: "Carnes de boi",
    alimento: "Carne em pedaço ou fatias",
    tempo: 840,
    potencia: 4,
    instrucoes:
      "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.",
  },
  {
    nome: "Frango",
    alimento: "Frango (qualquer corte)",
    tempo: 480,
    potencia: 7,
    instrucoes:
      "Interrompa o processo na metade e vire o conteúdo com a parte de baixo para cima para o descongelamento uniforme.",
  },
  {
    nome: "Feijão",
    alimento: "Feijão congelado",
    tempo: 480,
    potencia: 9,
    instrucoes:
      "Deixe o recipiente destampado e em casos de plástico, cuidado ao retirar o recipiente pois o mesmo pode perder resistência em altas temperaturas.",
  },
];

const Cadastro = () => {
  const [programaSelecionado, setProgramaSelecionado] = useState(null);

  const iniciarAquecimentoPreDefinido = (programa) => {
    // Aqui você pode iniciar o aquecimento com o tempo e a potência do programa
    console.log(
      `Iniciando aquecimento com tempo ${programa.tempo} e potência ${programa.potencia}`
    );
  };

  const selecionarPrograma = (programa) => {
    setProgramaSelecionado(programa);
    iniciarAquecimentoPreDefinido(programa);
  };

  return (
    <div>
      {programas.map((programa, index) => (
        <div key={index}>
          <h2>{programa.nome}</h2>
          <p>{programa.alimento}</p>
          <p>Tempo: {programa.tempo} segundos</p>
          <p>Potência: {programa.potencia}</p>
          <p>Instruções: {programa.instrucoes}</p>
          <button onClick={() => selecionarPrograma(programa)}>
            Selecionar
          </button>
        </div>
      ))}
      {programaSelecionado && (
        <div>
          <h2>Programa selecionado: {programaSelecionado.nome}</h2>
          <p>Tempo: {programaSelecionado.tempo} segundos</p>
          <p>Potência: {programaSelecionado.potencia}</p>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
