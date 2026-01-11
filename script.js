const boot = document.getElementById("boot");
const scene = document.getElementById("scene");
const screen = document.getElementById("screen");

const bootSound = document.getElementById("bootSound");
const clickSound = document.getElementById("clickSound");

boot.onclick = () => {
  bootSound.play();
  boot.style.display = "none";
  scene.style.display = "block";
  loadMenu();
};

// MENU HTML injecté dans la TV
function loadMenu() {
  screen.srcdoc = `
    <html>
    <body style="
      background: linear-gradient(120deg,#0a1f3d,#000);
      color:white;
      font-family:Arial;
      padding:20px;
    ">
      <h2>Adrien's PlayStation V4</h2>
      <div id="games"></div>

      <script>
        const games = [
          ["Candy Crush","games/candy-crush/index.html"],
          ["Archery Game","games/archery-game/index.html"],
          ["Speed Typing Game","games/speed-typing-game/index.html"],
          ["Breakout Game","games/breakout-game/index.html"],
          ["Minesweeper","games/minesweeper/index.html"],
          ["Tetris","games/tetris/index.html"],
          ["Ping Pong","games/ping-pong/index.html"],
          ["Tower Blocks","games/tower-blocks/index.html"]
        ];

        const container = document.getElementById("games");

        games.forEach(g=>{
          const b=document.createElement("div");
          b.textContent=g[0];
          b.style.padding="12px";
          b.style.margin="10px 0";
          b.style.background="rgba(255,255,255,.15)";
          b.style.cursor="pointer";
          b.onclick=()=>parent.launchGame(g[1]);
          container.appendChild(b);
        });
      <\/script>
    </body>
    </html>
  `;
}

// LANCEMENT DES JEUX DANS LA TV
window.launchGame = (path) => {
  clickSound.currentTime = 0;
  clickSound.play();
  screen.src = path;
};
