import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionsController {
  async getAll(req: Request, res: Response) {
    const totalConnectons = await db(`connections`).count("* as total");

    const { total } = totalConnectons[0];

    return res.json({ total });
  }

  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    await db(`connections`).insert({
      user_id,
    });

    return res.status(201);
  }
}
