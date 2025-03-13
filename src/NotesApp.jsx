import { useEffect, useState } from "react";

import ListNotes from "./components/listnotes/ListNotes";
import Header from "./components/header/Header";
import CrearNotas from "/src/components/crearNotas/CrearNotas.jsx";
import Siderbar from "./components/Sidebar/Sidebar";

// eslint-disable-next-line react/prop-types
const NotesApp = ({ handleState }) => {
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState("notas");
  const [numReq, setNumReq] = useState(0)
  const username = localStorage.getItem("username");
  function exitSession() {
    localStorage.clear();
    handleState();
  }

  function updateData(){
    setNumReq(numReq + 1)
  }

  useEffect(() => {
    //Llamada a la api GET Notes
    fetch(
      `https://codeable-keep-api-production.up.railway.app/api/${username}/notes`
    )
      .then((response) => response.json())
      .then((data) => {
        if (view === "notas"){
          setNotes(data.notes.filter(note =>!note.deleted))
        } 

        if (view === "papelera"){
          setNotes(data.notes.filter(note => note.deleted))
        }
      })
      .catch((err) => { console.log(err) });
  }, [username, numReq, view]);

  return (
    <>
      <Header exitSession={exitSession} />
      <div className="appContainer">
        <aside className="aside">
          <Siderbar view={view} setView={setView} />
        </aside>
        <main className="main">
          { view === "notas" && <CrearNotas  updateData={updateData}/>}
          <ListNotes notes={notes} updateData={updateData}/>
        </main>
      </div>
    </>
  );
};
export default NotesApp;
