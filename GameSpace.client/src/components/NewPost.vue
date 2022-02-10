<template>
  <form @submit.prevent="createPost()">
    <div class="form-group mb-2">
      <label for="postTitle">Post Title:</label>
      <input
        class="form-control"
        placeholder="Please enter a title..."
        type="text"
        v-model="editable.title"
      />
    </div>
    <div class="form-group mb-2">
      <label for="postDescription">Post Description:</label>
      <textarea
        class="form-control"
        placeholder="Please enter a description of your content."
        name="postDescription"
        id=""
        cols="30"
        rows="3"
        v-model="editable.description"
      ></textarea>
    </div>
    <!-- <div class="form-group mb-2">
      <label for="fileType" class="me-2">Please select a file type:</label>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          v-model="editable.filetype"
          value="image"
        />
        <label class="form-check-label" for="flexRadioDefault1">
          Image/Screenshot
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          v-model="editable.filetype"
          value="video"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          Video Clip
        </label>
      </div>
    </div> -->
    <div class="form-group mb-2">
      <label for="contentUrl">Upload Content:</label>
      <input
        class="form-control"
        placeholder="Please enter a url for your content."
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
      <button type="submit" class="btn btn-success">Submit</button>
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
    return {
      editable,
      filetype,
      previewUrl,
      async createPost() {
        try {
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
          Pop.toast("Post successfully created!")
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