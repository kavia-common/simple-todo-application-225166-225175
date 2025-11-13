# Simple Todo Frontend (Next.js)

A modern, accessible todo list built with Next.js (App Router), styled with the Ocean Professional theme (blue primary, amber accents). Supports adding, viewing, editing, completing, and deleting tasks. Data is persisted to `localStorage` as an interim solution, and the API layer is ready to switch to a backend using `NEXT_PUBLIC_API_BASE`.

## Quick Start

- Port: 3000 (Next.js default)
- Requirements: Node 18+ recommended

Install and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Features

- Add tasks with input validation (non-empty)
- Edit task titles inline with validation
- Toggle complete/incomplete
- Delete tasks
- Persist to `localStorage`
- Accessible markup and keyboard-friendly controls
- Ocean Professional styling with subtle gradients, rounded corners, and transitions

## Project Structure

- src/lib/api.ts: Swappable API layer
  - listTodos, addTodo, updateTodo, deleteTodo
  - Currently backed by `localStorage`; later can point at `NEXT_PUBLIC_API_BASE`
- src/store/todoStore.tsx: React Context store for app state and actions
- src/components:
  - Header.tsx
  - TodoInput.tsx
  - TodoList.tsx
  - TodoItem.tsx
- src/app:
  - layout.tsx
  - page.tsx
  - not-found.tsx
  - globals.css

## Switching to a Backend

Set `NEXT_PUBLIC_API_BASE` to your backend base URL and enable the fetch blocks in `src/lib/api.ts` (commented examples included).

Environment variables recognized (not all used by default here):
- NEXT_PUBLIC_API_BASE
- NEXT_PUBLIC_BACKEND_URL
- NEXT_PUBLIC_FRONTEND_URL
- NEXT_PUBLIC_WS_URL
- NEXT_PUBLIC_NODE_ENV
- NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED
- NEXT_PUBLIC_ENABLE_SOURCE_MAPS
- NEXT_PUBLIC_PORT
- NEXT_PUBLIC_TRUST_PROXY
- NEXT_PUBLIC_LOG_LEVEL
- NEXT_PUBLIC_HEALTHCHECK_PATH
- NEXT_PUBLIC_FEATURE_FLAGS
- NEXT_PUBLIC_EXPERIMENTS_ENABLED

Note: The app runs without any of these set; `NEXT_PUBLIC_API_BASE` is optional for future backend connectivity.

## Accessibility

- Form inputs have labels (screen-reader only where appropriate)
- Buttons include descriptive aria-labels
- Error messages associated via aria-describedby
- Focus-visible styles for keyboard users

## Testing

No test framework is preconfigured in this template. If you add one later (e.g., Jest/RTL), you can test:
- Input validation for empty tasks
- Store actions (create, toggle, edit, remove)
- API layer behavior (localStorage)

## Deployment

- `npm run build` to build
- `npm start` to run production server

This project uses Next.js defaults and runs on port 3000.
