import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from '../../Lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router';
  function NoteDetailPage() {
    const [note, setNote] = useState(null);
    const [loaidng, setloading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [originalNote, setOriginalNote] = useState(null);
    const navigate = useNavigate()
    const {id} = useParams();

   

    useEffect( ()=> {
      const fetchNotes = async() => {
        try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
        setOriginalNote(response.data);
        
      } catch (error) {
        console.log("error in updating" , error);
        toast.error("error in updating note");
        
      } finally {
        setloading(false);
      }
      } 

      fetchNotes();
    }, [id]);

    const handleDelete = async ()=> {
      if(window.confirm('You want to delete this note?')) {
        const res =await api.delete(`/notes/${id}`);
        navigate("/");
      } return;
    }
    const handleSave = async ()=> {
      setSaving(true);
       try {
        const res = await api.put(`/notes/${id}`, {
        title:note.title,
        content:note.content
        });
        toast.success("note updated successfully");
        navigate("/");

       } catch (error) {
         toast.error("Error in updating note")
       } finally {
        setSaving(false)
       }

    }
    
    if(loaidng) {
      return (
        <div className='min-h-screen bg-base-200 flex items-center justify-center'>
          <LoaderIcon className='animate-spin size-10' />
        </div>
      )
    }

    return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
    <div className="w-full max-w-2xl bg-base-100 p-8 rounded-lg shadow-md">
    {/* Top bar */}
    <div className="flex items-center justify-between mb-6">
      <Link to="/" className="btn btn-ghost">
        <ArrowLeftIcon className="h-5 w-5" /> Back to Notes
      </Link>

      <button onClick={handleDelete} className="btn btn-error btn-outline">
        <Trash2Icon className="h-5 w-5" /> Delete
      </button>
    </div>

    {/* Heading */}
    <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
      Update This Note
    </h1>

    {/* Form */}
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">Title</span>
      </label>
      <input
        type="text"
        placeholder="Note title"
        className="input input-bordered w-full"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
    </div>

    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">Content</span>
      </label>
      <textarea
        placeholder="Write your content"
        className="input input-bordered w-full"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
    </div>

    {/* Save Button */}
    <div className="flex justify-end mt-4">
      <button
        className="btn btn-primary"
        disabled={
          saving ||
          (originalNote.title.trim() === note.title.trim() &&
            note.content.trim() === originalNote.content.trim())
        }
        onClick={handleSave}
      >
        {saving ? "...loading" : "Edit Note"}
      </button>
    </div>
  </div>
</div>
    )

  }

export default NoteDetailPage