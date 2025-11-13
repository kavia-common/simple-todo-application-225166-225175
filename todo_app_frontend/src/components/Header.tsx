"use client";

import React from "react";

/**
 * PUBLIC_INTERFACE
 * Ocean Professional styled header for the Todo app.
 */
export default function Header() {
  return (
    <header
      className="w-full bg-gradient-to-br from-blue-500/10 to-gray-50"
      aria-label="Application header"
    >
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#111827]">
            Simple Todos
          </h1>
          <span
            className="inline-flex items-center rounded-full bg-[#F59E0B]/10 px-3 py-1 text-xs font-medium text-[#92400E] ring-1 ring-[#F59E0B]/30"
            aria-label="Build status"
          >
            Ocean Professional
          </span>
        </div>
        <p className="mt-2 text-sm text-[#111827]/70">
          Add tasks, mark them complete, edit titles, or remove them. Your list
          is stored locally for now.
        </p>
      </div>
    </header>
  );
}
