(function () {
  var isStart = false;

  var tetris = {
    board: [],
    canvas: null,
    pSize: 20,
    canvasHeight: 440,
    canvasWidth: 200,
    boardHeight: 0,
    boardWidth: 0,
    spawnX: 4,
    spawnY: 1,

    shapes: [
      [[-1, 1],[0,1],[1,1],[0,0]],
      [[-1,0],[0,0],[1,0],[2,0]],
      [[-1,-1],[-1,0],[0,0],[1,0]],
      [[1,-1],[-1,0],[0,0],[1,0]],
      [[0,-1],[1,-1],[-1,0],[0,0]],
      [[-1,-1],[0,-1],[0,0],[1,0]],
      [[0,-1],[1,-1],[0,0],[1,0]]
    ],

    curShape: null,
    curShapeIndex: 0,
    curX: 0,
    curY: 0,
    curSqs: [],
    speed: 600,
    timer: null,

    init: function () {
      isStart = true;
      this.canvas = document.getElementById("canvas");
      this.initBoard();
      this.newShape();
      this.bindKeys();
      this.loop();
    },

    initBoard: function () {
      this.boardHeight = this.canvasHeight / this.pSize;
      this.boardWidth = this.canvasWidth / this.pSize;
    },

    newShape: function () {
      this.curShapeIndex = Math.floor(Math.random() * this.shapes.length);
      this.curShape = this.shapes[this.curShapeIndex];
      this.curX = this.spawnX;
      this.curY = this.spawnY;
      this.draw();
    },

    draw: function () {
      this.clear();
      for (let i = 0; i < this.curShape.length; i++) {
        const x = (this.curShape[i][0] + this.curX) * this.pSize;
        const y = (this.curShape[i][1] + this.curY) * this.pSize;
        const el = document.createElement("div");
        el.className = "square type" + this.curShapeIndex;
        el.style.left = x + "px";
        el.style.top = y + "px";
        this.canvas.appendChild(el);
        this.curSqs.push(el);
      }
    },

    clear: function () {
      this.curSqs.forEach(el => this.canvas.removeChild(el));
      this.curSqs = [];
    },

    move: function (dx, dy) {
      this.curX += dx;
      this.curY += dy;
      this.draw();
    },

    loop: function () {
      this.timer = setInterval(() => {
        this.move(0, 1);
      }, this.speed);
    },

    bindKeys: function () {
      document.addEventListener("keydown", e => {
        if (!isStart) return;
        if (e.key === "ArrowLeft") this.move(-1, 0);
        if (e.key === "ArrowRight") this.move(1, 0);
        if (e.key === "ArrowDown") this.move(0, 1);
      });
    }
  };

  document.getElementById("start").addEventListener("click", function () {
    this.style.display = "none";
    if (!isStart) tetris.init();
  });
})();
