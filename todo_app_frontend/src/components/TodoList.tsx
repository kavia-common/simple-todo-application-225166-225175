"use client";

import React from "react";
import { useTodoStore } from "@/store/todoStore";
import TodoItem from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * Renders a list of TodoItem with empty and loading states.
 */
export default function TodoList() {
  const { todos, loading, error } = useTodoStore();

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-gray-200 bg-white px-4 py-6 text-sm text-[#111827]/70 shadow-sm"
      >
        Loading your tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/5 px-4 py-3 text-sm text-[#991B1B] shadow-sm"
      >
        {error}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-sm text-[#111827]/60 shadow-sm">
        No tasks yet. Add your first task above.
      </div>
    );
  }

  return (
    <ul role="list" className="space-y-2">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
    </ul>
  );
}
