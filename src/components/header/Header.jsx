import styles from "./Header.module.css";
// eslint-disable-next-line react/prop-types
function Header({ exitSession }) {
  return (
    <div className={styles.header}>
      <p className={styles["header--title"]}>Welcome to Codeable Keep {`${localStorage.getItem("username")}`}!</p>
      <button onClick={exitSession} className={styles["header--button"]}>
        Exit
      </button>
    </div>
  );
}

export default Header;
