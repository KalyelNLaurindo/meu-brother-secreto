import { useState } from "react";
import styles from "../styles/ConfigPage.module.css";
import brFlag from "../assets/images/CardVerQuemPegou.png";
import { Icon } from "@iconify/react";

function ConfigPage() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleMode = () => {
    setDarkMode(!darkMode);
    
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Seletor de Idioma</h2>
      <div className={styles.languageBox}>
        <img src={brFlag} alt="Bandeira do Brasil" className={styles.flag} />
        <span>Português (padrão)</span>
      </div>

      <h2 className={styles.sectionTitle}>Modo Claro / Escuro</h2>
      <div className={styles.toggleBox} onClick={toggleMode}>
        <div className={`${styles.toggle} ${darkMode ? styles.active : ""}`}>
          <div className={styles.thumb} />
        </div>
      </div>

      <p className={styles.footer}>Termos de Serviço</p>
    </div>
  );
}

export default ConfigPage;
