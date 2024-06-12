import React from "react";
import styles from "./page.module.scss";
import moment from "moment";
import PanelLayout from "../_components/PanelLayout";
import { getCookies } from "next-client-cookies/server";
import { authenticate } from "@/api/auth";
import { assignments, type Assignment } from "@/testData";

export default async function Assignments() {
  const cookies = getCookies();
  const token = cookies.get("token");
  const user = await authenticate(token!);

  const days = assignments.reduce((acc, assignment) => {
    const day = assignment.due.format("YYYY-MM-DD");
    if (!acc[day]) acc[day] = [];
    acc[day].push(assignment);
    return acc;
  }, {} as Record<string, Assignment[]>);

  return (
    <PanelLayout
      user={user}
      title="Cahier de texte"
      subtitle="Consultez votre cahier de texte."
    >
      <div className={styles.assignmentsContent}>
        {Object.entries(days)
          .sort(([a], [b]) => moment(a).diff(moment(b)))
          .map(([day, assignments]) => (
            <div key={day} className={styles.assignmentsDay}>
              <span>
                <h2 className={styles.assignmentDayLabel}>
                  {moment(day).format("dddd D MMMM YYYY")}
                </h2>
                <span className={styles.assignmentCount}>
                  {assignments.length}{" "}
                  {assignments.length > 1 ? "devoirs" : "devoir"}
                </span>
              </span>
              {assignments.map((assignment, index) => (
                <div key={index} className={styles.assignment}>
                  <div>
                    <div className={styles.headRow}>
                      <div
                        style={{ background: assignment.color }}
                        className={styles.assignmentColor}
                      />
                      <h3 className={styles.assignmentHeader}>
                        {assignment.subject}
                      </h3>
                      <span className={styles.isGraded}>
                        {assignment.graded && "(Évalué)"}
                      </span>
                    </div>
                    <p className={styles.assignmentTeacher}>
                      {assignment.teacher}
                    </p>
                    <p className={styles.assignmentDescription}>
                      {assignment.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={assignment.done}
                    className={styles.doneCheckbox}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </PanelLayout>
  );
}
