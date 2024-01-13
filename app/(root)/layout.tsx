import type { Metadata } from "next";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="w-full md:w-3/4">
          <Header />
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
}
