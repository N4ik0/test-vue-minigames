import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MiniGame from '../components/MiniGame.vue'

// Aquí definimos las rutas de la app
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path:'/game',
    name:'minigame',
    component: MiniGame
  }
]

// Creamos la instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Exportamos el router para usarlo en main.js
export default router
