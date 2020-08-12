import express from "express";
import ClassesController from "./controllers/classesController";
import ConnectionsController from "./controllers/connectionsController";

const routes = express();
const classesController = new ClassesController();
const connectionController = new ConnectionsController();

routes.post("/classes", classesController.create);
routes.get("/classes", classesController.getAll);

routes.post("/connections", connectionController.create);
routes.get("/connections", connectionController.getAll);

export default routes;
