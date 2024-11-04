import "@/app/global.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#00003c] text-white">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-[#54F4D0] text-[#00003c]">
          <h1 className="font-bold">Cinema Guru</h1>
          <div className="flex items-center space-x-4">
            <span>Welcome, user@email.com</span>
            <button className="font-semibold">Logout</button>
          </div>
        </header>

        {/* Full viewport container */}
        <div className="flex h-screen">
          {/* Sidebar navigation */}
          <nav className="w-48 bg-[#1DD2AF] text-white p-6 space-y-4">
            <a href="/home" className="block font-semibold">
              Home
            </a>
            <a href="#" className="block font-semibold">
              Favorites
            </a>
            <a href="#" className="block font-semibold">
              Watch Later
            </a>
          </nav>

          {/* Main content area */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}