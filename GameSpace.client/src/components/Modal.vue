<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content" :class="dark ? 'bg-dark' : ''">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="modal-title"></slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            title="Close Window"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body" />
        </div>
        <!-- <div class="modal-footer">
          <slot name="modal-footer" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    dark: { type: Boolean, default: false }
  },
  setup() {
    return {
      pauseVideo() {
        var myModalEl = document.getElementById('viewPost-' + props.post.id)
        myModalEl.addEventListener('hide.bs.modal', function () {
          document.getElementById('video').pause();
        })
      }
    }
  }
}
</script>


<style scoped lang="scss">
.bg-dark {
  .btn-close {
    filter: invert(1);
  }
}
</style>