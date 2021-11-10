<template>
    <p class="note-text">
      <strong>{{ date.slice(0, 10) }}: </strong>
      {{ text }}
    </p>
</template>

<script>
export default {
  name: "Note",

  props: {
    text: String,
    date: String,
  }
};
</script>

<style scoped>
.note-text {
  padding: 0px;
  margin: 0px;
  margin-bottom: 16px;
  text-align: left;
}
</style>