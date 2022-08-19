import { useState, useRef } from 'react'
import Togglable from './Togglable'

export default function NoteForm ({ handleLogout, addNote }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: true
    }

    addNote(noteObject)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <>
      <Togglable buttonLabel='New Note' ref={togglableRef}>
        <h3>Create a new note</h3>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={handleChange}
            value={newNote}
            placeholder='Write your note content'
          />
          <button>Save</button><br />
          <button onClick={handleLogout}>
            Logout
          </button>
        </form>
      </Togglable>
    </>
  )
}
