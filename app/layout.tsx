import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "Lili Bee Jewels Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${inter.className} flex h-screen flex-col`}>
        <div className="flex flex-1">
          <main className="w-full md:w-3/4">
            <div className="wrapper">{children}</div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
