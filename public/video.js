function setup() {
  var canvas1 = createCanvas(480, 120);
  canvas1.parent('vcPanel');
  //capture.parent('vcPanel');
  var constraints = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      },
      optional: [{ maxFrameRate: 10 }]
    },
    audio: true
  };
  createCapture(constraints, function(stream) {
    console.log(stream);
  });
}




