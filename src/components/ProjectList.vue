<script>
import { store } from "../store";
import axios from "axios";
import ProjectCard from "./ProjectCard.vue";

export default {
  components: {
    ProjectCard,
  },

  data() {
    return {
      arrProjects: [],
      currentPage: 1,
      nPages: 0,
      store,
    };
  },
  methods: {
    toPrevPage() {
      this.currentPage !== 1 ? this.currentPage-- : null;
    },
    toNextPage() {
      this.currentPage !== this.nPages ? this.currentPage++ : null;
    },
    getProject() {
      axios
        .get(this.store.baseUrl + "api/projects", {
          params: {
            page: this.currentPage,
          },
        })
        .then((response) => {
          this.arrProjects = response.data.data;
          this.nPages = response.data.last_page;
        });
    },
  },
  created() {
    this.getProject();
  },
  watch: {
    currentPage() {
      this.getProject();
    },
  },
};
</script>

<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
    <div class="col" v-for="project in arrProjects" :key="project.id">
      <ProjectCard :objProject="project" />
    </div>
  </div>
  <nav>
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: currentPage == 1 }"
        @click="toPrevPage()"
      >
        <a class="page-link">Previous</a>
      </li>

      <li
        v-for="page in nPages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <a class="page-link" @click="currentPage = page">{{ page }}</a>
      </li>
      <li :class="{ disabled: currentPage == nPages }" class="page-item">
        <a class="page-link" href="#" @click="toNextPage()">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>
