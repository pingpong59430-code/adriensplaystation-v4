const bootScreen = document.getElementById("boot-screen");
const menu = document.getElementById("menu");
const gamesDiv = document.getElementById("games");

const bootSound = document.getElementById("bootSound");
const clickSound = document.getElementById("clickSound");

let started = false;

// LISTE DES JEUX
const games = [
  { name: "Candy Crush", path: "games/candy-crush/index.html" },
  { name: "Archery Game", path: "games/archery-game/index.html" },
  { name: "Speed Typing Game", path: "games/speed-typing-game/index.html" },
  { name: "Breakout Game", path: "games/breakout-game/index.html" },
  { name: "Minesweeper", path: "games/minesweeper/index.html" },
  { name: "Tetris", path: "games/tetris/index.html" },
  { name: "Ping Pong", path: "games/ping-pong/index.html" },
  { name: "Tower Blocks", path: "games/tower-blocks/index.html" }
];

// BOOT CLICK
document.addEventListener("click", () => {
  if (started) return;
  started = true;

  bootSound.play();

  bootScreen.style.transition = "transform 2s, opacity 2s";
  bootScreen.style.transform = "scale(3)";
  bootScreen.style.opacity = "0";

  setTimeout(() => {
    bootScreen.style.display = "none";
    showMenu();
  }, 2000);
});

function showMenu() {
  menu.style.display = "block";

  games.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";
    div.textContent = game.name;

    div.onclick = () => {
      clickSound.currentTime = 0;
      clickSound.play();
      setTimeout(() => {
        window.location.href = game.path;
      }, 300);
    };

    gamesDiv.appendChild(div);
  });
}
