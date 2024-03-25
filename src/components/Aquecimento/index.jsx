import React, { useState, useEffect } from "react";
import programasPreDefinidos from "./data";

const Aquecimento = () => {
  const [tempo, setTempo] = useState(0);
  const [potencia, setPotencia] = useState(0);
  const [aquecendo, setAquecendo] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [processo, setProcesso] = useState("");
  const [programa, setPrograma] = useState(null);

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

  const iniciarAquecimento = () => {
    if (programa) {
      setTempo(programa.tempo);
      setPotencia(programa.potencia);
      setAquecendo(true);
      setPausado(false);
      setProcesso("");
    } else {
      if (tempo < 1 || tempo > 120) {
        alert("Informe um tempo válido (entre 1 e 120 segundos)");
        return;
      }
      if (potencia < 1 || potencia > 10) {
        alert("Informe uma potência válida (entre 1 e 10)");
        return;
      }
      setAquecendo(true);
      setPausado(false);
      setProcesso("");
    }
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
        onChange={(e) => setPrograma(programasPreDefinidos[e.target.value])}
      >
        <option value="">Selecione um programa</option>
        {programasPreDefinidos.map((programa, index) => (
          <option value={index}>{programa.nome}</option>
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
    </div>
  );
};

export default Aquecimento;
