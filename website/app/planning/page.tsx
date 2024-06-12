import React from "react";
import styles from "./page.module.scss";
import moment from "moment";
import PanelLayout from "../_components/PanelLayout";
import { getCookies } from "next-client-cookies/server";
import { authenticate } from "@/api/auth";
import { events } from "@/testData";

const DAY_START = 7;
const DAY_END = 19;

export default async function Planning() {
  const cookies = getCookies();
  const token = cookies.get("token");
  const user = await authenticate(token!);

  const week = new Array(6).fill(null).map((_, i) => ({
    day: moment().startOf("week").add(i, "days"),
    get events() {
      return events.filter(
        ({ start }) =>
          start.isSame(this.day, "day") ||
          start.isBetween(this.day, this.day.clone().endOf("day"))
      );
    },
  }));

  return (
    <PanelLayout
      user={user}
      title="Emploi du temps"
      subtitle="Consultez votre emploi du temps."
    >
      <div className={styles.planningContent}>
        <div className={styles.headers}>
          {week.map(({ day }) => (
            <div className={styles.dayHeader} key={day.toString()}>
              <h3 className={styles.dayTitle}>{day.format("dddd DD MMMM")}</h3>
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {week.map(({ events }, index) => (
            <div className={styles.dayColumn} key={index}>
              <div className={styles.backGrid}>
                {new Array(DAY_END - DAY_START).fill(null).map((_, i) => (
                  <div
                    key={i}
                    className={styles.gridBox}
                    data-hour={DAY_START + i + 1}
                  />
                ))}
              </div>
              <div className={styles.eventContainer}>
                {events.map(({ start, end, title, teacher, room, color }) => (
                  <div
                    key={start.toString()}
                    className={styles.event}
                    style={{
                      top: `${
                        ((start.hours() - DAY_START) * 100 +
                          (start.minutes() * 100) / 60) /
                        (DAY_END - DAY_START)
                      }%`,
                      height: `calc(${
                        ((end.hours() - start.hours()) * 100 +
                          ((end.minutes() - start.minutes()) * 100) / 60) /
                        (DAY_END - DAY_START)
                      }% - 1px)`,
                      borderLeftColor: color,
                    }}
                  >
                    <div className={styles.textInfo}>
                      <div className={styles.interval}>
                        <time dateTime={start.format("yyyy-MM-DD HH:mm")}>
                          {start.format("HH:mm")}
                        </time>{" "}
                        -{" "}
                        <time dateTime={end.format("yyyy-MM-DD HH:mm")}>
                          {end.format("HH:mm")}
                        </time>
                      </div>
                      <strong className={styles.title}>{title}</strong>
                      <div className={styles.teacher}>{teacher}</div>
                    </div>
                    <div className={styles.room}>{room}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
}
