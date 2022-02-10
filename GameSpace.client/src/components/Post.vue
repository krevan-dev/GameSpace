<template>
  <div class="row d-flex justify-content-center">
    <div class="col-md-2 bg-grey text-dark">
      <img src="//thiscatdoesnotexist.com/" class="my-2 profilePic" alt="" />
      <h4 class="text-center">User name</h4>
    </div>
    <div class="col-md-8 bg-grey text-dark">
      <div class="d-flex justify-content-between my-1">
        <div>
          <p>Post Title - Type</p>
        </div>
        <div>
          <i class="mdi mdi-pencil"></i>
          <i class="mdi mdi-delete"></i>
        </div>
      </div>
      <img src="//thiscatdoesnotexist.com/" class="contentImg" alt="" />
      <p class="mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores beatae
        inventore cumque, animi ipsam pariatur ut eos nobis asperiores, quae,
        quam dolor libero obcaecati quidem impedit labore maxime doloribus
        commodi!
      </p>
    </div>
  </div>
</template>


<script>
export default {
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