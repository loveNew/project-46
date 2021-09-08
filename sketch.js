var player,playerImg,enemy,enemyImg,bullet,bulletImg;
var gameState = "serve";
var edges;
var invi;
var bulletGroup,enemyGroup;

function preload(){
  playerImg = loadImage("player.png");
  enemyImg = loadImage("enemy.png");
  bulletImg = loadImage("bullet.png");
}

function setup() {
  createCanvas(1350,600);

  player = createSprite(170, 300, 50, 50);
  player.addImage(playerImg);
  player.scale = 1.5;

 invi  = createSprite(300,height/2,10000,10);
 invi.visible = false;

  bulletGroup = new Group();
  enemyGroup = new Group();

  edges = createEdgeSprites();
}

function draw() {
background("black");

if(gameState === "serve"){
  //console.log("serve");
  textSize(50);
  fill("yellow");
  text("Press arrow keys to move",width/3,height/2);
  text("Press 'SPACE' to shoot",width/3,height-400);
  text("Press 'p' to start game",width/3,height-200);
}

if(gameState === "play"){
 player.x = width/2;
 player.y = 500;
 gameState = "game";
}

if(gameState === "game"){
  player.collide(invi);
   spawnEnemy();
}

if(keyDown("p")){gameState = "play"};
if(keyDown("s")){gameState = "serve"};
if(keyDown("e")){gameState = "game"};
if(keyDown(UP_ARROW)){player.y = player.y-5;}
if(keyDown(DOWN_ARROW)){player.y = player.y+5;}
if(keyDown(LEFT_ARROW)){player.x = player.x-10;}
if(keyDown(RIGHT_ARROW)){player.x = player.x+10;}

if(keyWentDown("space")){
  shootBullets();
}

if(keyWentUp("space")){}

if(enemyGroup.isTouching(bulletGroup)){
  for(var i = 0; i<enemyGroup.length; i++){
  if(enemyGroup[i].isTouching(bulletGroup)){
  enemyGroup[i].destroy();
  bulletGroup.destroyEach();
 }
}
}

 player.collide(edges);
 drawSprites();
}

function spawnEnemy(){
  if(frameCount % 50 === 0){
  enemy = createSprite(random(150,1200),100,50,50);
  enemy.addImage(enemyImg);
  enemyGroup.add(enemy);
  }
}

function shootBullets(){
  bullet = createSprite(player.x,player.y,50,50);
  bullet.addImage(bulletImg);
  bullet.scale = 0.7;
  bullet.velocityY= -10;
  bullet.lifetime = 100;
  bulletGroup.add(bullet);
}
