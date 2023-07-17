<script>
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
  created() {
    axios
      .get(this.store.baseUrl + "projects/" + this.$route.params.slug)
      .then((response) => console.log(response));
  },
};
</script>

<template>sono la show</template>

<style></style>
