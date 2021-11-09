<template>
  <div class="card">
    <div class="board-header">
      <h5>{{ name }}</h5>
      <div>
        <svg @click="createNote()" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#444"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        <svg @click="editBoard()" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#444"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        <svg @click="deleteBoard()" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#444"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      </div>
    </div>
    <Note v-for="note in notes" :key="note.id" :date="note.date" :text="note.text" />
  </div>
</template>

<script>
import Note from "../components/Note.vue";

import api from "@/services/api";

export default {
  name: "Board",

  props: {
    name: String,
    id: Number,
  },

  components: {
    Note,
  },

  data() {
    return {
      notes: [],
    };
  },

  mounted() {
    this.getNotes();
  },

  methods: {
    getNotes() {
      api
        .get(`/notes?board_id=${this.id}`)
        .then((response) => (this.notes = response.data))
        .catch((error) => console.log(error));
    },

    createNote() {
      let note_text = prompt("New note");

      if (note_text && note_text.trim() !== "") {
        api
          .post("/notes", { text: note_text, board_id: this.id })
          .then(() => this.getNotes())
          .catch((error) => console.log(error));
      }
    },

    editBoard() {
      let new_board_name = prompt("Rename board");

      if (new_board_name && new_board_name.trim() !== "") {
        api
          .put(`/boards/${this.id}`, { name: new_board_name })
          .then(() => this.$parent.getBoards())
          .catch((error) => console.log(error));
      }
    },

    deleteBoard() {
      let proceed = confirm("Delete board?");

      if (proceed) {
        api
          .delete(`/boards/${this.id}`)
          .then(() => this.$parent.getBoards())
          .catch((error) => console.log(error));
      }
    }
  }
};
</script>

<style scoped>
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.board-header svg {
  margin: 0.4rem;
  cursor: pointer;
}
</style>
