import styles from "./Sidebar.module.css";
import vector from "../../assets/icons/imgvector.svg"
import trash from "../../assets/icons/Trash.svg"
// Componente de la barra lateral
const Sidebar = ({ setView,view }) => {
  return (
    <div>
        <button className={`${styles.button} ${view==="notas"?styles["button--active"]:""}`} onClick={() => setView('notas')} >
        <img src={vector}/>Notes
        </button>
        <button className={`${styles.button} ${view==="papelera"?styles["button--active"]:""}`} onClick={() => setView('papelera')} ><img src={trash} />Trash</button>
    </div>
  );
};

//<img>src={/src/assets/icons/Trash.svg} </img>


export default Sidebar;
/* Componente de la vista de notas
const NotasView = () => {
  return <h2>Vista de notas</h2>;
};

 Componente de la vista de papelera
const PapeleraView = () => {
  return <h2>Vista de papelera</h2>;
};

 Componente principal
const App = () => {
  const [view, setView] = useState('notas');

  const views = {
    notas: <NotasView />,
    papelera: <PapeleraView />,
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setView={setView} />
      <div>{views[view]}</div>
    </div>
  );
};

export default App;*/