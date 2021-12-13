<template>
  <p @click="updateNote()">
    <strong>{{ date.slice(0, 10) }}: </strong>
    {{ text }}
  </p>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Note",

  props: {
    id: Number,
    date: String,
    text: String,
  },

  methods: {
    updateNote() {
      let new_note_text = prompt("Edit note", this.text);

      if (new_note_text && new_note_text.trim() !== "") {
        api
          .put(`/notes/${this.id}`, { text: new_note_text })
          .then(() => this.$parent.getNotes())
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
p {
  padding: 0px;
  padding-right: 8px;
  margin: 0px;
  margin-bottom: 16px;
  text-align: left;
  transition: all 0.1s;
}
p:hover {
  opacity: 0.6;
  cursor: pointer;
}
</style>
