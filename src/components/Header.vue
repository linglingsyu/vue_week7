<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">LOGO</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li
            class="nav-item"
            v-for="(nav, index) in navs"
            :key="'nav' + index"
          >
            <router-link class="nav-link" :to="nav.url">{{
              nav.name
            }}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li
            class="nav-item"
            v-for="(nav, index) in navs2"
            :key="'nav' + index"
          >
            <router-link class="nav-link" :to="nav.url">{{
              nav.name
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'MyHeader',
  data() {
    return {
      navs: [
        { name: '產品', url: '/products' },
        { name: '訂單', url: '/orders' },
        { name: '優惠券', url: '/product' },
        { name: '貼文', url: '/product' }
      ],
      navs2: [
        { name: 'Blog', url: '/product' },
        { name: '訂單', url: '/product' }
      ]
    }
  }
}
</script>
