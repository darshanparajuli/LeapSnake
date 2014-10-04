function Grid(w, h, cellSize) {
  this.row = Math.round(h / cellSize);
  this.col = (w / cellSize);
  this.grid = new Array(this.row);
  this.init = function() {
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.col);
    }

    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
        
      }
    }
  }
}


function Body(x, y) {
  this.x = x;
  this.y = y;
}

function Snake(init_x, init_y) {
  this.x = init_x;
  this.y = init_y;
  this.arr = new Array();
  this.init = function() {
    
  }
}
