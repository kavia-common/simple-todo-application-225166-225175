import type { Metadata } from "next";
import "./globals.css";
import { TodoProvider } from "@/store/todoStore";

export const metadata: Metadata = {
  title: "Simple Todos",
  description: "A modern, accessible todo list with Ocean Professional style.",
  applicationName: "Simple Todos",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-shell" suppressHydrationWarning>
        <TodoProvider>{children}</TodoProvider>
      </body>
    </html>
  );
}
