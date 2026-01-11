const menu = document.getElementById("menu");
const player = document.getElementById("player");
const frame = document.getElementById("frame");
const back = document.getElementById("back");

fetch("games.json")
  .then(res => res.json())
  .then(games => {
    games.forEach(game => {
      const div = document.createElement("div");
      div.className = "game";
      div.textContent = game.name;
      div.onclick = () => launchGame(game.path);
      menu.appendChild(div);
    });
  });

function launchGame(path) {
  menu.style.display = "none";
  player.style.display = "flex";
  frame.src = path;
}

back.onclick = () => {
  frame.src = "";
  player.style.display = "none";
  menu.style.display = "grid";
};
