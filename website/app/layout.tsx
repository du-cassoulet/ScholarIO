import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { CookiesProvider, getCookies } from "next-client-cookies/server";
import "./globals.scss";
import { ThemeProvider } from "@/context/ThemeContext";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scholario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookies = getCookies();
  const theme = cookies.get("theme");

  return (
    <html lang="fr" className={theme === "dark" ? "dark" : undefined}>
      <body className={rubik.className} suppressHydrationWarning={true}>
        <CookiesProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
