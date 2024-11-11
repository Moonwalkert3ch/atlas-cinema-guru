import "@/app/global.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import SideBarNav from "@/components/SideBarNav";

export const metadata: Metadata = {
  title: "Cinema Guru | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`antialiased  bg-[#00003c] text-white`}>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <SideBarNav />
            <div className="flex-1 p-8 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}