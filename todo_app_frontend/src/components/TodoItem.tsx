"use client";

import React, { useState } from "react";
import { useTodoStore } from "@/store/todoStore";
import type { Todo } from "@/lib/api";

/**
 * PUBLIC_INTERFACE
 * Single todo item row with complete toggle, inline edit, and delete.
 */
export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleComplete, remove, editTitle } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [error, setError] = useState<string | null>(null);

  const onSave = async () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Title cannot be empty.");
      return;
    }
    try {
      await editTitle(todo.id, trimmed);
      setIsEditing(false);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    }
  };

  return (
    <li
      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
      role="listitem"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          onClick={() => toggleComplete(todo.id)}
          className={`h-5 w-5 rounded border transition ${
            todo.completed
              ? "bg-[#2563EB] border-[#2563EB]"
              : "bg-white border-gray-300"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50`}
        >
          {todo.completed ? (
            <span className="block h-full w-full text-white text-center leading-5 text-xs">✓</span>
          ) : null}
        </button>

        {isEditing ? (
          <div>
            <label className="sr-only" htmlFor={`edit-${todo.id}`}>
              Edit task title
            </label>
            <input
              id={`edit-${todo.id}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="min-w-[200px] rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30"
              aria-invalid={!!error}
              aria-describedby={error ? `edit-err-${todo.id}` : undefined}
            />
            {error && (
              <p id={`edit-err-${todo.id}`} className="mt-1 text-xs text-[#EF4444]">
                {error}
              </p>
            )}
          </div>
        ) : (
          <p
            className={`text-sm text-[#111827] ${
              todo.completed ? "line-through text-[#111827]/50" : ""
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>

      <div className="ml-4 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={onSave}
              className="rounded-md bg-[#2563EB] px-3 py-1 text-xs font-medium text-white shadow-sm transition hover:bg-[#1e4fc7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setTitle(todo.title);
                setError(null);
              }}
              className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-[#111827] shadow-sm transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-md bg-[#F59E0B]/10 px-3 py-1 text-xs font-medium text-[#92400E] shadow-sm ring-1 ring-[#F59E0B]/30 transition hover:bg-[#F59E0B]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => remove(todo.id)}
              className="rounded-md bg-[#EF4444]/10 px-3 py-1 text-xs font-medium text-[#991B1B] shadow-sm ring-1 ring-[#EF4444]/30 transition hover:bg-[#EF4444]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/30"
              aria-label="Delete task"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
