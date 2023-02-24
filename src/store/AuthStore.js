import { defineStore } from 'pinia'
import { API } from '@/helper/api.js'

export default defineStore('authStore', {
  state: () => ({
    isLogin: false
  }),
  getters: {},
  actions: {
    async login(data) {
      try {
        // console.log(data)
        const res = await API.post('admin/signin', data)
        const { token, expired } = res.data
        await this.setCookie(token, expired)
        this.router.push({ name: 'Home' })
      } catch (error) {
        alert('登入失敗')
        console.dir(error)
      }
    },
    setCookie(token, expired) {
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
    },
    async checkLogin() {
      try {
        const res = await API.post('api/user/check')
        this.isLogin = res.data.success
        return res.data.success
      } catch (error) {
        console.dir(error)
        this.isLogin = false
        this.router.push({ name: 'login' })
        return false
      }
    },
    getToken() {
      return document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
    }
  }
})
