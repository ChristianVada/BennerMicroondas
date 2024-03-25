import React, { useEffect, useState } from "react";
import "./App.css";
import programasPreDefinidos from "./components/ProgramaSelector/data";
import ProgramaSelector from "./components/ProgramaSelector";
import ControlesAquecimento from "./components/ControlesAquecimento";
import TempoRestante from "./components/TempoRestante";
import NovoProgramaForm from "./components/NovoProgramaForm";
import AquecimentoProcesso from "./components/AquecimentoProcesso";

function App() {
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

    if (
      novoProgramaValidado.caractereAquecimento === "." ||
      novoProgramaValidado.caractereAquecimento === "..."
    ) {
      alert("O caractere de aquecimento não pode ser '.' ou '...'");
      return;
    }

    setProgramasCustomizados([...programasCustomizados, novoProgramaValidado]);

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

  return (
    <div>
      <ProgramaSelector
        programasPreDefinidos={programasPreDefinidos}
        programasCustomizados={programasCustomizados}
        onSelectPrograma={(index) =>
          setPrograma(
            programasPreDefinidos[index] ||
              programasCustomizados[index - programasPreDefinidos.length]
          )
        }
      />

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

      <ControlesAquecimento
        iniciarAquecimento={iniciarAquecimento}
        pausarOuCancelar={pausarOuCancelar}
        inicioRapido={inicioRapido}
        pausado={pausado}
      />

      <TempoRestante tempo={tempo} />
      <AquecimentoProcesso processo={processo} />

      <NovoProgramaForm
        novoPrograma={novoPrograma}
        onInputChange={handleInputChange}
        adicionarProgramaCustomizado={adicionarProgramaCustomizado}
      />
    </div>
  );
}

export default App;
