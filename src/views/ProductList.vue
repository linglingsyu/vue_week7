<template>
  <div class="vl-parent">
    <isLoading :active="isLoading" />
    <vToast status="true" errorMessage="錯誤訊息"></vToast>
    <div class="container">
      <div class="d-fle align-items-center">
        <h1 class="mb-4">產品列表</h1>
        <button type="button" class="btn btn-primary">新增產品</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td width="200">
              <img class="w-50" :src="product.image" alt="productImage" />
            </td>
            <td class="text-start">{{ product.title }}</td>
            <td>
              <span class="text-decoration-line-through">{{
                product.origin_price
              }}</span
              ><br />現在只要{{ product.price }}元
            </td>
            <td width="200">
              <router-link
                class="btn btn-sm btn-outline-primary mx-1"
                :to="'/product/' + product.id"
                >查到更多</router-link
              >
              <!-- <a
              class="btn btn-sm btn-outline-primary mx-1"
              :href="'/product/' + product.id"
              >查到更多</a
            > -->
              <a class="btn btn-sm btn-outline-danger" href="#">加入購物車</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="position-relative"></div>
  <vModal></vModal>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import productStore from '@/store/ProductStore.js'
import vModal from '@/components/Modal.vue'
export default {
  mounted() {
    this.getProductList()
  },
  components: {
    vModal
  },
  methods: {
    ...mapActions(productStore, ['getProductList'])
  },
  computed: {
    ...mapState(productStore, ['isLoading', 'products'])
  }
}
</script>
