import React, { type ReactNode } from "react";
import styles from "./PanelLayout.module.scss";
import { Role, type User } from "@/api/auth";
import {
  PiChalkboardTeacherFill,
  PiStudentFill,
  PiStampFill,
} from "react-icons/pi";
import { GoHomeFill } from "react-icons/go";
import { RiSettings2Fill } from "react-icons/ri";
import { BiSolidMessageAlt } from "react-icons/bi";
import { FaFlagCheckered, FaBook, FaCalendarAlt } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
import SidebarTab from "./SidebarTab";
import { HiUserGroup } from "react-icons/hi2";

type PanelLayoutProps = {
  children?: ReactNode;
  user: User;
  title: string;
  subtitle: string;
};

export default function PanelLayout({
  children,
  user,
  title,
  subtitle,
}: Readonly<PanelLayoutProps>) {
  return (
    <main className={styles.main}>
      <aside className={styles.sidebar}>
        {user.role === Role.School ? (
          <ul className={styles.tabList}>
            <SidebarTab
              name="Accueil"
              href="/"
              icon={<GoHomeFill className={styles.icon} />}
            />
            <SidebarTab
              name="Professeurs"
              href="/teachers"
              icon={<PiChalkboardTeacherFill className={styles.icon} />}
            />
            <SidebarTab
              name="Élèves"
              href="/students"
              icon={<PiStudentFill className={styles.icon} />}
            />
            <SidebarTab
              name="Classes"
              href="/classes"
              icon={<HiUserGroup className={styles.icon} />}
            />
            <SidebarTab
              name="Paramètres"
              href="/settings"
              icon={<RiSettings2Fill className={styles.icon} />}
            />
          </ul>
        ) : user.role === Role.Teacher ? (
          <React.Fragment />
        ) : user.role === Role.Student ? (
          <ul className={styles.tabList}>
            <SidebarTab
              name="Accueil"
              href="/"
              icon={<GoHomeFill className={styles.icon} />}
            />
            <SidebarTab
              name="Emploi du temps"
              href="/planning"
              icon={<FaCalendarAlt className={styles.icon} />}
            />
            <SidebarTab
              name="Cahier de texte"
              href="/assignments"
              icon={<FaBook className={styles.icon} />}
            />
            <SidebarTab
              name="Notes"
              href="/notes"
              icon={<MdStickyNote2 className={styles.icon} />}
            />
            <SidebarTab
              name="Messagerie"
              href="/messages"
              icon={<BiSolidMessageAlt className={styles.icon} />}
            />
            <SidebarTab
              name="Défis"
              href="/challenges"
              icon={<FaFlagCheckered className={styles.icon} />}
            />
            <SidebarTab
              name="Absences & Sanctions"
              href="/sanctions"
              icon={<PiStampFill className={styles.icon} />}
            />
            <SidebarTab
              name="Paramètres"
              href="/settings"
              icon={<RiSettings2Fill className={styles.icon} />}
            />
          </ul>
        ) : user.role === Role.Parent ? (
          <React.Fragment />
        ) : null}
      </aside>
      <section className={styles.pageContent}>
        <nav className={styles.navbar}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </nav>
        <div className={styles.content}>{children}</div>
      </section>
    </main>
  );
}
