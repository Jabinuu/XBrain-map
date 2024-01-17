import { createRouter, createWebHashHistory } from "vue-router"
import Edit from "@/pages/edit/index.vue"
// import Home from '@/pages/home/index.vue'

const routes = [
  {
    path:'/',
    component:Edit
  },
  // {
  //   path:'/',
  //   component:Home
  // },
  // {
  //   path:'/edit',
  //   component:Edit
  // }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router