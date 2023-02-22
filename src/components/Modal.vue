<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增產品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row g-3">
            <div class="col-12">
              <label for="title" class="form-label">產品名稱</label>
              <input type="text" class="form-control" id="title" />
            </div>
            <div class="col-md-6">
              <label for="category" class="form-label">產品分類</label>
              <input type="text" class="form-control" id="category" />
            </div>
            <div class="col-md-6">
              <label for="unit" class="form-label">單位</label>
              <input
                type="text"
                class="form-control"
                id="unit"
                placeholder="組/個"
              />
            </div>
            <div class="col-md-6">
              <label for="price" class="form-label">產品價錢</label>
              <input type="number" min="0" class="form-control" id="price" />
            </div>
            <div class="col-md-6">
              <label for="origin_price" class="form-label">產品原價</label>
              <input type="number" class="form-control" id="origin_price" />
            </div>
            <div class="col-12">
              <label for="description" class="form-label">產品描述</label>
              <input type="text" class="form-control" id="description" />
            </div>
            <div class="col-md-12">
              <label for="content" class="form-label">產品內容</label>
              <textarea class="form-control" id="content"></textarea>
            </div>
            <div class="col-md-12">
              <label for="image" class="form-label"
                >產品主圖
                <span class="text-muted"
                  >*僅能上傳一張(限jpg/png檔)</span
                ></label
              >
              <input class="form-control" type="file" id="image" />
            </div>
            <div class="col-md-12">
              <label for="image" class="form-label"
                >產品圖片
                <span class="text-muted">*可上傳多張(限jpg/png檔)</span></label
              >
              <input class="form-control" type="file" id="image" />
            </div>
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="isCheck" />
                <label class="form-check-label" for="isCheck"> 是否啟用 </label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button type="button" class="btn btn-primary">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
export default {
  name: 'myModal',
  data() {
    return {
      modal: null,
      product: {}
    }
  },
  mounted() {
    const modal = this.$refs.modal
    this.modal = new Modal(modal)
  },
  methods: {
    show() {
      this.modal.show()
    }
  }
}
</script>
