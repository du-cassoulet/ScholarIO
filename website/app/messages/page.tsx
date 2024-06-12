import React from "react";
import PanelLayout from "../_components/PanelLayout";
import { getCookies } from "next-client-cookies/server";
import { authenticate } from "@/api/auth";

export default async function Messages() {
  const cookies = getCookies();
  const token = cookies.get("token");
  const user = await authenticate(token!);

  return (
    <PanelLayout
      user={user}
      title="Messagerie"
      subtitle="Consultez vos messages."
    ></PanelLayout>
  );
}
