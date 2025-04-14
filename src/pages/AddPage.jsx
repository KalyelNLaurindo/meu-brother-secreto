import { useState } from "react";
import styles from "../styles/AddPage.module.css";
import mascot from "../assets/images/masc.png";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { realizarSorteio } from "../utils/Sorter.js"; // Importando a função de sorteio
import { Link } from "react-router-dom";

function AddPage() {
  const [participants, setParticipants] = useState([]);
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    const nomeLimpo = nome.trim();
    if (!nomeLimpo) return;
    if (participants.includes(nomeLimpo)) return;
    navigator.vibrate?.(80);
    setParticipants([...participants, nomeLimpo]);
    setNome("");
  };

  const handleSortear = () => {
    if (participants.length < 2) return;
    navigator.vibrate?.([50, 30, 50]);

    const resultado = realizarSorteio(participants);

    // TODO: salvar em contexto futuramente
    console.log("Resultado:", resultado);

    navigate("/result"); // Vamos criar isso depois
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar Participantes</h1>
      <img src={mascot} alt="Mascote" className={styles.mascot} />

      <div className={styles.inputGroup}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className={styles.addButton} onClick={handleAdd}>
          <Icon icon="mdi:plus" width="24" />
        </button>
      </div>

      <ul className={styles.participantList}>
        {participants.map((p, index) => (
          <li key={index} className={styles.participantItem}>
            <img src={mascot} className={styles.avatar} alt="avatar" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <button className={styles.sortearButton} onClick={handleSortear}>
        Sortear Broders
      </button>
    </div>
  );
}

export default AddPage;
