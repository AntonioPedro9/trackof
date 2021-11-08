const express = require("express");
const routes = express.Router();

const BoardController = require("./controllers/BoardController");
const NoteController = require("./controllers/NoteController");

routes.post("/boards", BoardController.create);
routes.get("/boards", BoardController.list);
routes.put("/boards/:id", BoardController.update);
routes.delete("/boards/:id", BoardController.delete);

routes.post("/notes", NoteController.create);
routes.get("/notes", NoteController.list);

module.exports = routes;