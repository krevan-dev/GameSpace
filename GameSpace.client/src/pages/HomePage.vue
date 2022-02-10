<template>
  <div class="container-fluid">
    <Post v-for="p in posts" :key="p.id" :post="p" />
  </div>
  <!-- <div
    class="
      home
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="home-card p-5 bg-white rounded elevation-3">
      <h1 class="my-3 bg-dark text-white p-3 rounded text-center">
        Welcome to GameSpace!
      </h1>
      <h4>Please log in to continue.</h4>
    </div>
  </div> -->
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.toast(error.message, "error")
        logger.log(error)
      }
    })
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
