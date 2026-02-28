import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import RateLimitedUI from '../Components/RatelimitedUi';
import { useState } from 'react';
import toast from "react-hot-toast"
import NoteCard from '../Components/NoteCard';
import api from '../../Lib/axios';
import ZeroNoteWarning from '../Components/ZeroNoteWarnig';

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
  const fetchNotes = async () => {
    try {
      const response = await api.get("/notes");
      //console.log("DATA:", response.data);
      setNotes(response.data);
      setIsRateLimited(false)
    } catch (error) {
       console.log("FULL ERROR:", error);

  if (error.response?.status === 429) {
    console.log("RATE LIMITED");
    setIsRateLimited(true);
  } else {
    console.log("OTHER ERROR");
    toast.error("failed to load notes");
  }
    } finally {
      setLoading(false)
    }
  };

  fetchNotes();
}, []);

  return (
  
    
     
  <div>
    <Navbar />

    <div className="max-w-7xl mx-auto p-4 mt-6">

      {/* 1️⃣ Loading */}
      {loading && (
        <div className="text-center text-primary py-10">
          ...loading
        </div>
      )}

      {/* 2️⃣ Rate Limited */}
      {!loading && isRateLimited && (
        <RateLimitedUI />
      )}

      {/* 3️⃣ No Notes */}
      {!loading && !isRateLimited && notes.length === 0 && (
        <ZeroNoteWarning />
      )}

      {/* 4️⃣ Notes Grid */}
      {!loading && !isRateLimited && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map(note => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}

    </div>
  </div>
);

}

export default HomePage;