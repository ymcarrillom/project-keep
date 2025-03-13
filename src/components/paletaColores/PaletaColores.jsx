import styles from "./PaletaColores.module.css";

function PaletaColores({ onSelectColor, onCloseMenu }) {
  const colors = [
    { name: "white", hexCode: "#FFFFFF" },
    { name: "red", hexCode: "#F28B82" },
    { name: "orange", hexCode: "#FBBC04" },
    { name: "yellow", hexCode: "#FFF475" },
    { name: "green", hexCode: "#CCFF90" },
    { name: "lightblue", hexCode: "#A7FFEB" },
    { name: "blue", hexCode: "#CBF0F8" },
    { name: "darkblue", hexCode: "#AECBFA" },
    { name: "violet", hexCode: "#D7AEFB" },
    { name: "pink", hexCode: "#FDCFE8" }
  ];

  const handleColorClick = (color) => {
    onSelectColor(color.hexCode); 
    onCloseMenu(); 
  };

  return (
    <div className={styles.containerPaletas}>
      {colors.map((color) => (
        <button
          key={color.name}
          className={styles.buttons}
          id={styles[color.name]}
          onClick={() => handleColorClick(color)}
        ></button>
      ))}
    </div>
  );
}

export default PaletaColores;
