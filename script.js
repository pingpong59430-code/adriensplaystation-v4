fetch("games.json")
  .then(res => res.json())
  .then(games => {
    const container = document.querySelector(".games");

    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.tabIndex = 0;

      // TEXTE SEUL (PAS D’IMAGE)
      card.innerHTML = `<span>${game.name}</span>`;

      card.onclick = () => launchGame(game.path);
      card.onkeydown = e => {
        if (e.key === "Enter") launchGame(game.path);
      };

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Erreur chargement games.json", err);
  });

function launchGame(path, name) {
  const menu = document.getElementById("menu");
  const player = document.getElementById("player");
  const frame = document.getElementById("gameFrame");
  const boot = document.getElementById("bootScreen");
  const title = document.getElementById("bootTitle");

  const clickSound = document.getElementById("clickSound");
  const bootSound = document.getElementById("bootSound");

  // 🔊 son clic (interaction utilisateur)
  clickSound.currentTime = 0;
  clickSound.play();

  title.textContent = name;
  menu.style.display = "none";
  boot.style.display = "flex";

  // 🔊 son boot ENCHAÎNÉ (autorisé)
  clickSound.onended = () => {
    bootSound.currentTime = 0;
    bootSound.play();
  };

  // lancement du jeu
  setTimeout(() => {
    boot.style.display = "none";
    player.style.display = "block";
    frame.src = path;
  }, 1200);
}


  // 🔊 sons
  clickSound.currentTime = 0;
  clickSound.play();

  title.textContent = name;
  menu.style.display = "none";
  boot.style.display = "flex";

  setTimeout(() => {
    bootSound.currentTime = 0;
    bootSound.play();

    boot.style.display = "none";
    player.style.display = "block";
    frame.src = path;
  }, 1200);
}


function closeGame() {
  document.getElementById("gameFrame").src = "";
  document.getElementById("player").style.display = "none";
  document.getElementById("menu").style.display = "block";
}
