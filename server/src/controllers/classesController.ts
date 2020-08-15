import db from "../database/connection";
import convertHourToMinutes from "../utils/converHourToMinutes";
import { Request, Response } from "express";
import { ScheduleItem } from "../interfaces/ScheduleItem";

export default class ClassesController {
  async getAll(req: Request, res: Response) {
    const filters = req.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: "Missing filters to search",
      });
    }

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const timeInMinutes = convertHourToMinutes(time);

    console.log(timeInMinutes);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id`= `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day`= ??", [Number(week_day)])
          .whereRaw("`class_schedule`.`from`<= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return res.json(classes);
  }

  async create(req: Request, res: Response) {
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
          week_day: Number(x.week_day),
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
  }
}
