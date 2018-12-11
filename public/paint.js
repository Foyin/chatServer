
//color c=color(0);
var x, y, xp, yp;
var strokeW;
var flag = 0;
var incThicknessBtn, decThicknessBtn, resetThicknessBthn;
var socket = io();
var r0, g0, b0;
var rSlider, gSlider, bSlider;
var sliderValue;

function setup() {
  var canvas = createCanvas(800, 800);
  canvas.parent('wbPanel');
  canvas.style('width', '100%');
  canvas.style('height', '100%');
  strokeW = 1;

  // create sliders
  rSlider = createSlider(0, 255, 100);
  rSlider.parent('wbPanel');
  rSlider.style('width', '100%');
  rSlider.style('height', '5%');
  rSlider.style('-webkit-appearance', 'none');
  //rSlider.style('opacity', '0.5');
  rSlider.style('background', 'linear-gradient(to right, black , red)');
  rSlider.position(0, 0);
    text("yes", width - 200, 0);
  

  gSlider = createSlider(0, 255, 0);
  gSlider.parent('wbPanel');
  gSlider.style('width', '100%');
  gSlider.style('height', '5%');
  gSlider.style('-webkit-appearance', 'none');
  //gSlider.style('opacity', '0.5');
  gSlider.style('background', 'linear-gradient(to right, black , green)');
  gSlider.position(0, 0.03*height);

  bSlider = createSlider(0, 255, 255);
  bSlider.parent('wbPanel');
  bSlider.style('width', '100%');
  bSlider.style('height', '5%');
  bSlider.style('-webkit-appearance', 'none');
  //bSlider.style('opacity', '0.5');
  bSlider.style('background', 'linear-gradient(to right, black , blue)');
  bSlider.position(0, 0.06*height);
 
  var btnSize = '8%';
  var btnY = 0.1005*height;
  incThicknessBtn = createButton(' ');
  incThicknessBtn.parent('wbPanel');
  incThicknessBtn.position(0, btnY);
  incThicknessBtn.mousePressed(incThickness);
  incThicknessBtn.style('background-color', 'black');
  incThicknessBtn.style('width', btnSize);
  incThicknessBtn.style('height', btnSize);

  decThicknessBtn = createButton(' ');
  decThicknessBtn.parent('wbPanel');
  decThicknessBtn.position(0.08*width, btnY);
  decThicknessBtn.mousePressed(decThickness);
  decThicknessBtn.style('background-color', 'white');
  decThicknessBtn.style('border-color', 'black');
  decThicknessBtn.style('border-style', 'solid');
  decThicknessBtn.style('border-width', '10px');
  decThicknessBtn.style('width', btnSize);
  decThicknessBtn.style('height', btnSize);

  resetThicknessBtn = createButton(' ');
  resetThicknessBtn.parent('wbPanel');
  resetThicknessBtn.position(0.16*width, btnY);
  resetThicknessBtn.mousePressed(resetThickness);
  resetThicknessBtn.style('background-color', 'white');
  resetThicknessBtn.style('border-color', 'black');
  resetThicknessBtn.style('border-style', 'double');
  resetThicknessBtn.style('border-width', '10px');
  resetThicknessBtn.style('width', btnSize);
  resetThicknessBtn.style('height', btnSize);
  
  // We make a named event called 'drawing' and write an
  // anonymous callback function
  socket.on('drawing',
    
    // When we receive data
    function(data) {
      //console.log("Got: " + data.x + " " + data.y);
      
      var colorEmit = color(data.r, data.g, data.b);
      stroke(colorEmit);
      fill(colorEmit);
      strokeWeight(data.s);
      line(data.x, data.y, data.px, data.py);
    }
  );

};
function draw(){
//text("yes", width - (0.3*width), 400);
}
 
function mouseDragged() {
  r0 = rSlider.value();
  g0 = gSlider.value();
  b0 = bSlider.value();
  
  incThicknessBtn.style('background-color', color(r0, g0, b0));
  decThicknessBtn.style('border-color', color(r0, g0, b0));
  resetThicknessBtn.style('border-color', color(r0, g0, b0));
  sliderValue = color(r0, g0, b0);
  stroke(sliderValue);
  fill(sliderValue);
  strokeWeight(strokeW);
  line(mouseX, mouseY, pmouseX, pmouseY);
  sendmouse(mouseX, mouseY, pmouseX, pmouseY, r0, g0, b0, strokeW);
}
function mouseReleased(){
 
}

function incThickness(){
    strokeW = strokeW + 2;
}

function decThickness(){
    if(strokeW <= 2){
       strokeW++;
    }
    strokeW--;
}

function resetThickness(){
    strokeW = 2;
}

function sendmouse(xpos, ypos, pxpos, pypos, currentR, currentG, currentB, currentStrweight) {
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos,
    px: pxpos,
    py: pypos,
    r: currentR,
    g: currentG,
    b: currentB,
    s: currentStrweight
  };

  // Send that object to the socket
  socket.emit('drawing' ,data);
}

function eraseSwitch(){
  var state = 0;  
  if(state === 0){
     
     state = 1;
  }
  else{

     state = 0;
  }

}



