function Cell(x, y, val) {
  this.x = x;
  this.y = y;
  this.val = val;
}

function Grid(w, h, cellSize) {
  this.consts = {"food", }
  this.row = Math.round(h / cellSize);
  this.col = (w / cellSize);
  this.INVALID = 0;
  this.VALID = 1;
  this.FOOD = 2;
  this.grid = new Array(this.row);
  this.init = function() {
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.col);
    }

    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        this.grid[i][j] = this.VALID 
      }
    }
  }
}


function Body(x, y) {
  this.x = x;
  this.y = y;
}

function Snake(init_x, init_y, w, h, cellSize) {
  this.x = init_x;
  this.y = init_y;
  this.grid = new Grid(w, h, cellSize);
  this.arr = new Array();
  this.init = function() {
    
  }
}
