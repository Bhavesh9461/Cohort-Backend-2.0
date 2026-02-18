import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notes");
      setNotes(res.data.notes);
      console.log("fetched data successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    try {
      const res = await axios.post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      });
      console.log(res.data);
      fetchNotes();
      setTitle("");
      setDesc("");
    } catch (error) {
      console.error(error);
    }
  }

  function handleDelete(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then(() => {
      console.log("note deleted");
      fetchNotes();
    });
  }


  return (
    <>
      <form className="notesForm" action="#" onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          name="title"
          type="text"
          placeholder="Enter title"
        />

        <input
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
          name="description"
          type="text"
          placeholder="Enter description"
        />

        <button>create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDelete(note._id);
                }}
              >
                Delete
              </button>

            </div>
          );
        })}

      </div>
    </>
  );
};

export default App;
