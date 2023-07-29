import React from "react";
const NoteList = ({ notes, onDeleteNote, onEditNote, onOpenModal }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {notes &&
        notes.map((note) => (
          <div key={note.id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2 overflow-ellipsis">
              {truncateText(note.title, 10)}
            </h3>
            <p>{truncateText(note.note, 30)}</p>
            <div className="mt-4">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded-md bottom-2 mr-2 border-blue-500 border-2 hover:bg-transparent"
                onClick={() => onEditNote(note)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-md border-red-500 border-2 hover:bg-transparent"
                onClick={() => onDeleteNote(note.id)}
              >
                Delete
              </button>
              <button
                className="px-2 py-1 bg-green-500 text-white rounded-md ml-2 border-green-500 border-2 hover:bg-transparent"
                onClick={() => onOpenModal(note)} // Show the popup when clicked
              >
                View
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NoteList;
