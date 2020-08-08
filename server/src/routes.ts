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
  const trx = await db.transaction();
  try {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

    const insertedUsersIds = await trx("users").insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesIds = await trx("classes").insert({
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

    await trx("class_schedule").insert(classSchedule);

    trx.commit();

    return res.status(201).send();
    
  } catch (error) {
    trx.rollback();
    console.log(error);
    return res.status(400).json({
      msg: "Unexpected error while creating new class",
    });
  }
});

export default routes;
