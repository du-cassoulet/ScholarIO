import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scholario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
