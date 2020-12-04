var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
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

//creating wall sprites
var wall1 = createSprite(190, 120, 250, 3);
var wall2 = createSprite(190, 280, 250, 3);
var wall3 = createSprite(67, 145, 3, 50);
var wall4 = createSprite(67, 255, 3, 50);
var wall5 = createSprite(313, 145, 3, 50);
var wall6 = createSprite(313, 255, 3, 50);
var wall7 = createSprite(336, 170, 50, 3);
var wall8 = createSprite(336, 230, 50, 3);
var wall9 = createSprite(360, 200, 3, 60);
var wall10 = createSprite(43, 170, 50, 3);
var wall11 = createSprite(43, 230, 50, 3);
var wall12 = createSprite(17, 200, 3, 60);

//creating the moving sprite
var ding = createSprite(50, 200, 15, 15);
ding.shapeColor = ("green");

//creating the lazers
var dong1 = createSprite(115, 140, 15, 15);
dong1.shapeColor = ("red");
var dong2 = createSprite(170, 260, 15, 15);
dong2.shapeColor = ("red");
var dong3 = createSprite(225, 140, 15, 15);
dong3.shapeColor = ("red");
var dong4 = createSprite(280, 260, 15, 15);
dong4.shapeColor = ("red");

var count = 0;

//giving the lazers velocity
dong1.velocityY = 15;
dong2.velocityY = -15;
dong3.velocityY = 15;
dong4.velocityY = -15;



function draw() {
  background("white")
  
  //making the lazers bounce off walls 
  dong1.bounceOff(wall1);
  dong1.bounceOff(wall2);
  dong2.bounceOff(wall1);
  dong2.bounceOff(wall2);
  dong3.bounceOff(wall1);
  dong3.bounceOff(wall2);
  dong4.bounceOff(wall1);
  dong4.bounceOff(wall2);
  
  ding.bounceOff(wall12);
  
  //making the ding move foraward and backward
  if (keyDown(LEFT_ARROW)) {
    ding.x = ding.x - 2 ;
  }
  if (keyDown(RIGHT_ARROW)) {
    ding.x = ding.x + 2 ;
  }
  
  //showing number of deaths 
  textSize(20);
  text("Death:" + count, 250, 100);
  
  //ding goes back if it touches a lazer
  if (ding.isTouching(dong1) || 
      ding.isTouching(dong2) || 
      ding.isTouching(dong3) || 
      ding.isTouching(dong4)) {
    ding.x = 50;
    ding.y = 200;
    count = count + 1 ; 
  }
    
  drawSprites();
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
