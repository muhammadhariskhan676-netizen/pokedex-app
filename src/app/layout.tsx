import type { Metadata } from "next";
import Link from "next/link";
import PokeballIcon from "@/components/PokeballIcon";
import "./globals.css";

// Default metadata for the whole app. Individual pages (like the detail
// page) override the title/description with their own generateMetadata.
export const metadata: Metadata = {
  title: {
    default: "Pokedex",
    template: "%s | Pokedex",
  },
  description:
    "A simple Pokedex web app built with Next.js. Browse, search, and view details for the first 151 Pokemon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-stone-100 font-sans text-stone-900">
        <header className="bg-red-600 text-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold tracking-tight"
            >
              <PokeballIcon size={24} />
              Pokedex
            </Link>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-stone-200 bg-white py-6 text-center text-sm text-stone-400">
         © 2026 Muhammad Haris Khan. All Rights Reserved. Built with Next.js for the Frontend
        </footer>
      </body>
    </html>
  );
}
