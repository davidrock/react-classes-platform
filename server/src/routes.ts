import express from "express";
import ClassesController from "./controllers/classesController";

const routes = express();
const classesController = new ClassesController();

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.getAll);

export default routes;
