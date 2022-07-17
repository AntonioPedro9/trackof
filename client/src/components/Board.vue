<template>
  <div class="card m2 p2">
    <div class="board-header mb2">
      <h5>{{ name }}</h5>

      <div>
        <img @click="createNote()" :src="add_black" />
        <img @click="editBoard()" :src="edit_black" />
        <img @click="deleteBoard()" :src="delete_black" />
      </div>
    </div>

    <div class="note-container">
      <Note v-for="note in notes" :key="note.id" :id="note.id" :date="note.date" :text="note.text" />
    </div>
  </div>
</template>

<script>
import Note from "../components/Note.vue";
import api from "@/services/api";

export default {
  name: "Board",

  props: {
    id: Number,
    name: String,
  },

  components: {
    Note,
  },

  data() {
    return {
      notes: [],
      add_black: require("@/assets/add_black_24dp.svg"),
      edit_black: require("@/assets/edit_black_24dp.svg"),
      delete_black: require("@/assets/delete_black_24dp.svg"),
    };
  },

  mounted() {
    this.getNotes();
  },

  methods: {
    getDate() {
      let date = new Date();
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },

    createNote() {
      let note_text = prompt("New note");
      let note_date = this.getDate();

      if (note_text && note_text.trim() !== "" && note_date) {
        api
          .post("/notes", {
            text: note_text,
            date: note_date,
            board_id: this.id,
          })
          .then(() => this.getNotes())
          .catch((error) => console.log(error));
      }
    },

    getNotes() {
      api
        .get(`/notes?board_id=${this.id}`)
        .then((response) => (this.notes = response.data))
        .catch((error) => console.log(error));
    },

    editBoard() {
      let new_board_name = prompt("Rename board", this.name);

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
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 322px;
  max-width: 322px;
}
.card .board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card .board-header img {
  margin: 0.4rem;
  cursor: pointer;
  user-select: none;
}
.note-container {
  height: 320px;
  overflow-y: scroll;
}
.note-container p:last-child {
  margin-bottom: 0px;
}
.note-container::-webkit-scrollbar {
  width: 8px;
}
.note-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
.note-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
