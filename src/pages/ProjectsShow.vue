<script>
import axios from "axios";
import { store } from "../store";
import { DateTime } from "luxon";
import App404 from "./App404.vue";
export default {
  components: {
    App404,
  },
  data() {
    return {
      project: null,
      store,
      DateTime,
    };
  },
  created() {
    axios
      .get(this.store.baseUrl + "api/projects/" + this.$route.params.slug)
      .then((response) => {
        if (response.data.success) {
          this.project = response.data.results;
        } else {
          this.is404 = true;
        }
      });
  },
};
</script>

<template>
  <App404 v-if="is404" />
  <template v-else-if="project">
    <h3>{{ project.title }}</h3>
    <h2>Last modified: {{ this.DateTime.now().toFormat("dd-MM-yyyy") }}</h2>
    <img :src="this.store.baseUrl + 'storage/' + project.image" alt="" />
    <h5>{{ project.description }}</h5>
  </template>
</template>

<style></style>
