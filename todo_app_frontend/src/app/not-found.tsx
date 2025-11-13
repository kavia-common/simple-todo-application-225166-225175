import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500/10 to-gray-50">
      <section className="mx-auto max-w-2xl px-4 py-14">
        <div
          className="card border border-gray-200 bg-white p-8 text-center"
          role="alert"
          aria-live="assertive"
        >
          <h1 className="text-2xl font-semibold text-[#111827]">
            404 – Page Not Found
          </h1>
          <p className="mt-2 text-sm text-[#111827]/70">
            The page you’re looking for doesn’t exist.
          </p>
        </div>
      </section>
    </main>
  );
}
