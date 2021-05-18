/* eslint-disable camelcase */
import axios from 'axios'
import API from './API'

const state = () => ({
  items: [],
  count: 0,
  filters: [],
  sort: [],
  filter: {
    page: 1,
    count: 20,
    sort_by: '',
    sort_dir: 'desc',
    filter: ''
  }
})

const mutations = {
  setItems (state, payload) {
    state.items = payload.products
    state.sort = payload.sort
  },
  setFilters (state, payload) {
    state.filters = payload.filters
  },
  addItems (state, payload) {
    for (const product of payload) {
      state.items.push(product)
    }
  },
  removeItems (state) {
    state.items = []
  },
  setCount (state, payload) {
    state.count = payload
  },
  removeCount (state) {
    state.count = 0
  },
  setFilter (state, payload) {
    state.filter = payload
  },
  removefilter (state) {
    state.filter = {
      page: 1,
      count: 20,
      sort_by: '',
      sort_dir: 'desc',
      filter: ''
    }
  }
}

const actions = {
  async getItems ({ commit }) {
    return await axios
      .get(
        `${API}?service=category&store=1&url_key=top-wear-kurtas&page=1&count=20&sort_by=&sort_dir=desc&filter=`
      )
      .then((res) => {
        if (res.status === 200) {
          commit('setItems', res.data.result)
          commit('setCount', res.data.result.count)
          commit('setFilters', res.data.result)
        }
      })
      // .catch(e => console.log(e))
  },
  async getItemsBySort ({ state, commit }, { sort_by, sort_dir }) {
    const { filter } = state.filter
    return await axios
      .get(
        `${API}?service=category&store=1&url_key=top-wear-kurtas&page=1&count=20&sort_by=${sort_by}&sort_dir=${sort_dir}&filter=${filter}`
      )
      .then((res) => {
        if (res.status === 200) {
          commit('setItems', res.data.result)
          commit('setCount', res.data.result.count)
          commit('setFilter', {
            page: 1,
            count: 20,
            sort_by,
            sort_dir,
            filter
          })
        }
      })
      // .catch(e => console.log(e))
  },
  async getItemsByFilter ({ state, commit }, filter) {
    const { sort_by, sort_dir } = state.filter
    return await axios
      .get(
        `${API}?service=category&store=1&url_key=top-wear-kurtas&page=1&count=20&sort_by=${sort_by}&sort_dir=${sort_dir}&filter=${filter}`
      )
      .then((res) => {
        if (res.status === 200) {
          commit('setItems', res.data.result)
          commit('setCount', res.data.result.count)
          commit('setFilter', {
            page: 1,
            count: 20,
            sort_by,
            sort_dir,
            filter
          })
        }
      })
      // .catch(e => console.log(e))
  },
  async getMoreItems ({ state, commit }) {
    const { page, sort_by, sort_dir, filter } = state.filter
    return await axios
      .get(
        `${API}?service=category&store=1&url_key=top-wear-kurtas&page=${page +
          1}&count=20&sort_by=${sort_by}&sort_dir=${sort_dir}&filter=${filter}`
      )
      .then((res) => {
        if (res.status === 200) {
          commit('addItems', res.data.result.products)
          commit('setFilter', {
            page: page + 1,
            count: 20,
            sort_by,
            sort_dir,
            filter
          })
        }
      })
      // .catch(e => console.log(e))
  }
}

const getters = {
  getItems: state => state.items,
  getCount: state => state.count,
  getFilters: state => state.filters,
  getSort: state => state.sort
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
