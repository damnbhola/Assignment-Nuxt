<template>
  <div class="app">
    <aside>
      <Sidebar />
    </aside>
    <main>
      <Topbar />
      <Items />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Sidebar from '../components/Sidebar'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  created () {
    this.getItems()
  },
  methods: {
    ...mapActions({
      getItems: 'items/getItems'
    })
  }
}
</script>

<style>
a {
  color: #000;
}

a:hover {
  color: #000;
}
</style>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
}

.app {
  display: flex;
}

.app aside {
  width: 19%;
}

.app main {
  width: 80%;
}

@media screen and (max-width: 1000px) {
  .app aside {
    display: none;
  }

  .app main {
    width: 100%;
  }
}
</style>
