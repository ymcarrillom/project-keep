/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./CrearNotas.module.css";
import pinnIcon from "../../assets/icons/Pinn.svg"
import palleteIcon from "./../../assets/icons/Vector.svg"
import PaletaColores from "/src/components/paletaColores/PaletaColores.jsx";

function CrearNotas({ updateData }) {
  const user = localStorage.getItem("username");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("#FFF");
  const [pinned, setPinned] = useState(false)
  const [showColorPalette, setShowColorPalette] = useState(false);

  const handleKeepNote = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pinned, title, body, color
      }),
    };

    fetch(
      `https://codeable-keep-api-production.up.railway.app/api/${user}/notes`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // reset values
        setTitle("")
        setBody("")
        setColor("#FFF")
        setPinned(false)
        // get data from API
        updateData()
      }).catch((err) => {
        console.log(err)
      });
  };

  const handleCloseColorPalette = () => {
    setShowColorPalette(false); // Cerrar el menú de colores
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerCrear}>
        <button className={styles.pin} onClick={() => setPinned(!pinned)}>
          <img src={pinnIcon} alt="Pinn Icon" />
        </button>
        <div className={styles.contentCrear}>
          <div className={styles.contentTitle}>
            <input
              className={styles.title}
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className={styles.notes}
              type="text"
              placeholder="Your note..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className={styles.contentButtons}>
            <button
              className={styles.colors}
              onClick={() => setShowColorPalette(!showColorPalette)}
            >
              <img src={palleteIcon} alt="Color Picker" />
            </button>
            {showColorPalette && (
              <PaletaColores
                onSelectColor={(selectedColor) => setColor(selectedColor)}
                onCloseMenu={handleCloseColorPalette}
              />
            )}
            <button className={styles.buttonKeep} onClick={handleKeepNote}>
              Keep it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearNotas;
