const connection = require("../database/connection");

module.exports = {

  async create(request, response, next) {
    try {
      const { text, board_id } = request.body;

      await connection("notes").insert({ 
        text,
        board_id
      });

      return response.json({ message: "Note created." });
    }
    catch (error) {
      next(error);
    }
  },

  async list(request, response, next) {
    try {
      const { board_id } = request.query;

      const query = connection("notes");

      if (board_id) {
        query
          .where({ board_id: board_id })
          .join("boards", "boards.id", "=", "notes.board_id")
          .select("notes.*");
      }
      else {
        return response.json({ message: "No board id informed." });
      }

      const result = await query;

      return response.json(result.reverse());
    }
    catch (error) {
      next(error);
    }
  },

};