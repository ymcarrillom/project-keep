import { useState } from "react";
import styles from "./Welcome.module.css";

// eslint-disable-next-line react/prop-types
function Welcome({ handleState }) {
  const [username, setUsername] = useState("");

  function handleSubmit() {
    localStorage.setItem("username", username);
    handleState();
  }

  /*
      let user = window.localStorage.getItem("user") 
    */

  /*
      const options = {
      method: "GET",
      headers: { "User-Agent": "insomnia/8.3.0" },
    };

    fetch(
      `https://codeable-keep-api-production.up.railway.app/api/${user}/notes`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err)); 
    */

  return (
    <>
      <div className={styles.welcomeText}>Welcome to Codeable Keep</div>

      <form className={styles.form} onSubmit={handleSubmit}>  
        <label className={styles.label} htmlFor="nombre">
          username
        </label>
        <input
          className={styles.input}
          placeholder="some-user"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
        />
        <button type="submit" className={styles.button}>
          Enter
        </button>
      </form>
    </>
  );
}

export default Welcome;
