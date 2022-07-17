const connection = require("../database/connection");

module.exports = {
  /**
   * /boards:
   *   post:
   *     description: Creates a new board in the database
   *     responses:
   *       '201':
   *         description: Board was created successfully
   *       '400':
   *         description: Failed to create board
   */
  async create(request, response) {
    try {
      const { name } = request.body;

      await connection("boards").insert({ name });

      return response.status(201).json({ message: "Board created." });
    } catch (error) {
      return response.status(400);
    }
  },

  /**
   * /boards:
   *   get:
   *     description: List database boards
   *     responses:
   *       '200':
   *         description: Boards was listed successfully
   *       '400':
   *         description: Failed to list boards
   */
  async list(request, response) {
    try {
      const boards = await connection("boards").select("*");

      return response.status(200).json(boards);
    } catch (error) {
      return response.status(400);
    }
  },

  /**
   * /boards:
   *   put:
   *     description: Updates board data
   *     responses:
   *       '204':
   *         description: Board was updated successfully
   *       '400':
   *         description: Failed to update board
   */
  async update(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      await connection("boards").where("id", id).update({ name });

      return response.status(204).json({ message: "Board updated." });
    } catch (error) {
      return response.status(400);
    }
  },

  /**
   * /boards:
   *   delete:
   *     description: Deletes a board from database
   *     responses:
   *       '204':
   *         description: Board was deleted successfully
   *       '400':
   *         description: Failed to delete board
   */
  async delete(request, response) {
    try {
      const { id } = request.params;

      await connection("boards").where("id", id).delete();

      return response.status(204).json({ message: "Board deleted." });
    } catch (error) {
      return response.status(400);
    }
  },
};
