import React, { useState, useEffect } from "react";
import axios from "axios";

const Note = ({ onAddNote, editNote, onEditNote, setEditNote }) => {
	const [title, setTitle] = useState("");
	const [note, setNote] = useState("");

	useEffect(() => {
		if (editNote) {
			setTitle(editNote.title);
			setNote(editNote.note);
		}
	}, [editNote]);

	const handleSaveNote = async () => {
		if (title && note) {
			if (editNote) {
				try {
					const response = await axios.put(process.env.REACT_APP_API, { id: editNote.id, title, note });
					onEditNote({ id: editNote.id, title, note });
				} catch (err) {
					console.log("There is an error in editing Notes", err);
				}
			} else {
				try {
					const response = await axios.post(process.env.REACT_APP_API, { title, note });
					onAddNote({ title, note });
				} catch (err) {
					console.log("There is an error in Saving the Note", err);
				}
			}

			setTitle("");
			setNote("");
			setEditNote(null); // Add this line to reset the edit mode after saving the note
		}
	};
	return (
		<div className="p-4 border rounded-lg shadow-md text-white ">
			<input
				type="text"
				className="w-full mb-2 px-4 py-2 rounded-md border text-lg font-semibold bg-gray-500"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				className="w-full h-24 mb-2 px-4 py-2 rounded-md border resize-none text-xl bg-gray-600"
				placeholder="Write your note here..."
				value={note}
				onChange={(e) => setNote(e.target.value)}
			></textarea>
			{editNote ? (
				<>
					<button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 border-blue-500 border-2 hover:bg-transparent" onClick={handleSaveNote}>
						Update
					</button>
				</>
			) : (
				<button className="px-4 py-2 bg-blue-500 text-white rounded-md border-blue-500 border-2 hover:bg-transparent" onClick={handleSaveNote}>
					Save
				</button>
			)}
		</div>
	);
};

export default Note;
