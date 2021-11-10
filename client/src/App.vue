<template>
  <div>
    <Header />
    <main>
      <Board
        v-for="board in boards"
        :key="board.id"
        :name="board.name"
        :id="board.id"
      />
      <button @click="createBoard()" class="fab theme-deep-orange">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0z" fill="none" /><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
      </button>
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Board from "./components/Board.vue";

import api from "./services/api";

export default {
  name: "App",

  components: {
    Header,
    Board,
  },

  data() {
    return {
      boards: [],
    };
  },

  mounted() {
    this.getBoards();
  },

  methods: {
    getBoards() {
      api
        .get("/boards")
        .then((response) => (this.boards = response.data))
        .catch((error) => console.log(error));
    },

    createBoard() {
      let board_name = prompt("Board name");

      if (board_name && board_name.trim() !== "") {
        api
          .post("/boards", { name: board_name })
          .then(() => this.getBoards())
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style>
main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
main .fab {
  position: fixed;
  right: 8vw;
  bottom: 24px;
}
</style>