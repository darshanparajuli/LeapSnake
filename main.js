var WIDTH = 600, HEIGHT = 600;

var ctx;
var canvas;

var previousFrame;

var motionDir;

$(function() {
  canvas = $("#canvas")[0];
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext('2d');

  angle = 0.0;

  previousFrame = null;
  
  loop();
});

Leap.loop({enableGestures: true}, function(frame) {
  motionDir = null;

  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
        case "swipe":
          var angle = Math.atan2(gesture.direction[1],
                                 gesture.direction[0]) * 180 / Math.PI;
          motionDir = getDirection(angle);

          console.log(motionDir);
          break;
        }
    });
  }
  
  
  previousFrame = frame;
});

function getDirection(ang) {
  if ((ang > -30 && ang < 0) || (ang > 0 && ang < 30)) {
    return 'E';
  } else if (ang > 60 && ang < 120) {
    return 'N';
  } else if ((ang > 150 && ang < 180) || (ang > -180 && ang < -150)) {
    return 'W';
  } else if (ang > -120 && ang < -60) {
    return 'S';
  }


  return null;
}

function drawCircle(x, y, radius, r, g, b) {
  ctx.beginPath();
  ctx.arc(x, y, 50, 0, radius * Math.PI / 180, false);
  console.log(radius);
  ctx.fillStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  ctx.fill();
}

function square(n) {
  return n * n;
}

function updateAll() {
  
}

function drawAll() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function loop() {
    requestAnimationFrame(loop);
    updateAll();
    drawAll();
}

function vectorMag(v) {
  return square(v[0]) + square(v[1]) + square(v[2]);
}

function vectorDot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function vectorFindBiggestComponent(v) {
  var temp = { "comp": 0, "val": v[0] };
  if (temp < v[1]) {
    temp.comp = 1;
    temp.val = v[1];
  }

  if (temp < v[2]) {
    temp.comp = 2;
    temp.val = v[2];
  }

  return temp;
}
