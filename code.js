var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["038ca930-fd9e-4431-9a8e-fe8d57d862d5","34b5b6d1-bdb2-4d5a-9538-84d37ab0d8a1","a653a5ca-3c59-4608-b811-d2bfb8022251","7bc7e88f-bd81-487c-bc24-c89424a1663b","1933ccf5-cd4a-4c8a-80db-f0f4d241e445"],"propsByKey":{"038ca930-fd9e-4431-9a8e-fe8d57d862d5":{"name":"track.png_1","sourceUrl":"assets/v3/animations/djxPwmH54hJs_m9g0lpSzDxb4l5mmpWPOCpOkRDpVKY/038ca930-fd9e-4431-9a8e-fe8d57d862d5.png","frameSize":{"x":840,"y":650},"frameCount":1,"looping":true,"frameDelay":4,"version":"K1khFx8jHPcjEKwxhoEFTotlgjX.YF6G","loadedFromSource":true,"saved":true,"sourceSize":{"x":840,"y":650},"rootRelativePath":"assets/v3/animations/djxPwmH54hJs_m9g0lpSzDxb4l5mmpWPOCpOkRDpVKY/038ca930-fd9e-4431-9a8e-fe8d57d862d5.png"},"34b5b6d1-bdb2-4d5a-9538-84d37ab0d8a1":{"name":"car_2","sourceUrl":null,"frameSize":{"x":71,"y":131},"frameCount":1,"looping":true,"frameDelay":12,"version":"q7X2yNAKHE46vIYmDhNigmbpGTbCAMl3","loadedFromSource":true,"saved":true,"sourceSize":{"x":71,"y":131},"rootRelativePath":"assets/34b5b6d1-bdb2-4d5a-9538-84d37ab0d8a1.png"},"a653a5ca-3c59-4608-b811-d2bfb8022251":{"name":"car_1","sourceUrl":"assets/api/v1/animation-library/gamelab/VQVcPPVDiCQHlt5CRB39RSaGVNF.wbwE/category_vehicles/car_yellow.png","frameSize":{"x":71,"y":131},"frameCount":1,"looping":true,"frameDelay":2,"version":"VQVcPPVDiCQHlt5CRB39RSaGVNF.wbwE","loadedFromSource":true,"saved":true,"sourceSize":{"x":71,"y":131},"rootRelativePath":"assets/api/v1/animation-library/gamelab/VQVcPPVDiCQHlt5CRB39RSaGVNF.wbwE/category_vehicles/car_yellow.png"},"7bc7e88f-bd81-487c-bc24-c89424a1663b":{"name":"car_red_1","sourceUrl":"assets/api/v1/animation-library/gamelab/ze0WFRpZvG_jajMO9A6QwtUgkZ0LwkVZ/category_vehicles/car_red.png","frameSize":{"x":71,"y":131},"frameCount":1,"looping":true,"frameDelay":2,"version":"ze0WFRpZvG_jajMO9A6QwtUgkZ0LwkVZ","loadedFromSource":true,"saved":true,"sourceSize":{"x":71,"y":131},"rootRelativePath":"assets/api/v1/animation-library/gamelab/ze0WFRpZvG_jajMO9A6QwtUgkZ0LwkVZ/category_vehicles/car_red.png"},"1933ccf5-cd4a-4c8a-80db-f0f4d241e445":{"name":"car_3","sourceUrl":"assets/api/v1/animation-library/gamelab/B4vUokh1GW_vLrNnzDIs_OLlxHj3Wmpf/category_vehicles/car_blue.png","frameSize":{"x":71,"y":131},"frameCount":1,"looping":true,"frameDelay":2,"version":"B4vUokh1GW_vLrNnzDIs_OLlxHj3Wmpf","loadedFromSource":true,"saved":true,"sourceSize":{"x":71,"y":131},"rootRelativePath":"assets/api/v1/animation-library/gamelab/B4vUokh1GW_vLrNnzDIs_OLlxHj3Wmpf/category_vehicles/car_blue.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var scrn = createSprite(200, 200);
scrn.setAnimation("track.png_1"); 
scrn.velocityY = 5;

var Car = createSprite(200, 390, 20, 20);
Car.setAnimation("car_red_1");
Car.scale = 0.5;

var BadGrp = createGroup();

var play = 1;
var end = 0;
var gameState = end;


var distance = 0;

function draw() {
  background("white");
  createEdgeSprites();
  
  Car.collide(edges);
  
  if (scrn.y > 325){
      scrn.y = 200;
      scrn.velocityY = 5;
      
    }
    
  if(keyWentDown("space")){
    gameState = play;
    distance = 0;
  }
  if(gameState === end){
    fill("red");
    textSize(20);
    text("Press space to start", 110, 200);
    fill("green");
    text("Use the mouse to move the red car and", 10, 250);
    text("          avoid the other cars", 50, 280);
  }
  
  
  if(gameState === play){
  drawSprites();
  
  Car.x = World.mouseX;
  
  Cars();
  fill("blue");
  textSize(20);
   
  text("Your Distance: "+distance, 200, 30);
  
  if(Car.isTouching(BadGrp)){
    gameState = end;
  }
  
  }
}

function Cars(){
  if(World.frameCount%60 === 0){
    distance = distance +20;
    
    var BadCar = createSprite(randomNumber(0, 400), 0, 20, 20);
    BadCar.setAnimation("car_" +randomNumber(1, 3));
    BadCar.scale = 0.4;
    BadCar.velocityY = 5;
    BadGrp.add(BadCar);
  }
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
