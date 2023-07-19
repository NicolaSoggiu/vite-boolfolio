<script>
import { store } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      store,
      name: "",
      email: "",
      message: "",
      newsletter: true,
      showSuccess: false,
      isSending: false,
      hasError: false,
      // TODO: mostrare gli errori per ciascun input
    };
  },
  methods: {
    sendLead() {
      this.isSending = true;
      axios
        .post(this.store.baseUrl + "api/leads", {
          name: this.name,
          email: this.email,
          message: this.message,
          newsletter: this.newsletter,
        })
        .then((response) => {
          this.isSending = false;

          if (response.data.success) {
            this.showSuccess = true;
            this.resetForm();
          } else {
            this.hasError = true;
          }
        });
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.message = "";
      this.newsletter = true;
    },
  },
};
</script>

<template>
  <h1>Contact us</h1>

  <div
    v-if="showSuccess"
    class="alert alert-success alert-dismissible fade show"
    role="alert"
  >
    <strong>Messaggio inviato con successo </strong>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>

  <div
    v-if="hasError"
    class="alert alert-danger alert-dismissible fade show"
    role="alert"
  >
    Errore nell'invio del messaggio
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>

  <form @submit.prevent="sendLead" novalidate>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="email" class="form-control" id="name" v-model="name" />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input class="form-control" id="email" v-model="email" />
    </div>
    <div class="mb-3">
      <label for="message" class="form-label">Message</label>
      <textarea
        class="form-control"
        id="message"
        rows="5"
        v-model="message"
      ></textarea>
    </div>
    <div class="mb-3 form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="newsletter"
        v-model="newsletter"
      />
      <label class="form-check-label" for="newsletter"
        >subscribe to our newsletter</label
      >
    </div>
    <button type="submit" class="btn btn-primary" :disabled="isSending">
      Submit
    </button>
  </form>
</template>

<style></style>
