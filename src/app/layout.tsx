import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import { ResultsProvider } from "@/app/context/ResultsContext";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sisu code test",
  description: "Sisu code test application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Navbar />
        <ResultsProvider>{children}</ResultsProvider>
      </body>
    </html>
  );
}
