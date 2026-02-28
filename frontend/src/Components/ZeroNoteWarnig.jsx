import React from "react";
import { Link } from "react-router";
import { FileTextIcon, PlusCircleIcon } from "lucide-react";

function ZeroNoteWarning() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-base-100 shadow-lg rounded-xl p-8 text-center max-w-md w-full">

        {/* Icon */}
        <FileTextIcon className="mx-auto mb-4 h-16 w-16 text-green-600 opacity-70" />

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-2">
          No Notes Found
        </h2>

        {/* Description */}
        <p className="text-base-content/70 mb-6">
          Currently there are no notes available.  
          Start by creating your first note!
        </p>

        {/* Button */}
        <Link to="/create">
          <button className="btn btn-primary gap-2">
            <PlusCircleIcon className="h-5 w-5" />
            Create Your First Note
          </button>
        </Link>

      </div>
    </div>
  );
}

export default ZeroNoteWarning;