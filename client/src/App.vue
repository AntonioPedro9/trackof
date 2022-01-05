<template>
  <div>
    <Header />
    <div class="boards-scroll">
      <Board v-for="board in boards" :key="board.id" :id="board.id" :name="board.name" />
    </div>
    <button @click="createBoard()" class="fab theme-deep-orange">
      <img :src="add_white" />
    </button>
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
      add_white: require("@/assets/add_white_24dp.svg"),
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
.boards-scroll {
  height: calc(100vh - 70px);
  padding: 1.6rem;
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
}
.boards-scroll::-webkit-scrollbar {
  height: 16px;
}
.boards-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
.boards-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
}
.boards-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
.fab {
  position: fixed;
  right: 8vw;
  bottom: 32px;
}
</style>
