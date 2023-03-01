<template>
  <div class="container">
    <h1>編輯產品</h1>
    <form class="row g-3" @submit.prevent="submit">
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
        <div v-if="product.image">
          <img :src="product.image" width="150" alt="" />
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
            :true-value="1"
            :false-value="0"
          />
          <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
        </div>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">更新</button>
      </div>
    </form>
    {{ productData }}
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/store/productStore.js'
export default {
  data() {
    return {
      id: null,
      product: { imagesUrl: [] }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getProductById(this.id)
  },
  methods: {
    ...mapActions(productStore, ['getProductById']),
    submit() {
      console.log(this.product)
    }
  },
  computed: {
    ...mapState(productStore, ['productData'])
  },
  watch: {
    productData() {
      this.product = this.productData
      this.product.imageUrl = this.productData.image
    }
  }
}
</script>
