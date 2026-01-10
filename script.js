fetch("games.json")
  .then(res => res.json())
  .then(games => {
    const container = document.querySelector(".games");

    games.forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.tabIndex = 0;

      card.innerHTML = `<span>${game.name}</span>`;

      `;

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

function launchGame(path) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("player").style.display = "block";
  document.getElementById("gameFrame").src = path;
}

function closeGame() {
  document.getElementById("gameFrame").src = "";
  document.getElementById("player").style.display = "none";
  document.getElementById("menu").style.display = "block";
}
