const startScreen = document.getElementById("startScreen");
const menu = document.getElementById("menu");
const player = document.getElementById("player");
const frame = document.getElementById("gameFrame");
const closeBtn = document.getElementById("close");

/* ✅ SONS — NOMS CORRIGÉS */
const bootSound = new Audio("sounds/ps2.mp3");
const clickSound = new Audio("sounds/clicks.mp3");

bootSound.volume = 0.7;
clickSound.volume = 0.6;

let started = false;

/* ▶️ DÉMARRAGE */
startScreen.addEventListener("click", () => {
  if (started) return;
  started = true;

  bootSound.currentTime = 0;
  bootSound.play().catch(() => {});

  startScreen.style.display = "none";

  setTimeout(() => {
    menu.style.display = "grid";
    loadGames();
  }, 1500);
});

/* 🎮 CHARGER LES JEUX */
function loadGames() {
  fetch("games.json")
    .then(res => res.json())
    .then(games => {
      menu.innerHTML = "";

      games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.textContent = game.name;

        card.addEventListener("click", () => {
          clickSound.currentTime = 0;
          clickSound.play().catch(() => {});
          launchGame(game.path);
        });

        menu.appendChild(card);
      });
    })
    .catch(err => console.error("Erreur games.json", err));
}

/* ▶️ LANCER UN JEU */
function launchGame(path) {
  menu.style.display = "none";
  player.style.display = "block";
  frame.src = path;
}

/* ⬅️ RETOUR MENU */
closeBtn.addEventListener("click", () => {
  frame.src = "";
  player.style.display = "none";
  menu.style.display = "grid";
});
