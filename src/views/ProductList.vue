<template>
  <div class="vl-parent">
    <isLoading :active="isLoading" />
    <vToast status="true" errorMessage="錯誤訊息"></vToast>
    <div class="container">
      <div class="d-flex align-items-center justify-content-between mb-5">
        <h1>產品列表</h1>
        <button
          type="button"
          class="btn btn-primary"
          @click="this.$refs.Addmodal.show"
        >
          新增產品
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th>是否啟用</th>
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
            <td :class="{ 'text-danger': !product.is_enabled }">
              {{ product.is_enabled ? '是' : '否' }}
            </td>
            <td width="200">
              <router-link
                class="btn btn-sm btn-outline-primary mx-1"
                :to="'/product/' + product.id"
                >編輯</router-link
              >
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="deleteProduct(product.id)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="position-relative"></div>
  <productModal ref="Addmodal"></productModal>
</template>
<script>
import Swal from 'sweetalert2'
import { mapActions, mapState } from 'pinia'
import productStore from '@/store/ProductStore.js'
import productModal from '@/components/productModal.vue'
export default {
  mounted() {
    this.getProductList()
  },
  components: {
    productModal
  },
  methods: {
    ...mapActions(productStore, ['getProductList', 'delProduct']),
    deleteProduct(id) {
      Swal.fire({
        title: '確定刪除嗎',
        text: '資料將無法回復！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '刪了'
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await this.delProduct(id)
            console.log(res)
            Swal.fire('已刪除!', '資料已成功刪除', 'success')
          }
        })
        .then(() => {
          this.getProductList()
        })
    }
  },
  computed: {
    ...mapState(productStore, ['isLoading', 'products'])
  }
}
</script>
