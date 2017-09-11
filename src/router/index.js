import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Categories from '@/components/Category/Categories'
import Products from '@/components/Products/Products'
import AdminCat from '@/components/admin/components/Category/Category'
import AdminProds from '@/components/admin/components/Products/AdminProducts'
import AdminSlider from '@/components/admin/components/Sliders/Sliders'
import CheckOut from '@/components/CheckOut/CheckOut'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    },
    {
      path: '/products/:cid',
      name: 'Products',
      props: true,
      component: Products
    },
    {
      path: '/checkout',
      name: 'CheckOut',
      component: CheckOut
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: Signin
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: Signup
    },
    {
      path: '/admin/category',
      name: 'Category',
      component: AdminCat
    },
    {
      path: '/admin/products',
      name: 'AdminProducts',
      component: AdminProds
    },
    {
      path: '/admin/slider',
      name: 'Sliders',
      component: AdminSlider
    }
  ],
  mode: 'history'
})
