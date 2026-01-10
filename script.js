document.addEventListener("click", () => {
  document.body.requestFullscreen?.();
}, { once: true });
function launchGame(path) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("player").style.display = "block";

  // CHEMIN RELATIF AU SITE (IMPORTANT)
  document.getElementById("gameFrame").src = path;
}

function closeGame() {
  document.getElementById("gameFrame").src = "";
  document.getElementById("player").style.display = "none";
  document.getElementById("menu").style.display = "block";
}
