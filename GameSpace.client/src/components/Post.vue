<template>
  <div class="row d-flex justify-content-center mt-3">
    <div class="col-md-2 bg-grey text-dark">
      <img :src="post.creator.picture" class="my-2 profilePic" alt="" />
      <h6>{{ post.creator.name }}</h6>
    </div>
    <div class="col-md-8 bg-grey text-dark">
      <div class="d-flex justify-content-between my-1">
        <div>
          <h4>{{ post.title }}</h4>
        </div>
        <div>
          <!-- <i class="mdi mdi-pencil"></i> -->
          <i class="mdi mdi-delete selectable" @click="deletePost()"></i>
        </div>
      </div>
      <p class="mt-1">
        {{ post.description }}
      </p>
      <img
        :src="post.contentUrl"
        v-if="post.filetype == 'image'"
        class="content mb-3"
        alt=""
      />
      <video
        :src="post.contentUrl"
        v-else
        class="content mb-3"
        controls
        preload="metadata"
      ></video>
    </div>
  </div>
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
  max-height: 40vh;
}
</style>