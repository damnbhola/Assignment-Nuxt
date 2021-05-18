<template>
  <div class="products">
    <div class="row">
      <div
        v-for="item in items"
        :key="item.id"
        class="col-lg-3 col-md-4 col-sm-6"
      >
        <div class="product">
          <img :src="item.image">
          <div class="description">
            <p class="name">
              <a href="#">{{ item.name }}</a>
            </p>
            <p class="price">
              Rs. {{ item.price }}
            </p>
            <p class="size">
              Size -
              <span v-for="size in item.size.split(',')" :key="size">
                {{ size }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="items.length !== count"
      class="spinner-border"
      role="status"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Items',
  data () {
    return {
      scrolledToBottom: false
    }
  },
  computed: {
    ...mapGetters({
      items: 'items/getItems',
      count: 'items/getCount'
    })
  },
  watch: {
    scrolledToBottom () {
      if (this.scrolledToBottom && this.items.length !== this.count) {
        this.getMoreItems()
      }
    }
  },
  mounted () {
    this.scroll()
  },
  methods: {
    ...mapActions({
      getMoreItems: 'items/getMoreItems'
    }),
    scroll () {
      window.onscroll = () => {
        const bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight >=
          document.documentElement.offsetHeight - 100
        if (bottomOfWindow) {
          this.scrolledToBottom = true
        } else {
          this.scrolledToBottom = false
        }
      }
    }
  }
}
</script>

<style scoped>
.product img {
  width: 100%;
}

.product .description {
  padding: 5px 10px;
}

.description p {
  margin: 0px;
  padding: 5px 10px 0;
  text-align: left;
  font-size: 14px;
  color: #000;
}

.product span {
  /* display: none; */
}

.product {
  border: 1px solid #fff;
  margin: 1rem 0;
}

.product:hover {
  border: 1px solid #ededed;
}
</style>
