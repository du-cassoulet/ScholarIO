import React from "react";
import styles from "./page.module.scss";
import PanelLayout from "../_components/PanelLayout";
import { getCookies } from "next-client-cookies/server";
import { authenticate } from "@/api/auth";
import { Subject, subjects } from "@/testData";
import { MdNewReleases } from "react-icons/md";

const NORMALIZED_POINTS = 20;

export default async function Notes() {
  const cookies = getCookies();
  const token = cookies.get("token");
  const user = await authenticate(token!);

  function classGeneralAverage(subject: Subject) {
    const sum = subject.notes.reduce(
      (acc, note) =>
        acc +
        (note.average / (note.points ?? NORMALIZED_POINTS)) *
          NORMALIZED_POINTS *
          note.coefficient,
      0
    );

    const totalCoefficient = subject.notes.reduce(
      (acc, note) => acc + note.coefficient,
      0
    );

    return sum / totalCoefficient;
  }

  function generalAverage(subject: Subject) {
    const sum = subject.notes.reduce(
      (acc, note) =>
        acc +
        (note.grade / (note.points ?? NORMALIZED_POINTS)) *
          NORMALIZED_POINTS *
          note.coefficient,
      0
    );

    const totalCoefficient = subject.notes.reduce(
      (acc, note) => acc + note.coefficient,
      0
    );

    return sum / totalCoefficient;
  }

  return (
    <PanelLayout user={user} title="Notes" subtitle="Consultez vos notes.">
      <div className={styles.notesContent}>
        {subjects.map((subject) => (
          <div
            key={subject.name}
            className={styles.subject}
            style={{ borderLeftColor: subject.color }}
          >
            <div className={styles.subjectHeader}>
              <div className={styles.textHeader}>
                <div className={styles.averageContainer}>
                  <p>
                    {generalAverage(subject).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <h3 className={styles.subjectName}>{subject.name}</h3>
              </div>
              <p className={styles.detailRow}>
                Coef. : {Math.round(subject.coefficient * 100) / 100} - Classe :{" "}
                {classGeneralAverage(subject).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                - Min. : {subject.minimumAverage} - Max. :{" "}
                {subject.maximumAverage}
              </p>
            </div>
            <div className={styles.notes}>
              {subject.notes.map((note, index) => (
                <button key={index} className={styles.note}>
                  <MdNewReleases
                    className={styles.newNote}
                    title="Nouvelle Note"
                  />
                  <p>{note.grade}</p>
                  {note.points && (
                    <p className={styles.points}>/{note.points}</p>
                  )}
                  {note.coefficient !== 1 && (
                    <p className={styles.coefficient}>
                      ({Math.round(note.coefficient * 100) / 100})
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelLayout>
  );
}
