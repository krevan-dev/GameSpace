<template>
  <div class="modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
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
          ></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    dark: { type: Boolean, default: false }
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