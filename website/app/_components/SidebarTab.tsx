"use client";

import React, { useEffect, type ReactNode } from "react";
import Link from "next/link";
import styles from "./PanelLayout.module.scss";

type SidebarTabProps = {
  name: string;
  subName?: string;
  href: string;
  icon: ReactNode;
};

export default function SidebarTab({
  name,
  subName,
  icon,
  href,
}: Readonly<SidebarTabProps>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const tabs = document.querySelectorAll("a");
      const tab = document.querySelector(`a[href='${currentPath}']`);

      tabs.forEach((tab) => tab.classList.remove(styles.active));

      if (tab) tab.classList.add(styles.active);
    }
  }, []);

  return (
    <li>
      <Link href={href} className={styles.tab}>
        <div className={styles.iconContainer}>{icon}</div>
        <div>
          <p className={styles.tabName}>{name}</p>
          {subName && <p className={styles.tabSubname}>{subName}</p>}
        </div>
      </Link>
    </li>
  );
}
