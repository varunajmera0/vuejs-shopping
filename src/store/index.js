import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    adminCat: [],
    adminProds: [],
    cats: null,
    prods: null,
    added: [],
    freeShipping: false,
    sliders: [],
    loading: false,
    error: null,
    user: null
  },
  mutations: {
    setLoadedCategories (state, payload) {
      state.adminCat = payload
    },
    setLoadedProducts (state, payload) {
      state.adminProds = payload
      console.log(state.adminProds)
    },
    setCreateCategory (state, payload) {
      state.cats = payload
    },
    setCreateProduct (state, payload) {
      state.prods = payload
    },
    setCreateSliders (state, payload) {
      state.sliders = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    ItemAdded (state, payload) {
      state.adminProds.find(prod => prod.id === payload.pid).quantity -= payload.qnt
    },
    AddToCart (state, payload) {
      console.log('addtocart')
      const record = state.added.find(prod => prod.id === payload.pid)
      if (!record) {
        state.added.push({
          id: payload.pid,
          quantity: payload.qnt
        })
        console.log('new record')
      } else {
        console.log('update record')
        let pay = parseInt(record.quantity) + parseInt(payload.qnt)
        record.quantity = pay
      }
    },
    removeFromCart (state, payload) {
      state.adminProds.find(prod => prod.id === payload.product.id).quantity += payload.product.quantity
      const index = state.added.findIndex(added => added.id === payload.product.id)
      state.added.splice(index, 1)
    },
    nullAddedArray (state) {
      state.added = []
    },
    clearError (state) {
      state.error = null
    },
    setError (state, payload) {
      state.error = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    loadCategories ({commit}) {
      firebase.database().ref('categories').once('value')
        .then((data) => {
          const cats = []
          const obj = data.val()
          for (let key in obj) {
            cats.push({
              id: key,
              categoryName: obj[key].categoryName,
              imageUrl: obj[key].imageUrl
            })
          }
          commit('setLoadedCategories', cats)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadProducts ({commit}) {
      const rootref = firebase.database().ref()
      const cat = rootref.child('categories')
     // const prod = rootref.child('products')
      firebase.database().ref('products').once('value')
        .then((data) => {
          const obj = data.val()
          const prod = []
          for (let key in obj) {
            cat.child(obj[key].categoryId).once('value', snapshot => {
              prod.push({
                id: key,
                catId: obj[key].categoryId,
                productName: obj[key].productName,
                imageUrl: obj[key].imageUrl,
                price: obj[key].price,
                quantity: obj[key].quantity,
                categoryName: snapshot.val()
              })
            })
          }
          commit('setLoadedProducts', prod)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadSliders ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('sliders').once('value')
        .then((data) => {
          const sliders = []
          const obj = data.val()
          for (let key in obj) {
            sliders.push({
              id: key,
              title: obj[key].title,
              imageUrl: obj[key].imageUrl
            })
          }
          commit('setCreateSliders', sliders)
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    CreateCategory ({commit}, payload) {
      const cats = {
        categoryName: payload.categoryName,
        imageUrl: payload.imageUrl
      }
      let key
      firebase.database().ref('categories').push(cats)
        .then((data) => {
          key = data.key
          commit('setCreateCategory', {
            ...cats,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    CreateProduct ({commit}, payload) {
      const prods = {
        categoryId: payload.categoryId,
        productName: payload.productName,
        imageUrl: payload.imageUrl,
        price: payload.price,
        quantity: payload.quantity
      }
      let key
      firebase.database().ref('products').push(prods)
        .then((data) => {
          key = data.key
          commit('setCreateProduct', {
            ...prods,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    CreateSliders ({commit}, payload) {
      const slider = {
        title: payload.title,
        imageUrl: payload.imageUrl
      }
      firebase.database().ref('sliders').push(slider)
        .then((data) => {
          let key = data.key
          commit('setCreateSliders', {
            ...slider,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    ItemAdded ({commit}, payload) {
      commit('ItemAdded', payload)
    },
    AddToCart ({commit}, payload) {
      commit('AddToCart', payload)
    },
    removeFromCart ({commit}, payload) {
      commit('removeFromCart', payload)
    },
    nullAddedArray ({commit}) {
      commit('nullAddedArray')
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    getCategories (state) {
      return state.adminCat
    },
    getProducts (state) {
      return state.adminProds
    },
    getSliders (state) {
      return state.sliders
    },
    loadedProducts (state) {
      return (catId) => {
        return state.adminProds.map((cat) => {
          if (cat.catId === catId) return cat
        })
      }
    },
    getShopingCart  (state) {
      return state.added.map(({id, quantity}) => {
        const prod = state.adminProds.find(p => p.id === id)
        return {
          ...prod,
          quantity
        }
      })
    },
    getSubtotal (state, getters) {
      console.log(state.added.length === 0)
      if (state.added.length !== 0) {
        const subSum = getters.getShopingCart.reduce((total, item) => {
          return total + item.price * item.quantity
        }, 0)
        return subSum
      }
    },
    getTaxes (state, getters) {
      return getters.getSubtotal * 0.07
    },
    getTotal (state, getters) {
      return getters.getSubtotal + getters.getTaxes
    },
    itemLength (state) {
      return state.added.length
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    user (state) {
      return state.user
    }
  }
})
