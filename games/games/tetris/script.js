document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const startBtn = document.getElementById("start");

  const COLS = 10;
  const ROWS = 22;
  const SIZE = 20;
  let board = [];
  let piece = null;
  let timer = null;

  const SHAPES = [
    [[1,1,1,1]],
    [[1,1],[1,1]],
    [[0,1,0],[1,1,1]],
    [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]],
    [[1,1,0],[0,1,1]],
    [[0,1,1],[1,1,0]]
  ];

  function resetBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  function newPiece() {
    return {
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      x: 4,
      y: 0
    };
  }

  function draw() {
    canvas.innerHTML = "";

    board.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v) drawBlock(x, y);
      });
    });

    piece.shape.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v) drawBlock(piece.x + x, piece.y + y, true);
      });
    });
  }

  function drawBlock(x, y, active = false) {
    const el = document.createElement("div");
    el.className = "square " + (active ? "type1" : "type3");
    el.style.left = x * SIZE + "px";
    el.style.top = y * SIZE + "px";
    canvas.appendChild(el);
  }

  function collide(px, py, shape) {
    return shape.some((row, y) =>
      row.some((v, x) => {
        if (!v) return false;
        const nx = px + x;
        const ny = py + y;
        return nx < 0 || nx >= COLS || ny >= ROWS || (ny >= 0 && board[ny][nx]);
      })
    );
  }

  function merge() {
    piece.shape.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v) board[piece.y + y][piece.x + x] = 1;
      });
    });
  }

  function drop() {
    if (!collide(piece.x, piece.y + 1, piece.shape)) {
      piece.y++;
    } else {
      merge();
      piece = newPiece();
      if (collide(piece.x, piece.y, piece.shape)) {
        clearInterval(timer);
        alert("GAME OVER");
        return;
      }
    }
    draw();
  }

  function move(dir) {
    if (!collide(piece.x + dir, piece.y, piece.shape)) {
      piece.x += dir;
      draw();
    }
  }

  function rotate() {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map(r => r[i]).reverse()
    );
    if (!collide(piece.x, piece.y, rotated)) {
      piece.shape = rotated;
      draw();
    }
  }

  document.addEventListener("keydown", e => {
    if (!piece) return;
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
    if (e.key === "ArrowDown") drop();
    if (e.key === "ArrowUp") rotate();
  });

  startBtn.onclick = () => {
    startBtn.style.display = "none";
    resetBoard();
    piece = newPiece();
    draw();
    timer = setInterval(drop, 500);
  };
});
