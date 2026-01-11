const startScreen = document.getElementById("startScreen");
const menu = document.getElementById("menu");
const player = document.getElementById("player");
const frame = document.getElementById("gameFrame");
const closeBtn = document.getElementById("close");

/* 🔊 SONS — BIEN MAPPÉS */
const ps2Sound = new Audio("./sounds/ps2.mp3");      // démarrage
const clickSound = new Audio("./sounds/clicks.mp3"); // clic menu

ps2Sound.volume = 0.8;
clickSound.volume = 0.6;

let started = false;

/* ▶️ DÉMARRAGE (PS2) */
startScreen.addEventListener("click", () => {
  if (started) return;
  started = true;

  ps2Sound.currentTime = 0;
  ps2Sound.play().catch(() => {});

  startScreen.style.display = "none";

  setTimeout(() => {
    menu.style.display = "grid";
    loadGames();
  }, 1500);
});

/* 🎮 MENU JEUX */
function loadGames() {
  fetch("games.json")
    .then(r => r.json())
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
    });
}

/* ▶️ LANCER JEU */
function launchGame(path) {
  menu.style.display = "none";
  player.style.display = "block";
  frame.src = path;
}

/* ⬅️ RETOUR */
closeBtn.addEventListener("click", () => {
  frame.src = "";
  player.style.display = "none";
  menu.style.display = "grid";
});
