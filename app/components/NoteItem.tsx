"use client";

import { Note } from "../types/note";

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NoteItem({ note, onDelete, onEdit }: NoteItemProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
      <div>
        <h3 className="font-bold text-slate-800 text-base mb-2 group-hover:text-indigo-600 transition">
          {note.title}
        </h3>
        <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
          {note.description}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}