import { defineStore } from 'pinia'
import { API, api_path } from '@/helper/api.js'
export default defineStore('productStore', {
  state: () => ({ productList: [], Loading: false, productById: [] }),
  getters: {
    isLoading: ({ Loading }) => Loading,
    products: ({ productList }) => productList,
    productData: ({ productById }) => productById
  },
  actions: {
    async getProductList() {
      try {
        this.Loading = true
        const path = `/api/${api_path}/admin/products`
        const res = await API.get(path)
        this.productList = res.data.products
        this.Loading = false
      } catch (error) {
        this.Loading = false
        console.dir(error)
        alert('error!')
      }
    },
    async getProductById(id) {
      try {
        this.Loading = true
        const path = `/api/${api_path}/product/${id}`
        const res = await API.get(path)
        this.productById = res.data.product
      } catch (error) {
        console.dir(error)
        alert('error!')
      } finally {
        this.Loading = false
      }
    },
    async updateProduct(action, productData) {
      try {
        this.Loading = true
        let path = `api/${api_path}/admin/product`
        let method = 'post'
        if (action === 'edit') {
          path += '/' + productData.id
          method = 'put'
          delete productData.id
        }
        const res = await API[method](path, { data: productData })
        await this.getProductList()
        this.Loading = false
        return res
      } catch (error) {
        console.dir(error)
        this.Loading = false
        if (error?.response?.data) {
          let str = ''
          for (const item of error.response.data.message) {
            str += item + '\n'
          }
          alert(str)
        }
      }
    },
    async delProduct(id) {
      try {
        this.Loading = true
        const path = `/api/${api_path}/admin/product/${id}`
        const res = await API.delete(path)
        delete this.productList[id]
        return res
      } catch (error) {
        console.dir(error)
        alert('error!')
      } finally {
        this.Loading = false
      }
    },
    async upload(formdata) {
      try {
        this.Loading = true
        const path = `/api/${api_path}/admin/upload`
        const res = await API.post(path, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return res
      } catch (error) {
        console.dir(error)
        alert('upload fail!')
      } finally {
        this.Loading = false
      }
    }
  }
})
