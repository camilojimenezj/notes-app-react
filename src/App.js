import "./styles.css";
import Note from "./Note.js";
import { useState, useEffect } from "react";
import {
  getAll as getAllNotes,
  create as createNote
} from "./services/notes/index.js";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("crear nota", newNote);
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    };

    createNote(noteToAddToState).then((note) =>
      setNotes((prevNotes) => [...prevNotes, note])
    );

    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <ol className="App">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear Nota</button>
      </form>
    </div>
  );
}
