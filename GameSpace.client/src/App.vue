<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <Modal id="newPost" dark>
    <template #modal-title>Create a new post...</template>
    <template #modal-body><NewPost /></template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.modal-backdrop.show {
  // background-color: #111927;
  background-image: url("assets/img/modalbg.jpg");
  opacity: 1;
  background-size: cover;
  background-position: center;
}
</style>
