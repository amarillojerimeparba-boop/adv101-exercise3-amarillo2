"use client";

import { useState, useEffect } from "react";
import NoteFrom from "./components/NoteFrom";
import NoteItem from "./components/NoteItem";
import { Note } from "./types/note";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("nextjs_notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes) as Note[]);
      } catch (err) {
        console.error("Failed to parse notes:", err);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("nextjs_notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const handleSaveNote = (noteData: Note) => {
    if (editingNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteData.id ? noteData : note))
      );
      setEditingNote(null);
    } else {
      setNotes((prevNotes) => [noteData, ...prevNotes]);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    if (editingNote?.id === id) {
      setEditingNote(null);
    }
  };

  const handleEditSelect = (note: Note) => {
    setEditingNote(note);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 text-3xl mb-2">
            📝
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            My Note App
          </h1>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Create, manage, and edit your daily notes.
          </p>
        </header>

        {/* Note Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
          <NoteFrom
            onSaveNote={handleSaveNote}
            editingNote={editingNote}
            cancelEdit={() => setEditingNote(null)}
            existingNotes={notes}
          />
        </div>

        {/* Notes Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              My Notes
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-semibold">
                {notes.length}
              </span>
            </h2>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300">
              <span className="text-4xl mb-2 block">📄</span>
              <p className="text-slate-500 font-medium text-sm">
                No notes available. Create one above!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditSelect}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}