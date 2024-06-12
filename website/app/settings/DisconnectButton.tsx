"use client";

import React from "react";
import { useCookies } from "next-client-cookies";

type DisconnectButtonProps = {
  className?: string;
};

export default async function DisconnectButton({
  className,
}: Readonly<DisconnectButtonProps>) {
  const cookies = useCookies();

  function disconnect() {
    cookies.remove("token");
    window.location.href = "/login";
  }

  return (
    <button onClick={disconnect} className={className}>
      Se Déconnecter
    </button>
  );
}
