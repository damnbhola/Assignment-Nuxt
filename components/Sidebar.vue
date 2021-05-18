<template>
  <div class="sidebar">
    <div class="section">
      <b>FILTER</b>
    </div>
    <div v-if="filter.length" class="section">
      <p>APPLIED FILTERS</p>
      <p v-for="f in filter" :key="f">
        <span @click="resetFilter(f)">
          <i class="fas fa-times mr-2" />
        </span>
        {{ f.replace("-", ": ") }}
      </p>
      <button class="btn btn-outline-dark" @click="resetFilter('all')">
        Clear All
      </button>
    </div>
    <div v-for="fil in filters" :key="fil.filter_lable" class="section">
      <span
        class="filter_lable"
        @click.prevent="show(fil.filter_lable)"
      >
        {{ fil.filter_lable }} <i class="fas fa-chevron-up" />
      </span>
      <ul v-if="open.includes(fil.filter_lable)" class="filters-list">
        <li v-for="f in fil.options" :key="f.value">
          <span
            @click="fetch(f.code, f.value)"
          >
            {{ f.value }}<span class="count">({{ f.total }})</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data () {
    return {
      open: [],
      filter: []
    }
  },
  computed: {
    ...mapGetters({
      filters: 'items/getFilters'
    })
  },
  methods: {
    ...mapActions({
      getItemsByFilter: 'items/getItemsByFilter'
    }),
    show (value) {
      const pos = this.open.indexOf(value)
      if (pos === -1) {
        this.open.push(value)
      } else {
        this.open.splice(pos, 1)
      }
    },
    resetFilter (value) {
      if (value === 'all') {
        this.filter = []
      } else {
        this.filter = this.filter.filter(f => f !== value)
      }
      this.getItemsByFilter(this.filter.join(','))
    },
    fetch (code, value) {
      const filter = `${code}-${value}`
      if (!this.filter.includes(filter)) {
        this.filter.push(filter)
        this.getItemsByFilter(this.filter.join(','))
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  padding: 1rem;
}

.sidebar .section {
  display: block;
  padding: 1rem;
  border: 1px solid #f5f5f5;
}

.sidebar .filter_lable i {
  float: right;
}

.sidebar span {
  cursor: pointer;
}

.filters-list {
  max-height: 250px;
  overflow: auto;
  padding: 15px;
  padding-top: 0px;
  list-style: none;
}

.filters-list li {
  font-size: 14px;
  padding: 15px;
  display: block;
  padding-bottom: 0px;
  padding-left: 22px;
  position: relative;
}

.filters-list li .count {
  margin-left: 4px;
  color: grey;
  font-size: 11px;
}
</style>
