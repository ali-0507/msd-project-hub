import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MSD Project Hub",
  description: "Project Management System for MSD Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}