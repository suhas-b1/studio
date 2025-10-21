import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nourish Connect",
  description: "Connecting surplus food with those in need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased"
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
