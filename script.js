const startScreen = document.getElementById("startScreen");
const bootSound = document.getElementById("bootSound");
const clickSound = document.getElementById("clickSound");

startScreen.addEventListener("click", () => {
  // clic utilisateur réel → audio autorisé
  clickSound.currentTime = 0;
  clickSound.play();

  bootSound.currentTime = 0;
  bootSound.play();

  startScreen.innerText = "Démarrage...";
});
