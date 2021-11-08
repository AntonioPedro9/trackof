<template>
  <div class="card theme-yellow">
    <div class="board-header">
      <h5>{{ name }}</h5>
      <div>
        <svg v-on:click="createNote()" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#444"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
        <svg v-on:click="deleteBoard()" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#444"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
      </div>
    </div>
    <Note v-for="note in notes" :key="note.id" :text="note.text" :date="note.date" />
  </div>
</template>

<script>
import Note from "../components/Note.vue";

import api from "@/services/api";

export default {
  name: "Board",

  props: {
    name: String,
    id: Number
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
  margin: 4px;
  cursor: pointer;
}
</style>
