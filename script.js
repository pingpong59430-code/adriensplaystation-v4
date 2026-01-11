const startScreen = document.getElementById("startScreen");
const menu = document.getElementById("menu");
const player = document.getElementById("player");
const frame = document.getElementById("gameFrame");
const closeBtn = document.getElementById("close");
const loading = document.getElementById("loading");

/* 🎵 SONS (NOMS FIXES, PAS D’INVERSION) */
const ps2Sound = new Audio("sounds/ps2.mp3");
const clickSound = new Audio("sounds/clicks.mp3");

ps2Sound.volume = 0.8;
clickSound.volume = 0.6;

let started = false;

/* ▶️ DÉMARRAGE */
startScreen.addEventListener("click", async () => {
  if (started) return;
  started = true;

  // Débloque l’audio navigateur
  await clickSound.play().catch(() => {});
  clickSound.pause();
  clickSound.currentTime = 0;

  ps2Sound.play().catch(() => {});

  startScreen.style.display = "none";

  setTimeout(() => {
    menu.style.display = "grid";
    loadGames();
  }, 1200);
});

/* 🎮 MENU */
function loadGames() {
  fetch("games.json")
    .then(r => r.json())
    .then(games => {
      menu.innerHTML = "";
      games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.textContent = game.name;

        card.onclick = () => {
          clickSound.currentTime = 0;
          clickSound.play().catch(() => {});
          launchGame(game.path);
        };

        menu.appendChild(card);
      });
    });
}

/* ▶️ LANCER JEU */
function launchGame(path) {
  menu.style.display = "none";
  loading.style.display = "flex";

  setTimeout(() => {
    player.style.display = "block";
    frame.src = path;

    frame.onload = () => {
      loading.style.display = "none";
    };
  }, 500);
}

/* ⬅️ RETOUR */
closeBtn.onclick = () => {
  frame.src = "";
  player.style.display = "none";
  menu.style.display = "grid";
};
