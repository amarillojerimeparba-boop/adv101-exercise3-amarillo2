"use client";

import { useState, useEffect } from "react";
import { Note } from "../types/note";

interface NoteFormProps {
  onSaveNote: (note: Note) => void;
  editingNote: Note | null;
  cancelEdit: () => void;
  existingNotes: Note[];
}

export default function NoteForm({
  onSaveNote,
  editingNote,
  cancelEdit,
}: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSaveNote({
      id: editingNote ? editingNote.id : Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <span className="text-indigo-600">{editingNote ? "✏️" : "➕"}</span>
        {editingNote ? "Edit Note" : "Add New Note"}
      </h3>

      <div className="space-y-1">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 text-sm outline-none transition"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write description here..."
          rows={3}
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 text-sm outline-none transition resize-none"
          required
        />
      </div>

      <div className="flex gap-2 justify-end pt-2">
        {editingNote && (
          <button
            type="button"
            onClick={cancelEdit}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-200 transition active:scale-95"
        >
          {editingNote ? "Update Note" : "Save Note"}
        </button>
      </div>
    </form>
  );
}