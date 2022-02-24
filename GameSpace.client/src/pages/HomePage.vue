<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 mt-2">
        <!-- <div class="card w-100 h-auto bg-dark">
          <div
            class="card-body coverImg d-flex flex-column justify-content-end"
          >
            <h5 class="card-title fs-2">Welcome to GameSpace!</h5>
            <p class="card-text">
              Your place for the coolest gaming clips and screenshots!
            </p>
          </div>
        </div> -->
      </div>
    </div>
    <div class="row">
      <Post v-for="p in posts" :key="p.id" :post="p" />
    </div>
  </div>
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
.coverImg {
  background-image: url("src/assets/img/cardbg.jpg");
  height: 25vh;
  background-size: cover;
  background-position: center;
}
</style>
