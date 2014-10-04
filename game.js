function Cell(x, y, val) {
  this.x = x;
  this.y = y;
  this.val = val;
}

function Grid(w, h, cellSize) {
  this.row = Math.round(h / cellSize);
  this.col = Math.round(w / cellSize);
  this.cellSize = cellSize;
  this.INVALID = 0;
  this.VALID = 1;
  this.FOOD = 2;
  this.grid = new Array(this.row);
  this.init = function() {
    for (var i = 0; i < this.row; i++) {
      this.grid[i] = new Array(this.col);
    }

    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        this.grid[i][j] = new Cell(i, j, this.VALID);
      }
    }
  }

  this.get = function(row, col) {
    return this.grid[row][col];
  }

  this.gridBorderColor = getColor(50, 50, 50);
  this.gridLinesColor = getColor(200, 200, 200);

  this.set = function(row, col, val) {
    this.grid[row][col].val = val;
  }

  this.print = function() {
    for (var i = 0; i < this.row; i++) {
      var temp = "";
      for (var j = 0; j < this.col; j++) {
        temp += " " + this.grid[row][col].val;
      }
      Console.log(temp);
    }
  }
  
  this.draw = function(ctx) {
    var width = this.col * this.cellSize;
    var height = this.row * this.cellSize;

    ctx.lineWidth = 1.0;
    ctx.strokeStyle = this.gridLinesColor;
    ctx.beginPath();
    ctx.moveTo(0, this.cellSize);
    for (var i = 1; i < this.row; i++) {
      ctx.lineTo(width, i * this.cellSize);
      ctx.moveTo(0, (i+1) * this.cellSize);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.cellSize, 0);
    for (var i = 1; i < this.col; i++) {
      ctx.lineTo(i * this.cellSize, height);
      ctx.moveTo((i + 1) * this.cellSize, 0);
    }

    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 5.0;
    ctx.strokeStyle = this.gridBorderColor;
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
  }
}


function Body(x, y) {
  this.x = x;
  this.y = y;
}

function Snake(w, h, cellSize) {
  this.x = cellSize * 5;
  this.y = cellSize * 5;
  this.cellSize = cellSize;
  this.grid = new Grid(w, h, cellSize);
  this.body = new Array();
  this.moveTicks = 5.0;
  this.moveSpeed = 100.0;
  
  this.headColor = getColor(200, 0, 0);
  this.bodyColor = getColor(0, 0, 200);

  this.moveDir = "E";
  this.lastMoveDir = "E";
  
  this.init = function() {
    this.ticks = 0.0;
    this.grid.init();
    for (var i = 0; i < 4; i++) {
      this.body.push(new Body(this.x, this.y + (i * this.cellSize)));
      this.grid.set((this.y + (i * this.cellSize)) / this.cellSize, this.x / this.cellSize, this.grid.INVALID);
    }
  }
  
  this.update = function (frameTime) {
    this.moveTicks += frameTime * this.moveSpeed;
    if (this.moveTicks >= this.cellSize) {
      this.move();
      this.moveTicks = 0.0;
    }
  }

  this.setMoveDir = function (dir) {
    if (this.canMove(dir)) {
      this.moveDir = dir;
    }
  }

  this.canMove = function(dir) {
    var x, y;

    var headIndexX = this.body[0].x / this.cellSize;
    var headIndexY = this.body[0].y / this.cellSize;
    
    switch (dir) {
    case 'E':
      x = 1;
      y = 0;
      break;
    case 'N':
      y = -1;
      x = 0;
      break;
    case 'W':
      x = -1;
      y = 0;
      break;
    case 'S':
      x = 0;
      y = 1;
      break;
    }

    if (headIndexX + x < 0 || headIndexX + x >= this.grid.col) {
      return false;
    }

    if (headIndexY + y < 0 || headIndexY + y >= this.grid.row) {
      return false;
    }

    if (this.grid.get(headIndexY + y,headIndexX + x).val == this.grid.INVALID) {
      return false;
    }

    return true;
  }

  this.move = function() {
    var x, y;

    var headIndexX = this.body[0].x / this.cellSize;
    var headIndexY = this.body[0].y / this.cellSize;
    
    switch (this.moveDir) {
    case 'E':
      x = 1;
      y = 0;
      break;
    case 'N':
      y = -1;
      x = 0;
      break;
    case 'W':
      x = -1;
      y = 0;
      break;
    case 'S':
      x = 0;
      y = 1;
      break;
    }
    
    this.grid.set(this.body[this.body.length - 1].y / this.cellSize, this.body[this.body.length - 1].x / this.cellSize, this.grid.INVALID);    
    
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    this.body[0].x += x * this.cellSize;
    this.body[0].y += y * this.cellSize;
    this.grid.set(this.body[0].y / this.cellSize, this.body[0].x / this.cellSize, this.grid.INVALID);
  }
  
  this.draw = function(ctx) {
    this.grid.draw(ctx);

    ctx.fillStyle = this.headColor;
    ctx.fillRect(this.body[0].x, this.body[0].y, this.cellSize, this.cellSize);

    ctx.fillStyle = this.bodyColor;
    for (var i = 1; i < this.body.length; i++) {
      ctx.fillRect(this.body[i].x, this.body[i].y, this.cellSize, this.cellSize);
    }
  }
}

function getColor(r, g, b) {
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
