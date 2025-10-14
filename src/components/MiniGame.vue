<template>
    <div>
        <button @click="closeGame">X</button>
        <button @click="playGame">PLAY</button>
    </div>
  <div ref="miniGame" class="game-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Phaser from "phaser";

const miniGame = ref(null);
let game = null;

onMounted(() => {
  const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    backgroundColor: "#222",
    parent: miniGame.value, // 👈 Phaser se monta dentro del div
    physics: { default: "arcade" },
    scene: { preload, create, update },
  };

  game = new Phaser.Game(config);
});

onBeforeUnmount(() => {
  if (game) game.destroy(true);
});

let snake = [];
let direction = "RIGHT";
let moveTimer = 0;
let moveInterval = 150;
let gridSize = 20;
let food;
let score = 0;
let scoreText;

function closeGame(){
    game.destroy(true);
}
function playGame(){
    const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    backgroundColor: "#222",
    parent: miniGame.value, // 👈 Phaser se monta dentro del div
    physics: { default: "arcade" },
    scene: { preload, create, update },
  };

  game = new Phaser.Game(config);
}
function preload() {}

function create() {
  snake = [
    this.add.rectangle(100, 100, gridSize, gridSize, 0x00ff00),
    this.add.rectangle(80, 100, gridSize, gridSize, 0x00aa00),
    this.add.rectangle(60, 100, gridSize, gridSize, 0x008800),
  ];

  food = this.add.rectangle(200, 200, gridSize, gridSize, 0xff0000);
  placeFood();

  scoreText = this.add.text(10, 10, "Puntuación: 0", { fontSize: "16px", fill: "#fff" });

  this.input.keyboard.on("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "DOWN") direction = "UP";
        break;
      case "ArrowDown":
        if (direction !== "UP") direction = "DOWN";
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") direction = "LEFT";
        break;
      case "ArrowRight":
        if (direction !== "LEFT") direction = "RIGHT";
        break;
    }
  });
}

function update(time) {
  if (time > moveTimer) {
    moveSnake.call(this);
    moveTimer = time + moveInterval;
  }
}

function moveSnake() {
  const head = snake[0];
  const newX = head.x + (direction === "LEFT" ? -gridSize : direction === "RIGHT" ? gridSize : 0);
  const newY = head.y + (direction === "UP" ? -gridSize : direction === "DOWN" ? gridSize : 0);

  const newHead = this.add.rectangle(newX, newY, gridSize, gridSize, 0x00ff00);
  snake.unshift(newHead);

  if (Phaser.Geom.Intersects.RectangleToRectangle(newHead.getBounds(), food.getBounds())) {
    score += 10;
    scoreText.setText("Puntuación: " + score);
    placeFood();
  } else {
    const tail = snake.pop();
    tail.destroy();
  }

  checkCollision.call(this, newHead);
}

function checkCollision(head) {
  if (
    head.x < 0 ||
    head.x >= 400 ||
    head.y < 0 ||
    head.y >= 400
  ) {
    resetGame.call(this);
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame.call(this);
      return;
    }
  }
}

function placeFood() {
  const x = Phaser.Math.Between(0, (400 / gridSize) - 1) * gridSize;
  const y = Phaser.Math.Between(0, (400 / gridSize) - 1) * gridSize;
  food.setPosition(x, y);
}

function resetGame() {
  snake.forEach((segment) => segment.destroy());
  score = 0;
  scoreText.setText("Puntuación: 0");
  direction = "RIGHT";
  snake = [
    this.add.rectangle(100, 100, gridSize, gridSize, 0x00ff00),
    this.add.rectangle(80, 100, gridSize, gridSize, 0x00aa00),
    this.add.rectangle(60, 100, gridSize, gridSize, 0x008800),
  ];
  placeFood();
}
</script>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  margin: auto;
}
</style>
