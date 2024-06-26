import React from "react";
import { getCookies } from "next-client-cookies/server";
import { authenticate } from "@/api/auth";
import PanelLayout from "./_components/PanelLayout";

export default async function Home() {
  const cookies = getCookies();
  const token = cookies.get("token");
  if (!token) window.location.href = "/login";
  const user = await authenticate(token!);

  return (
    <PanelLayout
      user={user}
      title="Accueil"
      subtitle="Bienvenue sur votre espace personnel."
    ></PanelLayout>
  );
}
