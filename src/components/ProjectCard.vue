<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
  props: {
    objProject: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(image) {
      return image
        ? this.store.baseUrl + "storage/" + image
        : this.store.baseUrl + "storage/default.png";
    },
  },
};
</script>

<template>
  <div class="card h-100">
    <img
      :src="getImageUrl(objProject.image)"
      class="image-card card-img-top object-fit-cover"
      alt="objProject.title"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ objProject.title }}</h5>
      <p class="card-text">
        {{ objProject.description }}
      </p>
      <router-link
        :to="{ name: 'projects.show', params: { slug: objProject.slug } }"
        class="btn btn-primary mt-auto"
        >View project</router-link
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-card {
  height: 250px;
}
</style>
