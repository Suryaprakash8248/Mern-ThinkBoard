import { PenSquareIcon, Trash } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import { formatDate } from '../../Lib/utility.js';
import api from "../../Lib/axios.js";
import Toast from "react-hot-toast";
import NoteDetailPage from '../pages/NoteDetailPage.jsx';

const NoteCard =  ({note, setNotes}) => {
    async function deleteNote (e,id) {
    e.preventDefault();
    if (!window.confirm("Do you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id));
      Toast.success('Note deleted successfully!');
    } catch (error) {
      console.log("Error in deleting note",error);
      Toast.error("Failed in Deleting Note ");
      
    }
  }
   return <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]'>
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
            {formatDate(note.createdAt)}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <PenSquareIcon className='size-4' />
          <button className='btn btn-ghost btn-xs text-error' onClick={(e)=> (deleteNote(e,note._id))}>
            <Trash className='size-4' />
          </button>
        </div>
      </div> 
    </Link>
}

export default NoteCard;