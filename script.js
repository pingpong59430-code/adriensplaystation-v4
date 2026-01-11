// === SONS PS2 ===
const bootSound = new Audio("sounds/ps2.mp3");
const clickSound = new Audio("sounds/click.mp3");

// réglages
bootSound.volume = 0.7;
clickSound.volume = 0.7;

// état
let started = false;

// écran de démarrage
const startScreen = document.getElementById("startScreen");
const menu = document.getElementById("menu");

// clic pour démarrer la "console"
startScreen.addEventListener("click", () => {
  if (started) return;
  started = true;

  // jouer le BOOT PS2
  bootSound.currentTime = 0;
  bootSound.play();

  // cacher l'écran de démarrage après le son
  setTimeout(() => {
    startScreen.style.display = "none";
    menu.style.display = "block";
  }, 3000); // durée approx du son PS2
});

// son de clic sur les jeux
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("game-card")) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});
