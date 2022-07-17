const connection = require("../database/connection");

module.exports = {
  /**
   * /notes:
   *   post:
   *     description: Creates a new note in the database
   *     responses:
   *       '201':
   *         description: Note was created successfully
   *       '400':
   *         description: Failed to create note
   */
  async create(request, response) {
    try {
      const { text, date, board_id } = request.body;

      await connection("notes").insert({
        text,
        date,
        board_id,
      });

      return response.status(201).json({ message: "Note created." });
    } catch (error) {
      response.status(400);
    }
  },

  /**
   * /notes:
   *   get:
   *     description: Lists the notes of a board
   *     responses:
   *       '200':
   *         description: Board notes was listed successfully
   *       '404':
   *         description: Board ID was not informed
   *       '400':
   *         description: Failed to list notes
   */
  async list(request, response) {
    try {
      const { board_id } = request.query;

      const query = connection("notes");

      if (board_id) {
        query.where({ board_id: board_id }).join("boards", "boards.id", "=", "notes.board_id").select("notes.*");
      } else {
        return response.status(404).json({ message: "No board id informed." });
      }

      const result = await query;

      return response.status(200).json(result.reverse());
    } catch (error) {
      response.status(400);
    }
  },

  /**
   * /boards:
   *   put:
   *     description: Updates note data
   *     responses:
   *       '204':
   *         description: Note was updated successfully
   *       '400':
   *         description: Failed to update note
   */
  async update(request, response) {
    try {
      const { id } = request.params;
      const { text } = request.body;

      await connection("notes").where("id", id).update({ text });

      return response.status(204).json({ message: "Note updated." });
    } catch (error) {
      response.status(400);
    }
  },
};
