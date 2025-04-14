import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import mascot from "../assets/images/masc.png";
import { Icon } from "@iconify/react";

function Home() {
  return (
    <div className={styles.container}>
      {/* Engrenagem canto superior esquerdo */}
      <Link to="/config" className={styles.settingsLeft}>
        <Icon icon="mdi:cog" width="24" />
      </Link>

      {/* Título */}
      <h1 className={styles.title}>Meu Broder Secreto é!!</h1>

      {/* Mascote */}
      <img src={mascot} alt="Mascote presente estiloso" className={styles.mascot} />

      {/* Botão de início */}
      <Link to="/add" className={styles.button}>
        Começar o Sorteio
      </Link>

      {/* Engrenagem canto superior direito */}
      <Link to="/config" className={styles.settingsRight}>
        <Icon icon="mdi:cog" width="24" />
      </Link>

      {/* Rodapé */}
      <footer className={styles.footer}>© 2024 Meu Broder Secreto</footer>
    </div>
  );
}

export default Home;
