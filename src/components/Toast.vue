<template>
  <div
    class="toast position-absolute end-0 top-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="toast"
  >
    <div class="toast-header">
      <svg
        class="bd-placeholder-img rounded me-2"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <rect width="100%" height="100%" fill="#ff0000"></rect>
      </svg>
      <strong class="me-auto"> 錯誤訊息失敗</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { Toast } from 'bootstrap'
export default {
  name: 'vToast',
  data() {
    return {
      toast: null
    }
  },
  props: ['status', 'errorMessage'],
  mounted() {
    const toastElList = this.$refs.toast
    this.toast = new Toast(toastElList, { delay: 1200 })
  },
  methods: {
    show() {
      this.toast.show()
    }
  }
}
</script>
