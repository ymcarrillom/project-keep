/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./Note.module.css"
import deletIcon from "./../../assets/icons/Trash.svg"
import palleteIcon from "./../../assets/icons/Vector.svg"
import recoverIcon from "../../assets/icons/Recover.svg"
import editIcon from "../../assets/icons/Edit.svg"
import confirmIcon from "../../assets/icons/Confirm.svg"
import pinnIcon from "../../assets/icons/Pinn.svg"
import { useEffect, useState } from "react"
import PaletaColores from "../paletaColores/PaletaColores"


function Note({ note, updateData }) {
    const { id, title = "", body = "", color, deleted, pinned } = note
    const [edit, setEdit] = useState(false)
    const [content, setContent] = useState({
        body, title, id, pinned
    })
    const username = localStorage.getItem("username")

    const [colorPallete, setColorPallete] = useState(color); // Estado para almacenar el color seleccionado
    const [showColorPalette, setShowColorPalette] = useState(false);

    async function handlerPinned(){
        const data = JSON.stringify({ pinned: !pinned })
        const urlEnpoint = `https://codeable-keep-api-production.up.railway.app/api/${username}/notes/${content.id}`
        const options = {
            method: "PATCH",
            body: data,
            headers: { "Content-Type": "application/json" }
        }
        try {
            const response = await fetch(urlEnpoint, options)
            // const data = await response.json()
            // TODO: set tu invalidate data to refetch
            console.log(response.status)
        } catch (err) {
            console.log(err)
        }
        updateData()
    }

    async function handleRecovery() {
        const data = JSON.stringify({ deleted: false })
        const urlEnpoint = `https://codeable-keep-api-production.up.railway.app/api/${username}/notes/${content.id}`
        const options = {
            method: "PATCH",
            body: data,
            headers: { "Content-Type": "application/json" }
        }
        try {
            const response = await fetch(urlEnpoint, options)
            // const data = await response.json()
            // TODO: set tu invalidate data to refetch
            console.log(response.status)
        } catch (err) {
            console.log(err)
        }
        updateData()
    }

    async function handleDeleteNote() {
        const data = JSON.stringify({ deleted: !deleted })

        const options = {
            method: "PATCH",
            body: data,
            headers: { "Content-Type": "application/json" }
        }

        const optionDeleted = {
            method: "DELETE"
        }

        const urlEnpoint = `https://codeable-keep-api-production.up.railway.app/api/${username}/notes/${content.id}`

        try {
            const response = await fetch(urlEnpoint, deleted ? optionDeleted : options)
            // const data = await response.json()
            // TODO: set tu invalidate data to refetch
            console.log(response.status)
        } catch (err) {
            console.log(err)
        }
        updateData()
    }

    async function handleColorNote() {

        const data = JSON.stringify({ color: colorPallete })

        const options = {
            method: "PATCH",
            body: data,
            headers: { "Content-Type": "application/json" }
        }


        const urlEnpoint = `https://codeable-keep-api-production.up.railway.app/api/${username}/notes/${content.id}`

        try {
            const response = await fetch(urlEnpoint, options)
            // const data = await response.json()
            // TODO: set tu invalidate data to refetch
            console.log(response.status)
        } catch (err) {
            console.log(err)
        }
        updateData()
    }

    async function handleSaveData() {
        const data = JSON.stringify(content)

        const options = {
            method: "PATCH",
            body: data,
            headers: { "Content-Type": "application/json" }
        }

        const urlEnpoint = `https://codeable-keep-api-production.up.railway.app/api/${username}/notes/${content.id}`

        try {
            const response = await fetch(urlEnpoint, options)
            // const data = await response.json()
            // TODO: set tu invalidate data to refetch
            console.log(response.status)
        } catch (err) {
            console.log(err)
        }
        updateData()
    }

    useEffect(() => {
        if (colorPallete !== color) {
            handleColorNote()
        }
    }, [colorPallete, color])

    const handleCloseColorPalette = () => {
        setShowColorPalette(false); // Cerrar el menú de colores
    };

    return (<>
        <div className={`${styles.card}`} style={{ backgroundColor: colorPallete }}>
            <button className={`${styles.card__action} ${styles.card__pinn}`}
                onClick={handlerPinned}>
                <img src={pinnIcon} alt="" />
            </button>

            <input className={`${styles.card__title}`}
                value={content.title === "" ? "No title" : content.title}
                disabled={!edit}
                onChange={(e) => setContent({ ...content, title: e.target.value })} />
            <textarea className={`${styles.card__content}`}
                value={content.body === "" ? "No content" : content.body}
                disabled={!edit}
                onChange={(e) => setContent({ ...content, body: e.target.value })} />


            <div className={`${styles.card__actions}`}>
                {!deleted && <button className={`${styles.card__action}`}
                    onClick={() => setShowColorPalette(!showColorPalette)}>
                    <img src={palleteIcon} alt="pallete-icon" />
                </button>}
                {showColorPalette && (
                    <PaletaColores
                        onSelectColor={
                            (selectedColor) => {
                                setColorPallete(selectedColor)
                            }
                        }
                        onCloseMenu={handleCloseColorPalette}
                    />)}
                <button
                    onClick={() => { handleDeleteNote() }}
                    className={`${styles.card__action}`}>
                    <img src={deletIcon} alt="delete-icon" />
                </button>
                {deleted && <button
                    onClick={() => { handleRecovery() }}
                    className={`${styles.card__action}`}>
                    <img src={recoverIcon} />
                </button>}
                {!deleted && (edit ?
                    <button className={`${styles.card__action}`} onClick={() => {
                        setEdit(!edit)
                        handleSaveData()
                    }}>
                        <img src={confirmIcon} />
                    </button>
                    :
                    <button className={`${styles.card__action}`} onClick={() => setEdit(!edit)}>
                        <img src={editIcon} />
                    </button>)
                }
            </div>
        </div>
    </>)
}

export default Note