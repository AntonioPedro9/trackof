const express = require("express");
const routes = express.Router();

/**
 * Board routes
 */
const BoardController = require("./controllers/BoardController");
routes.post("/boards", BoardController.create);
routes.get("/boards", BoardController.list);
routes.put("/boards/:id", BoardController.update);
routes.delete("/boards/:id", BoardController.delete);

/**
 * Note routes
 */
const NoteController = require("./controllers/NoteController");
routes.post("/notes", NoteController.create);
routes.get("/notes", NoteController.list);
routes.put("/notes/:id", NoteController.update);

module.exports = routes;
