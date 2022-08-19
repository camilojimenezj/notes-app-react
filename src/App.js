import './styles.css'
import Note from './components/Note.js'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import {
  getAll as getAllNotes,
  update as updateNote,
  create as createNote,
  setToken
} from './services/notes.js'
import NoteForm from './components/NoteForm'

export default function App () {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState('')

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    createNote(noteObject)
      .then((note) =>
        setNotes((prevNotes) => [...prevNotes, note])
      ).catch(err => {
        setErrorMessage(`Error ${err.response.data.error}`)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    updateNote(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch((err) => {
        setErrorMessage(
          `Error ${err.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const addUser = (user) => {
    setToken(user.token)
    setUser(user)
    window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <Notification errorMessage={errorMessage} message={message} />
      {
        user
          ? <NoteForm
              handleLogout={handleLogout}
              addNote={addNote}
            />
          : <LoginForm
              setErrorMessage={setErrorMessage}
              setMessage={setMessage}
              addUser={addUser}
            />
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  )
}
