let audioUnlocked = false;

// AUDIO UNLOCK (OBLIGATOIRE POUR TOUS LES NAVIGATEURS)
document.getElementById("audioUnlock").addEventListener("click", () => {
  const sound = document.getElementById("psSound");

  sound.muted = true;
  sound.play().then(() => {
    sound.pause();
    sound.currentTime = 0;
    sound.muted = false;

    audioUnlocked = true;
    document.getElementById("audioUnlock").style.display = "none";
  });
});

// MENU AUTO
fetch("games.json")
  .then(res => res.json())
  .then(games => {
    const container = document.querySelector(".games");

    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.textContent = game.name;
      card.onclick = () => launchGame(game.path, game.name);
      container.appendChild(card);
    });
  });

// LANCEMENT JEU + SON PS2
function launchGame(path, name) {
  const menu = document.getElementById("menu");
  const player = document.getElementById("player");
  const frame = document.getElementById("gameFrame");
  const boot = document.getElementById("bootScreen");
  const title = document.getElementById("bootTitle");
  const sound = document.getElementById("psSound");

  title.textContent = name;

  if (audioUnlocked) {
    sound.currentTime = 0;
    sound.play();
  }

  menu.style.display = "none";
  boot.style.display = "flex";

  setTimeout(() => {
    boot.style.display = "none";
    player.style.display = "block";
    frame.src = path;
  }, 1200);
}

// RETOUR MENU
function closeGame() {
  document.getElementById("gameFrame").src = "";
  document.getElementById("player").style.display = "none";
  document.getElementById("menu").style.display = "block";
}
