import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([])

  const fetchNotes = async ()=>{
    try{
      const res = await axios.get("http://localhost:3000/api/notes")
      setNotes(res.data.notes)
      console.log("fetched data successfully.")
    }
    catch(error){
      console.error(error);
    }
  }
  
  useEffect(()=>{
    fetchNotes()
  }, [])

  return (
    <>
      <div className="notes">
        {notes.map((note,idx)=>{
          return <div key={idx} className="note">
          <h1>{note.title}</h1>
          <p>{note.description}</p>
        </div>
        })}
        
      </div>
    </>
  )
}

export default App