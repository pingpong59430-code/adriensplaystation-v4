const scene = document.getElementById("scene");
const ps2 = document.getElementById("ps2");
const tv = document.getElementById("tv");
const hint = document.getElementById("hint");
const menu = document.getElementById("menu");

/* SONS */
const ps2Sound = new Audio("sounds/ps2.mp3");
const clickSound = new Audio("sounds/clicks.mp3");
const music = new Audio("sounds/music.mp3");
music.loop = true;
music.volume = 0.35;

let step = 0;

/* ÉTAPE 1 : PS2 */
ps2.addEventListener("click", () => {
  if (step !== 0) return;
  step = 1;

  clickSound.play().catch(()=>{});
  ps2.style.transform = "scale(1.05)";
  hint.textContent = "Appuie sur la TV";
});

/* ÉTAPE 2 : TV */
tv.addEventListener("click", () => {
  if (step !== 1) return;
  step = 2;

  ps2Sound.play().catch(()=>{});
  tv.style.filter = "brightness(1)";
  hint.textContent = "";

  /* ZOOM DANS LA TV */
  setTimeout(() => {
    scene.style.transition = "transform 1.5s";
    scene.style.transform = "scale(4)";
  }, 300);

  /* ARRIVÉE MENU */
  setTimeout(() => {
    scene.style.display = "none";
    music.play().catch(()=>{});
    menu.style.display = "grid";
    loadGames();
  }, 1800);
});

/* CHARGER JEUX */
function loadGames() {
  fetch("games.json")
    .then(r => r.json())
    .then(games => {
      menu.innerHTML = "";
      games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.textContent = game.name;
        menu.appendChild(card);
      });
    });
}
