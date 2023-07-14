<script>
import axios from "axios";
export default {
  data() {
    return {
      arrProjects: [],
      currentPage: 1,
      nPages: 0,
    };
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
      this.getProject();
    },
    getProject() {
      axios
        .get("http://localhost:8000/api/projects", {
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
    axios
      .get("http://localhost:8000/api/projects", {
        params: {
          page: this.currentPage,
        },
      })
      .then((response) => {
        this.arrProjects = response.data.data;
        this.nPages = response.data.last_page;
      });
  },
};
</script>

<template>
  <div class="d-flex py-3" style="gap: 10px">
    <div
      v-for="project in arrProjects"
      :key="project.id"
      class="card"
      style="width: 18rem"
    >
      <img class="card-img-top" src="..." alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>

  <nav>
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link">Previous</a>
      </li>

      <li
        v-for="page in nPages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <span class="page-link" @click="changePage(page)">{{ page }}</span>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>
