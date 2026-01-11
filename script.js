// === SONS ===
const bootSound = new Audio("sounds/ps2.mp3");
const clickSound = new Audio("sounds/click.mp3");

bootSound.volume = 0.7;
clickSound.volume = 0.7;

let started = false;

const startScreen = document.getElementById("startScreen");
const menu = document.getElementById("menu");

// clic démarrage
startScreen.addEventListener("click", () => {
  if (started) return;
  started = true;

  bootSound.currentTime = 0;
  bootSound.play();

  setTimeout(() => {
    startScreen.style.display = "none";
    menu.style.display = "grid";
  }, 3000);
});

// clic sur les jeux
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("game-card")) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});
