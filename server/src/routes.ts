import express from "express";
import db from "./database/connection";
import convertHourToMinutes from "./utils/converHourToMinutes";

const routes = express();

interface ScheduleItem {
  week_day: string;
  from: string;
  to: string;
}

routes.post("/classes", async (req, res) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

  const insertedUsersIds = await db("users").insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  const user_id = insertedUsersIds[0];

  const insertedClassesIds = await db("classes").insert({
    subject,
    cost,
    user_id,
  });

  const class_id = insertedClassesIds[0];

  const classSchedule = schedule.map((x: ScheduleItem) => {
    return {
      class_id,
      week_day: x.week_day,
      from: convertHourToMinutes(x.from),
      to: convertHourToMinutes(x.to),
    };
  });

  await db("class_schedule").insert(classSchedule);

  return res.send();
});

export default routes;
