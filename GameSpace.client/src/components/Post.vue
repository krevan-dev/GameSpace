<template>
  <div
    class="
      card
      content
      rounded
      shadow
      border
      bg-dark
      text-white
      selectable
      mb-2
    "
    data-bs-toggle="modal"
    :data-bs-target="'#viewPost-' + post.id"
  >
    <img
      :src="post.contentUrl"
      v-if="post.filetype == 'image'"
      class="card-img"
      alt="..."
    />
    <video :src="post.contentUrl" v-else />
    <div class="card-img-overlay on-hover">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ new Date(post.createdAt).toLocaleString() }}</p>
    </div>
  </div>

  <Modal :id="'viewPost-' + post.id" dark>
    <template #modal-title
      >{{ post.title }} by {{ post.creator.name }}</template
    >
    <template #modal-body>
      <h3>{{ post.description }}</h3>
      <img
        :src="post.contentUrl"
        v-if="post.filetype == 'image'"
        class="card-img"
        alt="..."
      />
      <video :src="post.contentUrl" class="scaledown" v-else controls />
    </template>
  </Modal>
</template>


<script>
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    return {
      async deletePost() {
        try {
          if (await Pop.confirm()) {
            await postsService.deletePost(props.post.id)
          }
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.profilePic {
  height: 150px;
  width: 150px;
}
.content {
  width: 30%;
  height: auto;
}
.scaledown {
  height: 50%;
  width: auto;
}
</style>