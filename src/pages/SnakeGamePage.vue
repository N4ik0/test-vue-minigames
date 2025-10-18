<template>
  <div class="snake-page">
    <h1>Plataforma - Control del Juego</h1>

    <iframe
      ref="gameFrame"
      src="http://localhost:8080"
      allow="autoplay"
    ></iframe>

    <div>
      <button @click="startGame">▶️ Iniciar</button>
      <button @click="pauseGame">⏸️ Pausar</button>
      <button @click="resetGame">🔄 Reiniciar</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";

const gameFrame = ref(null);

function handleMessage(event) {
  const { type, payload } = event.data;

  switch (type) {
    case "GAME_READY":
      console.log("✅ El juego está listo");
      break;
    case "SCORE_UPDATE":
      console.log(`💯 Nuevo puntaje: ${payload.score}`);
      break;
    case "GAME_OVER":
      console.log("💀 Juego terminado");
      break;
  }
}

function startGame() {
  gameFrame.value?.contentWindow.postMessage({ type: "START_GAME" }, "*");
}

function pauseGame() {
  gameFrame.value?.contentWindow.postMessage({ type: "PAUSE_GAME" }, "*");
}

function resetGame() {
  gameFrame.value?.contentWindow.postMessage({ type: "RESET_GAME" }, "*");
}

onMounted(() => {
  window.addEventListener("message", handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage);
});
</script>

<style scoped>
.snake-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #121212;
  color: white;
  font-family: sans-serif;
}

iframe {
  width: 400px;
  height: 400px;
  border: 2px solid #00ff6a;
  border-radius: 12px;
  background: #000;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
  background: #00ff6a;
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
