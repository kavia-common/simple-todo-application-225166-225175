"use client";

import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main>
      <Header />
      <section
        className="mx-auto max-w-2xl px-4 py-8"
        aria-labelledby="todos-section-title"
      >
        <div className="card border border-gray-200 p-5 bg-white/90">
          <div className="mb-5">
            <h2
              id="todos-section-title"
              className="text-lg font-semibold text-[#111827]"
            >
              Your Tasks
            </h2>
            <p className="text-sm text-[#111827]/70">
              Keep track of what needs doing. Add a task below.
            </p>
          </div>
          <TodoInput />
          <div className="mt-6">
            <TodoList />
          </div>
        </div>
      </section>
      <footer className="mx-auto max-w-2xl px-4 pb-10 text-center text-xs text-[#111827]/60">
        Tip: Your tasks are saved in your browser. Configure NEXT_PUBLIC_API_BASE later to sync.
      </footer>
    </main>
  );
}
