const connection = require("../database/connection");

module.exports = {

  async create(request, response, next) {
    try {
      const { name } = request.body;

      await connection("boards").insert({ name });

      return response.json({ message: "Board created." });
    }
    catch (error) {
      next(error);
    }
  },

  async list(request, response, next) {
    try {
      const boards = await connection("boards").select("*");

      return response.json(boards);
    }
    catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const { id } = request.params;
      const { name } = request.body;

		  await connection("boards").where("id", id).update({ name });

      return response.json({ message: "Board updated." });
    }
    catch (error) {
      next(error);
    }
  },

  async delete(request, response, next) {
    try {
      const { id } = request.params;

		  await connection("boards").where("id", id).delete();

      return response.json({ message: "Board deleted." });
    }
    catch (error) {
      next(error);
    }
  }

};