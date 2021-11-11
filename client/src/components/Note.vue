<template>
  <p>
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
}
</style>