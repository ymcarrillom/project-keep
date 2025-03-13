/* eslint-disable react/prop-types */
import styles from "./ListNotes.module.css"

import Note from "../note/Note";

function ListNotes({ notes, updateData}) {

    const notesPinned = notes.filter(note => note.pinned)
    const notesNotPinned = notes.filter(note => !note.pinned)

    return (<>
        <h2>Pinned</h2>
        <div className={`${styles.notes_container}`}>
            {notes.length === 0 && <h1>Not notes found</h1>}
            {notes.length !== 0 && notesPinned.map(note => <Note 
            key={note.id} 
            note={note} 
            updateData={updateData}/>)}
        </div>
        <h2>Others</h2>
        <div className={`${styles.notes_container}`}>
            {notes.length === 0 && <h1>Not notes found</h1>}
            {notes.length !== 0 && notesNotPinned.map(note => <Note 
            key={note.id} 
            note={note} 
            updateData={updateData}/>)}
        </div>
    </>)

}

export default ListNotes