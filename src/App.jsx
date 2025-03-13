import { useState } from "react";
import './App.css'
import Welcome from "./components/welcome/Welcome";
import NotesApp from "./NotesApp";

function App() {
  const [isActive, setIsActive] = useState(false);
  const loggedIn = localStorage.getItem("username");
  function handleState() {
    setIsActive(!isActive);
  }
  return (
    <div>
      {loggedIn === null && <Welcome handleState={handleState} />}
      {loggedIn !== null && <NotesApp handleState={handleState} />}
    </div>
  );
}

export default App;