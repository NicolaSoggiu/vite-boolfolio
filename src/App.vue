<script>
import ProjectList from "./components/ProjectList.vue";

export default {
  components: {
    ProjectList,
  },
};
</script>

<template>
  <h1 class="text-center p-3">Boolpress</h1>
  <div class="container">
    <ProjectList />
  </div>
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
</style>
