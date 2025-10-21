import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Poppins } from 'next/font/google'

export const metadata: Metadata = {
  title: "Nourish Connect",
  description: "Connecting surplus food with those in need.",
};

const poppins = Poppins({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          poppins.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
