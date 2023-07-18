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
      arrTypes: [],
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
            q: new URLSearchParams(window.location.search).get("q"),
          },
        })
        .then((response) => {
          this.arrProjects = response.data.results.data;
          this.nPages = response.data.results.last_page;
        });
    },
    getTypes() {
      axios.get(this.store.baseUrl + "api/types").then((response) => {
        this.arrTypes = response.data.results;
      });
    },
  },
  created() {
    this.getProject();
    this.getTypes();
  },
  watch: {
    currentPage() {
      this.getProject();
    },
  },
};
</script>

<template>
  <form class="my-3 w-25">
    <label for="type">
      <h4>Select the project type</h4>
    </label>
    <select class="form-select" id="type">
      <option v-for="types in arrTypes" :key="types.id" :value="types.id">
        {{ types.name }}
      </option>
    </select>
  </form>

  <div class="row row-cols-3 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
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
