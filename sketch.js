var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;
var wall1, wall2;
var road;
var a1, a2;
function preload() {
  path = loadImage("Images/road.png");
  v1 = loadImage("Images/3.png");
  spawn1 = loadImage("Images/1.png");
  spawn2 = loadImage("Images/4.png");
  coin = loadImage("Images/2.png");
  bgMusic = loadSound("song/bgmusic.mp3");
  r = loadImage("Images/restart.png")
  horn = loadSound("song/pp.mp3")
}

function setup() {
  createCanvas(1536, 745)
  bgMusic.loop();
  bot1 = new Group();
  bot2 = new Group();
  bot3 = new Group();

  road = createSprite(850, 370, 50, 50);
  road.addImage(path);

  car1 = createSprite(200, 370);
  car1.addImage(v1);
  car1.scale = 0.4

  wall1 = createSprite(800, 50, 2000, 100)
  wall1.visible = 0;
  wall2 = createSprite(800, 690, 2000, 110)
  wall2.visible = 0;

  restart = createSprite(750, 870);
  restart.addImage(r);
  restart.scale = 0.5;
  restart.visible = 0
}

function draw() {
  background(0)
  drawSprites();
  textSize(40);
  fill("black");
  stroke(4)
  text("METRES YOU DROVE =  " + distance, 500, 30);
  road.velocityX = -(6 + 4 * distance / 150);


  if (gameState === PLAY) {
    if (road.x < 0) {
      road.x = width / 1;
    }
    distance = distance + Math.round(getFrameRate() / 50);

    car1.collide(wall1)
    car1.collide(wall2)
    road.velocityX = -60;
    if (keyDown("UP")) {
      road.velocityX = -80
    }
    if (keyDown("LEFT")) {
      car1.y = car1.y - 30
    }
    if (keyDown("RIGHT")) {
      car1.y = car1.y + 30
    }
    if (keyDown("space")) {
      horn.play()
    }
    if (frameCount % 400 == 0) {
      c1();
    }
    if (frameCount % 200 == 0) {
      c2();
    }
    if (frameCount % 800 == 0) {
      c3();
    }
    bot1.collide(bot2)
    bot3.collide(bot2)
    if (car1.isTouching(bot1)) {
      gameState = END
    }
    if (car1.isTouching(bot2)) {
      gameState = END
    }
    if (car1.isTouching(bot3)) {
      gameState = END
    }

  } else if (gameState === END) {
    road.velocityX = 0;
    // making gameover
    restart.visible = 1;
    restart.y = 370;
    bot1.setVelocityXEach(0);

    bot2.setVelocityXEach(0);

    bot3.setVelocityXEach(0);
    text("GameOver",650, 300)
    if (mousePressedOver(restart)) {
      reset()
    }
  }

}
function c1() {
  a1 = createSprite(1800, random(50, 650))
  a1.addImage(spawn1);
  a1.scale = 0.6
  a1.velocityX = road.velocityX
  a1.collide(wall1)
  a1.collide(wall2)
  a1.lifetime = 400
  bot1.add(a1)
}

function c2() {
  a2 = createSprite(1800, random(50, 650))
  a2.addImage(spawn2);
  a2.scale = 0.5
  a2.velocityX = road.velocityX - 20
  a2.collide(wall2)
  a2.collide(wall1)
  a2.lifetime = 400
  bot2.add(a2);
}

function c3() {
  a3 = createSprite(1800, random(50, 650))
  a3.addImage(coin);
  a3.scale = 0.5
  a3.velocityX = road.velocityX - 10
  a3.collide(wall2)
  a3.collide(wall1)
  a3.lifetime = 400
  bot3.add(a3);

}



function reset() {
  gameState = PLAY;
  restart.visible = 0;

  bot1.destroyEach();
  bot2.destroyEach();
  bot3.destroyEach();

  distance = 0

}
