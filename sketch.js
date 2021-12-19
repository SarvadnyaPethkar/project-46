var PLAY = 1;
var END = 0;
var gameState = 1;

var space,spaceImg,spaceSound;
var rocket,rocketImg;
var obstacle1,obstacle2,obstacle3,obstacle4;
var asteroidsGroup;
var asteroid1,asteroid2;
var bulletImg,bullet;
var gameoverImg,restartImg,gameoverSound;

function preload(){
  spaceImg = loadImage("space.png");
  rocketImg = loadImage("rocket.png");
  spaceSound = loadSound("spacesound.mp3");
  asteroid1 = loadImage("asteroid1.png");
  asteroid2 = loadImage("asteroid2.png");
  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("restart button.png");
  bulletImg = loadImage("bullet.png");
  gameoverSound = loadSound("gameoverSound.mp3");

}

function setup() {
  createCanvas(1366,656);

  space = createSprite(640,330);
  space.velocityY = 3;
  space.addImage(spaceImg);
  space.scale = 3;

  rocket = createSprite(700,530);
  rocket.addImage(rocketImg);
  rocket.scale = 0.4;

  restart = createSprite(670,200,40,40);
  restart.addImage(restartImg);
  restart.scale = 0.3;

  gameover = createSprite(670,100,40,40);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.3;

  rocket.setCollider("rectangle",0,0,rocket.width,rocket.height);
  rocket.debug = true;

  asteroidsGroup = new Group();

}

function draw() {

  if(gameState===PLAY){

    
    gameover.visible = false;
    restart.visible = false;

  spawnAsteroids();

  if(space.y>400){
    space.y = 300;
    spaceSound.play();
  }

  rocket.x = World.mouseX;

  if(asteroidsGroup.isTouching(rocket)){
    gameState = END;
    gameoverSound.play();

  }

  if(gameState === END){

    gameover.visible = true;
    restart.visible = true;

    space.velocityY = 0;
    asteroidsGroup.velocityY = 0;

    asteroidsGroup.setLifetimeEach(-1);
    asteroidsGroup.setVelocityYEach(0);

  }
}
  
  drawSprites();
}

function spawnAsteroids(){
  if(World.frameCount % 140 === 0){
    var asteroid = createSprite(700,100,40,10);
    asteroid.velocityY = 3;
    var rand = Math.round(random(1,3));

    switch(rand){
      case 1 : asteroid.addImage(asteroid1);
                break;
      case 2 : asteroid.addImage(asteroid2);
                break;

      default : break;
    }
    asteroid.scale = 0.4;
    asteroidsGroup.add(asteroid);

  }
}


