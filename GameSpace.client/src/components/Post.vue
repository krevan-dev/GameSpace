<template>
  <div class="col-md-3 d-flex justify-content-center">
    <div
      class="card content shadow bg-dark text-white selectable my-2"
      data-bs-toggle="modal"
      :data-bs-target="'#viewPost-' + post.id"
    >
      <img
        :src="post.contentUrl"
        v-if="post.filetype == 'image'"
        class="card-img"
        alt="..."
      />
      <video :src="post.contentUrl" v-else preload="metadata" />
      <div class="card-img-overlay on-hover">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">{{ post.title }}</h5>
          <i
            v-if="post.filetype == 'image'"
            class="mdi mdi-camera text-secondary"
          />
          <i v-else class="mdi mdi-video-vintage text-secondary" />
        </div>
        <div class="d-flex align-items-baseline">
          <p class="card-text">
            {{ new Date(post.createdAt).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- ANCHOR modal view starts here -->
  <Modal :id="'viewPost-' + post.id" dark>
    <template #modal-title>
      <div v-if="post.creatorId == account.id">
        <i
          class="mdi mdi-delete text-warning selectable me-2"
          title="Delete Post"
          @click="deletePost()"
        />
        <i
          class="mdi mdi-pencil text-warning selectable me-2"
          title="Edit Post"
          data-bs-toggle="modal"
          data-bs-target="#newPost"
        />
      </div>
    </template>
    <template #modal-body>
      <img
        v-if="post.filetype == 'image'"
        :src="post.contentUrl"
        class="card-img"
        alt="..."
      />
      <div class="ratio ratio-16x9 videoElem" v-else>
        <video
          :id="'video-' + post.id"
          :src="post.contentUrl"
          controls
          preload="metadata"
        />
      </div>
      <div class="mt-3 d-flex justify-content-between">
        <div>
          <h4>{{ post.title }}</h4>
          <p>{{ post.description }}</p>
        </div>
        <div>
          {{ post.creator.name }}
          <img
            :src="post.creator.picture"
            class="profilePic ms-3 rounded-circle"
            alt="profile picture"
          />
        </div>
      </div>
    </template>
  </Modal>
</template>


<script>
import { Modal } from 'bootstrap'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    onMounted(() => {
      var modalClose = document.getElementById('viewPost-' + props.post.id)
      modalClose.addEventListener('hide.bs.modal', function () {
        document.getElementById('video-' + props.post.id).pause();
      })
    })
    return {
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          if (await Pop.confirm()) {
            Modal.getOrCreateInstance(document.getElementById('viewPost-' + props.post.id)).hide()
            await postsService.deletePost(props.post.id)
          }
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      }
      // pauseVideo() {
      //   var modalClose = document.getElementById('viewPost-' + props.post.id)
      //   modalClose.addEventListener('hide.bs.modal', function () {
      //     document.getElementById('video').pause();
      //   })
      // }
    }
  }
}
</script>


<style lang="scss" scoped>
.profilePic {
  height: 50px;
  width: 50px;
}
.content {
  width: 90%;
  height: auto;
}
.videoElem {
  max-height: 75vh;
  background-color: black;
}
</style>