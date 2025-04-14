import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSorteio } from "../context/SorteioContext";
import styles from "../styles/AddPage.module.css";
import mascot from "../assets/images/masc.png";
import { Icon } from "@iconify/react";

function AddPage() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [erro, setErro] = useState(null);
  const [nomeEmUso, setNomeEmUso] = useState(false);

  const navigate = useNavigate();
  const { participants, addParticipant, executeSorteio, error } = useSorteio();

  useEffect(() => {
    console.log("Verificando se o nome já está em uso...");
    const timeout = setTimeout(() => {
      const nomeLimpo = nome.trim();
      const nomeJaEmUso = participants.some((p) => p.firstName === nomeLimpo);
      console.log(`Nome verificado: "${nomeLimpo}", Em uso: ${nomeJaEmUso}`);
      setNomeEmUso(nomeJaEmUso);
    }, 300);

    return () => {
      console.log("Limpando timeout de verificação de nome.");
      clearTimeout(timeout);
    };
  }, [nome, participants]);

  const handleAdicionar = (event) => {
    event.preventDefault();
    console.log("Tentando adicionar participante...");

    const nomeLimpo = nome.trim();
    const sobrenomeLimpo = sobrenome.trim();

    setErro(null);

    if (!nomeLimpo) {
      console.error("Erro: O nome é obrigatório.");
      setErro("O nome é obrigatório.");
      return;
    }

    if (nomeEmUso) {
      console.error("Erro: Este nome já está em uso.");
      setErro("Este nome já está em uso.");
      return;
    }

    if (participants.length >= 50) {
      console.error("Erro: O número máximo de participantes é 50.");
      setErro("O número máximo de participantes é 50.");
      return;
    }

    const participante = {
      id: crypto.randomUUID(),
      firstName: nomeLimpo,
      lastName: sobrenomeLimpo,
    };

    try {
      addParticipant(participante);
      console.log(`Participante adicionado: ${nomeLimpo} ${sobrenomeLimpo}`);
      setNome("");
      setSobrenome("");
    } catch (err) {
      console.error(`Erro ao adicionar participante: ${err.message}`);
      setErro(err.message);
    }

    if (error) {
      console.warn("Erro de contexto limpo.");
      setErro(null);
    }
  };

  const handleRemover = (id) => {
    console.log(`Removendo participante com ID: ${id}`);
    try {
      const updatedParticipants = participants.filter((p) => p.id !== id);
      addParticipant(updatedParticipants); 
      console.log("Participante removido com sucesso.");
    } catch (err) {
      console.error(`Erro ao remover participante: ${err.message}`);
      setErro(err.message);
    }
  };

  const handleSortear = () => {
    console.log("Tentando sortear participantes...");
    if (participants.length < 2) {
      console.error("Erro: É necessário pelo menos 2 participantes para sortear.");
      setErro("É necessário pelo menos 2 participantes para sortear.");
      return;
    }

    try {
      executeSorteio();
      console.log("Sorteio executado com sucesso. Redirecionando para /resultado.");
      navigate("/resultado");
    } catch (err) {
      console.error(`Erro ao executar sorteio: ${err.message}`);
      setErro(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar Participantes</h1>
      <img src={mascot} alt="Mascote" className={styles.mascot} />

      <div className={styles.form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdicionar(e);
          }}
        >
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => {
              console.log(`Nome alterado para: ${e.target.value}`);
              setNome(e.target.value);
            }}
            className={`${styles.input} ${nomeEmUso ? styles.inputError : ""}`}
          />
          {nomeEmUso && <p className={styles.warning}>Nome já está em uso!</p>}
          <input
            type="text"
            placeholder="Sobrenome (opcional)"
            value={sobrenome}
            onChange={(e) => {
              console.log(`Sobrenome alterado para: ${e.target.value}`);
              setSobrenome(e.target.value);
            }}
            className={styles.input}
          />

          <button type="submit" className={styles.addButton}>
            <Icon icon="mdi:plus" width="24" />
          </button>
        </form>

        {erro && <p className={styles.error}>Erro Local: {erro}</p>}
        {!erro && error && <p className={styles.error}>Erro Contexto: {error}</p>}
      </div>

      <ul className={styles.participantList}>
        {participants.map((p, index) => (
          <li key={index} className={styles.participantItem}>
            <img src={mascot} className={styles.avatar} alt="avatar" />
            <span>
              {p.firstName} {p.lastName}
            </span>
            <button
              onClick={() => handleRemover(p.id)}
              className={styles.removeButton}
              aria-label={`Remover ${p.firstName}`}
            >
              <Icon icon="mdi:close" width="20" />
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleSortear} className={styles.sortearButton}>
        Sortear Broders
      </button>
    </div>
  );
}

export default AddPage;
