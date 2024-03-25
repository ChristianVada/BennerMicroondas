import React, { useState, useEffect } from "react";
import programasPreDefinidos from "./data";

const Aquecimento = () => {
  const [tempo, setTempo] = useState(0);
  const [potencia, setPotencia] = useState(0);
  const [aquecendo, setAquecendo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [processo, setProcesso] = useState("");
  const [programa, setPrograma] = useState(null);
  const [programasCustomizados, setProgramasCustomizados] = useState([]);
  const [novoPrograma, setNovoPrograma] = useState({
    nome: "",
    alimento: "",
    potencia: 0,
    caractereAquecimento: "",
    tempo: 0,
    instrucoes: "",
  });

  useEffect(() => {
    if (aquecendo) {
      const timer = setInterval(() => {
        setTempo((prevTempo) => prevTempo - 1);
        setProcesso(
          (prevProcesso) => prevProcesso + ".".repeat(potencia) + " "
        );
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [aquecendo, potencia]);

  useEffect(() => {
    if (tempo === 0) {
      setAquecendo(false);
      setProcesso(
        (prevProcesso) => prevProcesso.trim() + " Aquecimento concluído"
      );
    }
  }, [tempo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoPrograma((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const adicionarProgramaCustomizado = () => {
    const novoProgramaValidado = { ...novoPrograma };
    // Validar os campos aqui antes de adicionar o programa
    if (
      !novoProgramaValidado.nome ||
      !novoProgramaValidado.alimento ||
      !novoProgramaValidado.potencia ||
      !novoProgramaValidado.caractereAquecimento ||
      !novoProgramaValidado.tempo
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verificar se o caractere de aquecimento não se repete com o caractere padrão "."
    if (
      novoProgramaValidado.caractereAquecimento === "." ||
      novoProgramaValidado.caractereAquecimento === "..."
    ) {
      alert("O caractere de aquecimento não pode ser '.' ou '...'");
      return;
    }

    // Aqui você pode adicionar a lógica para validar se o caractere de aquecimento já está em uso

    // Adicionar o novo programa customizado à lista de programas customizados
    setProgramasCustomizados([...programasCustomizados, novoProgramaValidado]);

    // Limpar os campos após adicionar o programa
    setNovoPrograma({
      nome: "",
      alimento: "",
      potencia: 0,
      caractereAquecimento: "",
      tempo: 0,
      instrucoes: "",
    });
  };

  const iniciarAquecimento = () => {
    const programaSelecionado = programa || programasPreDefinidos[0];
    setTempo(programaSelecionado.tempo);
    setPotencia(programaSelecionado.potencia);
    setAquecendo(true);
    setPausado(false);
    setProcesso("");
  };

  const pausarOuCancelar = () => {
    if (aquecendo) {
      setPausado(true);
      setAquecendo(false);
    } else if (pausado) {
      setTempo(30);
      setPotencia(10);
      setPausado(false);
      setProcesso("");
    }
  };

  const inicioRapido = () => {
    setTempo(30);
    setPotencia(10);
    iniciarAquecimento();
  };

  const exibirTempo = () => {
    if (tempo > 60 && tempo <= 120) {
      const minutos = Math.floor(tempo / 60);
      const segundos = tempo % 60;
      return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
    }
    return tempo;
  };

  return (
    <div>
      <label>Programa</label>
      <select
        onChange={(e) =>
          setPrograma(
            programasPreDefinidos[e.target.value] ||
              programasCustomizados[
                e.target.value - programasPreDefinidos.length
              ]
          )
        }
      >
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
            <i>{programa.nome}</i>
          </option>
        ))}
      </select>

      <label>Tempo</label>
      <input
        type="number"
        value={tempo}
        onChange={(e) => setTempo(e.target.value)}
      />

      <label>Potência</label>
      <input
        type="number"
        value={potencia}
        onChange={(e) => setPotencia(e.target.value)}
      />

      <button onClick={iniciarAquecimento}>Iniciar</button>
      <button onClick={pausarOuCancelar}>
        {pausado ? "Cancelar" : "Pausar"}
      </button>
      <button onClick={inicioRapido}>Início Rápido</button>

      <p>Tempo restante: {exibirTempo()}</p>
      <p>{processo}</p>

      {/* Formulário para cadastrar programa customizado */}
      <div>
        <h2>Cadastrar Novo Programa de Aquecimento</h2>
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={novoPrograma.nome}
          onChange={handleInputChange}
        />

        <label>Alimento:</label>
        <input
          type="text"
          name="alimento"
          value={novoPrograma.alimento}
          onChange={handleInputChange}
        />

        <label>Potência:</label>
        <input
          type="number"
          name="potencia"
          value={novoPrograma.potencia}
          onChange={handleInputChange}
        />

        <label>Caractere de Aquecimento:</label>
        <input
          type="text"
          name="caractereAquecimento"
          value={novoPrograma.caractereAquecimento}
          onChange={handleInputChange}
        />

        <label>Tempo:</label>
        <input
          type="number"
          name="tempo"
          value={novoPrograma.tempo}
          onChange={handleInputChange}
        />

        <label>Instruções:</label>
        <textarea
          name="instrucoes"
          value={novoPrograma.instrucoes}
          onChange={handleInputChange}
        />

        <button onClick={adicionarProgramaCustomizado}>
          Adicionar Programa
        </button>
      </div>
    </div>
  );
};

export default Aquecimento;
