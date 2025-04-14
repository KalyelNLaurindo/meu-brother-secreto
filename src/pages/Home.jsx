import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import mascot from "../assets/images/MascHome.png";
import { Icon } from "@iconify/react";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Botão de configurações dentro do card */}
        <Link to="/config" className={styles.settings}>
          <Icon icon="mdi:cog" width="24" />
        </Link>

        {/* Título, mascote e botão diretamente no card */}
        <h1 className={styles.title}>Amigo Secreto</h1>
        <img src={mascot} alt="Mascote presente estiloso" className={styles.mascot} />
        <Link to="/add" className={styles.button}>
          Começar
        </Link>
      </div>

      {/* Rodapé */}
      <footer className={styles.footer}>
  © 2025 KoyosHouse Software and Support · Meu Brother Secreto
</footer>
    </div>
  );
}

export default Home;
