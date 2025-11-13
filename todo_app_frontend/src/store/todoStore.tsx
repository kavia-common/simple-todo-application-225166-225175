"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Todo } from "@/lib/api";
import { listTodos, addTodo, updateTodo, deleteTodo } from "@/lib/api";

/**
 * Store and Provider backed by React Context to manage Todo state.
 * Provides actions and centralizes side effects to the API layer.
 */

type TodoContextState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  create: (title: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  editTitle: (id: string, title: string) => Promise<void>;
};

const TodoContext = createContext<TodoContextState | undefined>(undefined);

/**
 * PUBLIC_INTERFACE
 * Hook to access the Todo context.
 */
export function useTodoStore(): TodoContextState {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error("useTodoStore must be used within TodoProvider");
  }
  return ctx;
}

/**
 * PUBLIC_INTERFACE
 * Provider component that loads todos from the API/localStorage and exposes actions.
 */
export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await listTodos();
      setTodos(items);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const create = useCallback(async (title: string) => {
    try {
      setError(null);
      const t = await addTodo(title);
      setTodos((prev) => [t, ...prev]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to add todo");
      throw e;
    }
  }, []);

  const toggleComplete = useCallback(async (id: string) => {
    try {
      setError(null);
      const current = todos.find((t) => t.id === id);
      if (!current) throw new Error("Todo not found");
      const updated = await updateTodo(id, { completed: !current.completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to update todo");
    }
  }, [todos]);

  const remove = useCallback(async (id: string) => {
    try {
      setError(null);
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to delete todo");
    }
  }, []);

  const editTitle = useCallback(async (id: string, title: string) => {
    try {
      setError(null);
      const updated = await updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to update todo");
      throw e;
    }
  }, []);

  const value = useMemo(
    () => ({ todos, loading, error, refresh, create, toggleComplete, remove, editTitle }),
    [todos, loading, error, refresh, create, toggleComplete, remove, editTitle]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
