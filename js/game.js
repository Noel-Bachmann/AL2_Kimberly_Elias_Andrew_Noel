const dino = document.getElementById("dino");
const rock = document.getElementById("rock");
const score = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const hearts = document.getElementById("hearts");
const game = document.getElementById("game");
 
let animationId;
let gameInterval;
let backgroundPositionX = 0;
let running = false;
let currentScore = 0;
let lives = 3;
let isInvincible = false;
 
function updateHearts() {
  hearts.innerText = "❤️".repeat(lives);
}
 
function jump() {
  if (dino.classList.contains("jumping")) return;
 
  dino.classList.add("jumping");
  dino.style.bottom = "60%";
 
  setTimeout(() => {
    dino.style.bottom = "0";
    setTimeout(() => {
      dino.classList.remove("jumping");
    }, 300);
  }, 300);
}
 
function startGame() {
  if (running) return;
  running = true;
 
  rock.style.animation = "none";
  rock.offsetHeight;
  rock.style.animation = `rock 1.5s linear infinite`;
  rock.style.animationPlayState = "running";
 
  gameInterval = setInterval(() => {
    const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    const rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));
 
    currentScore++;
    score.innerText = currentScore;
 
    if (rockLeft < 75 && rockLeft > 0 && dinoBottom < 50 && !isInvincible) {
      lives--;
      updateHearts();
      isInvincible = true;
 
      if (lives <= 0) {
        endGame();
      } else {
        resetRock();
        setTimeout(() => {
          isInvincible = false;
        }, 1000);
      }
    }
  }, 50);
 
  animateBackground();
}
 
function animateBackground() {
  backgroundPositionX -= 2;
  game.style.backgroundPosition = `${backgroundPositionX}px bottom`;
  if (running) {
    animationId = requestAnimationFrame(animateBackground);
  }
}
 
function pauseGame() {
  if (!running) return;
  clearInterval(gameInterval);
  cancelAnimationFrame(animationId);
  running = false;
  rock.style.animationPlayState = "paused";
}
 
function endGame() {
  let message = `Spiel vorbei! Du hattest ${currentScore} Punkte.`;
  if (currentScore >= 300) {
    message += `\n\n🎉 Glückwunsch! Du bekommst den Rabattcode "Winner20!" für 20% beim nächsten Einkauf.`;
  }
 
  alert(message);
 
  clearInterval(gameInterval);
  cancelAnimationFrame(animationId);
  running = false;
  rock.style.animationPlayState = "paused";
  currentScore = 0;
  lives = 3;
  isInvincible = false;
  score.innerText = "0";
  updateHearts();
  backgroundPositionX = 0;
  game.style.backgroundPosition = `0px bottom`;
  resetRock();
}
 
function resetRock() {
  rock.style.animation = "none";
  rock.offsetHeight;
  rock.style.left = "100%";
  rock.style.animation = `rock 1.5s linear infinite`;
  rock.style.animationPlayState = running ? "running" : "paused";
}
 
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    if (!running) {
      startGame();
    } else {
      jump();
    }
    event.preventDefault();
  }
});
 
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
 
updateHearts();
rock.style.animationPlayState = "paused";
