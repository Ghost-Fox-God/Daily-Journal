import React, { useState } from 'react';

const NoteEditor = ({ note, onSaveNote }) => {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSaveChanges = () => {
    onSaveNote({
      id: Math.floor(Math.random() * 1000000),
      title: editedTitle,
      content: editedContent,
    });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <input
        type="text"
        className="w-full mb-2 px-4 py-2 rounded-md border"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        className="w-full h-24 mb-2 px-4 py-2 rounded-md border resize-none"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      ></textarea>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md"
          onClick={handleSaveChanges}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={() => onSaveNote(null)} // Pass null to indicate cancel
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
