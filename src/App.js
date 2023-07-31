import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import Note from "./components/Note";
import NoteList from "./components/NoteList";
import NotePopup from "./components/NotePopup";
import axios from "axios";

Modal.setAppElement("#root");

const App = () => {
	const [notes, setNotes] = useState([]);
	const [editNote, setEditNote] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [modalNote, setModalNote] = useState(null);

	const handleAddNote = (newNote) => {
		const id = uuidv4();
		setNotes([...notes, { ...newNote, id }]);
	};

	const handleEditNote = (note) => {
		setEditNote(note);
	};

	const handleUpdateNote = (updatedNote) => {
		const updatedNotes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note));
		setNotes(updatedNotes);
		setEditNote(null);
	};

	const handleDeleteNote = async (id) => {
		try {
			const response = await axios.delete(process.env.REACT_APP_API, { data: { id: id } });
			const updatedNotes = notes.filter((note) => note.id !== id);
			setNotes(updatedNotes);
		} catch (err) {
			console.log("There is an error in deletion", err);
		}
	};

	const handleOpenModal = (note) => {
		setModalNote(note);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(process.env.REACT_APP_API);
				const data = JSON.parse(response.data.body);
				setNotes(data);
			} catch (err) {
				console.error("There is an error fetching the API", err);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen text-white">
			<h1 className="text-3xl font-bold mb-4">Note-taking App</h1>

			<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
				<div className="col-span-2">
					<Note onAddNote={handleAddNote} editNote={editNote} onEditNote={handleUpdateNote} setEditNote={setEditNote} />
				</div>
			</div>
			<div className="mt-8">
				<NoteList notes={notes} onDeleteNote={handleDeleteNote} onEditNote={handleEditNote} onOpenModal={handleOpenModal} />
			</div>
			<NotePopup // Render the NotePopup component
				showModal={showModal}
				modalNote={modalNote}
				onCloseModal={handleCloseModal}
			/>
		</div>
	);
};

export default App;
