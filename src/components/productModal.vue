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
              <input
                type="text"
                class="form-control"
                id="title"
                v-model.trim="product.title"
              />
            </div>
            <div class="col-md-3">
              <label for="category" class="form-label">產品分類</label>
              <input
                type="text"
                class="form-control"
                id="category"
                v-model.trim="product.category"
              />
            </div>
            <div class="col-md-3">
              <label for="unit" class="form-label">單位</label>
              <input
                type="text"
                class="form-control"
                id="unit"
                placeholder="組/個"
                v-model.trim="product.unit"
              />
            </div>
            <div class="col-md-3">
              <label for="price" class="form-label">產品價錢</label>
              <input
                type="number"
                min="0"
                class="form-control"
                id="price"
                v-model.number="product.price"
              />
            </div>
            <div class="col-md-3">
              <label for="origin_price" class="form-label">產品原價</label>
              <input
                type="number"
                class="form-control"
                id="origin_price"
                v-model.number="product.origin_price"
              />
            </div>
            <div class="col-12">
              <label for="description" class="form-label">產品描述</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model.trim="product.description"
              />
            </div>
            <div class="col-md-12">
              <label for="content" class="form-label">產品內容</label>
              <textarea
                class="form-control"
                id="content"
                v-model.trim="product.content"
              ></textarea>
            </div>
            <div class="col-md-12">
              <label for="image" class="form-label"
                >產品主圖 <span class="text-muted">(限jpg/png檔)</span></label
              >
              <input
                class="form-control"
                type="file"
                id="image"
                @change="fileChange"
              />

              <input
                type="text"
                class="form-control my-3"
                id="imageUrl"
                v-model.trim="product.imageUrl"
                ref="image"
              />
              <div v-if="product.imageUrl">
                <img :src="product.imageUrl" width="150" alt="" />
              </div>
            </div>
            <div class="col-md-12">
              <label for="images" class="form-label"
                >產品圖片 <span class="text-muted">(限jpg/png檔)</span></label
              >
              <input
                class="form-control"
                @change="fileChange"
                type="file"
                id="images"
                ref="images"
              />
              <div
                class="my-3 d-flex gap-3 align-items-center"
                v-for="(img, index) in product.imagesUrl"
                :key="`image${index}`"
              >
                <img :src="img" width="150" alt="" />
                <input
                  type="text"
                  class="form-control my-3"
                  v-model.trim="product.imagesUrl"
                />
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="removeImages(index)"
                >
                  X
                </button>
              </div>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="product.is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
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
          <button type="button" class="btn btn-primary" @click="submit">
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import productStore from '@/store/productStore.js'
import { Modal } from 'bootstrap'
export default {
  name: 'productModal',
  data() {
    return {
      modal: null,
      product: {
        title: '',
        category: '',
        unit: '',
        price: '',
        origin_price: '',
        description: '',
        content: '',
        imageUrl: '',
        imagesUrl: [],
        is_enabled: true
      },
      image: '',
      imagesUrl: []
    }
  },
  mounted() {
    const modal = this.$refs.modal
    this.modal = new Modal(modal)
  },
  props: ['productData'],
  methods: {
    ...mapActions(productStore, ['upload', 'updateProduct']),
    show() {
      this.modal.show()
    },
    async fileChange(e) {
      this.image = e.target.files[0]
      if (!this.image) return false
      const formData = new FormData()
      formData.append('file-to-upload', this.image)
      const res = await this.upload(formData)
      if (res.data?.success) {
        if (e.target.id === 'images') {
          this.product.imagesUrl.push(res.data.imageUrl)
          this.$refs.images.value = ''
        } else {
          this.product.imageUrl = res.data.imageUrl
          this.$refs.image.value = ''
        }
      } else {
        alert(res.data.message)
      }
    },
    removeImages(index) {
      this.product.imagesUrl.splice(index, 1)
    },
    submit() {
      const data = this.product
      this.updateProduct('add', data)
    }
  },
  watch: {
    productData() {
      this.product = this.productData
    }
  }
}
</script>
