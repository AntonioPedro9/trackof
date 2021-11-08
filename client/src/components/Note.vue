<template>
  <div>
    <p>
      <strong>{{ date.slice(0, 10) }}: </strong>
      {{ text }}
    </p>
  </div>
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
p {
  text-align: left;
}
</style>