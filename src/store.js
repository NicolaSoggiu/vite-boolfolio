import { reactive } from "vue";

export const store = reactive({
  baseUrl: "http://localhost:8000/",
  // getImageUrl(image) {
  //   return image
  //     ? this.store.baseUrl + "storage/" + image
  //     : this.store.baseUrl + "storage/default.png";
  // },
});
