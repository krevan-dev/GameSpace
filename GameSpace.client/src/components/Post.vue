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
          <!-- <i class="mdi mdi-delete"></i> -->
        </div>
      </div>
      <p class="mt-1">
        {{ post.description }}
      </p>
      <img :src="post.contentUrl" class="contentImg mb-3" alt="" />
    </div>
  </div>
</template>


<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.profilePic {
  height: 150px;
  width: 150px;
}
.contentImg {
  max-height: 40vh;
}
</style>