"use client";

import React, { useState } from "react";
import { useTodoStore } from "@/store/todoStore";

/**
 * PUBLIC_INTERFACE
 * Input form to add a new todo. Validates non-empty input.
 */
export default function TodoInput() {
  const { create } = useTodoStore();
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a task.");
      return;
    }
    try {
      await create(trimmed);
      setTitle("");
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unable to add task");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-start gap-2"
      aria-labelledby="todo-input-label"
    >
      <div className="flex-1">
        <label id="todo-input-label" htmlFor="todo-title" className="sr-only">
          Add a new task
        </label>
        <input
          id="todo-title"
          name="todo-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          className="w-full rounded-lg border border-gray-200 bg-white/90 px-4 py-3 text-[#111827] shadow-sm outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/30"
          aria-invalid={!!error}
          aria-describedby={error ? "todo-input-error" : undefined}
        />
        {error && (
          <p id="todo-input-error" className="mt-1 text-sm text-[#EF4444]">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-[#2563EB] px-4 py-3 text-white shadow-sm transition hover:bg-[#1e4fc7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]/50"
        aria-label="Add task"
      >
        Add
      </button>
    </form>
  );
}
