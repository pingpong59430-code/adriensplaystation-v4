const boot = document.getElementById("bootScreen");
const scene = document.getElementById("scene");
const bootSound = document.getElementById("bootSound");
const clickSound = document.getElementById("clickSound");

boot.addEventListener("click", () => {
  clickSound.play();
  boot.style.display = "none";

  setTimeout(() => {
    bootSound.play();
    scene.classList.remove("hidden");
  }, 300);
});
