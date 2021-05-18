<template>
  <div class="topbar">
    <div class="length">
      <span>{{ itemsCount }} Items</span>
      <div class="ml-auto">
        <select v-model="sort_by" class="custom-select">
          <option v-for="(s, index) in sort" :key="index" :value="s.code">
            {{ s.label }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Topbar',
  data () {
    return {
      sort_by: 'product_position',
      sort_dir: 'desc'
    }
  },
  computed: {
    ...mapGetters({
      itemsCount: 'items/getCount',
      sort: 'items/getSort'
    })
  },
  watch: {
    sort_by () {
      this.fetchProducts()
    }
  },
  methods: {
    ...mapActions({
      getItemsBySort: 'items/getItemsBySort'
    }),
    fetchProducts () {
      this.getItemsBySort({
        sort_by: this.sort_by,
        sort_dir: this.sort_dir
      })
    }
  }
}
</script>

<style scoped>
.topbar .length {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border: 1px solid #f5f5f5;
  display: flex;
}

.topbar .length .custom-select {
  max-width: 190px;
  border: none;
}
</style>
