import React, { useState } from 'react';
import { Link } from "react-router";
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../Lib/axios';

function CreatePage() {

  const [title, setTitle] = useState("");
  const [content, setContent]= useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "") {
      toast.error("You should fill every field!");
      return;
    }

    try {
      setLoading(true);

      await api.post("/notes/", {
        title,
        content
      });

      toast.success("Note created successfully!");
      setTitle("");
      setContent("");

    } catch (error) {
      toast.error("Failed to create note");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      
      <div className="max-w-3xl mx-auto p-6">

        {/* Back Button */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm text-base-content/70 hover:text-primary transition mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to Notes
        </Link>

        {/* Card Container */}
        <div className="card bg-base-100 shadow-xl border-t-4 border-[#00ff9d]">
          <div className="card-body">

            <h1 className="card-title text-2xl font-bold">
              Create New Note
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  )
}

export default CreatePage;