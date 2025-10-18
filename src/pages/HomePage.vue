<template>
  <main class="home">
    <h1 class="title">🎮 Plataforma de Quizzes</h1>
    <p class="subtitle">Crea, comparte y juega quizzes en tiempo real</p>
    
    <section class="buttons">
      <button @click="goToCreate">Crear un Quiz</button>
      <button @click="toggleJoin">Unirse a una Sala</button>
    </section>

    <section v-if="joining" class="join-section">
      <input
        v-model="roomCode"
        placeholder="Código de la sala"
        class="input"
      />
      <button @click="joinRoom">Entrar</button>
    </section>
    <section>
      <button @click="goToMinigame">ir al juego</button>
      <div>
        <SnakeGamePage/>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SnakeGamePage from './SnakeGamePage.vue'
//import MiniGame from '../components/MiniGame.vue'

const router = useRouter()
const joining = ref(false)
const roomCode = ref('')

function toggleJoin() {
  joining.value = !joining.value
}

function goToCreate() {
  router.push('/create')
}
function goToMinigame() {
  router.push('/game')
}

function joinRoom() {
  if (roomCode.value.trim() !== '') {
    router.push(`/lobby/${roomCode.value}`)
  } else {
    alert('Por favor, ingresa un código de sala.')
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*min-height: 100vh;*/
  text-align: center;
  background-color: #f5f5f5;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  background-color: #357abd;
}

.join-section {
  margin-top: 1rem;
}

.input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 10px;
  width: 180px;
}
</style>
