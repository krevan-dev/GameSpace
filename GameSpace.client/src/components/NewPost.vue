<template>
  <form @submit.prevent="createPost()">
    <div class="form-group mb-2">
      <label for="postTitle">Post Title:</label>
      <input
        class="form-control"
        placeholder="Please enter a title..."
        type="text"
        v-model="editable.title"
        required
      />
    </div>
    <div class="form-group mb-2">
      <label for="postDescription">Post Description:</label>
      <input
        class="form-control"
        placeholder="Please enter a description..."
        type="text"
        v-model="editable.description"
      />
    </div>
    <div class="form-group mb-2">
      <label for="contentUrl">Upload Content:</label>
      <input
        class="form-control"
        placeholder="Please select your content to upload."
        type="file"
        id="mediaInput"
        @change="handleFileChange()"
        accept="image/*, video/*"
      />
    </div>
    <div class="preview mt-3 mx-5" v-if="previewUrl">
      <img :src="previewUrl" v-if="editable.filetype == 'image'" alt="" />
      <video
        :src="previewUrl"
        v-if="editable.filetype == 'video'"
        controls
      ></video>
    </div>
    <hr />
    <div class="d-flex justify-content-between mb-2">
      <button
        v-if="loading == true"
        class="btn btn-warning"
        type="button"
        disabled
      >
        <span>Posting...</span>
        <span
          class="spinner-border spinner-border-sm ms-2"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
      <button v-else type="submit" class="btn btn-success">Submit</button>
      <button
        type="button"
        class="btn btn-outline-danger"
        data-bs-dismiss="modal"
      >
        Cancel
      </button>
    </div>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { postsService } from '../services/PostsService'
import { firebaseService } from '../services/FirebaseService'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({})
    const filetype = ref('image')
    const previewUrl = ref('')
    const loading = ref(false)
    return {
      editable,
      filetype,
      loading,
      previewUrl,
      async createPost() {
        try {
          loading.value = true
          const form = event.target
          const mediaInput = form.mediaInput
          const file = mediaInput.files[0]
          if (!file) { return }
          const url = await firebaseService.uploadFile(file, editable.value)
          editable.value.contentUrl = url
          await postsService.createPost(editable.value)
          Modal.getOrCreateInstance(document.getElementById('newPost')).hide()
          editable.value = {}
          editable.value.contentUrl = ''
          loading.value = false
        } catch (error) {
          Pop.toast(error.message, "error")
          logger.log(error)
        }
      },
      async handleFileChange() {
        try {
          const file = event.target.files[0]
          if (!file) { return }
          editable.value.filetype = file.type.includes('image') ? 'image' : 'video'
          previewUrl.value = URL.createObjectURL(file)
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
.preview {
  img,
  video {
    max-height: 50%;
    max-width: 50%;
    object-fit: contain;
  }
}
</style>