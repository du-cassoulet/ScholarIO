import React from "react";
import PanelLayout from "../_components/PanelLayout";
import { authenticate } from "@/api/auth";
import { getCookies } from "next-client-cookies/server";
import DisconnectButton from "./DisconnectButton";
import ThemeButton from "./ThemeButton";

export default async function Settings() {
  const cookies = getCookies();
  const token = cookies.get("token");
  const user = await authenticate(token!);

  return (
    <PanelLayout
      user={user}
      title="Paramètres"
      subtitle="Gérez vos paramètres."
    >
      <DisconnectButton />
      <ThemeButton />
    </PanelLayout>
  );
}
