var PLAY = 1;
var END = 0;
var gameState = PLAY;

var kangaroo, kangaroo_jumping, kangaroo_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var wallsGroup, wall1, wall2, wall3, wall4, wall5, wall6;

var score=0;

var gameOver, restart;

function preload(){
  kangroo_jumping =   loadAnimation("kangaroo.png","kangaroo_collided.png");
  kangaroo_collided = loadAnimation("kangaroo_collided.png");
 
  groundImage = loadImage("ground.png");
 
  cloudImage = loadImage("cloud.png");

  wall1 = loadImage("wall1.png");
  wall2 = loadImage("wall2.png");
  wall3 = loadImage("wall3.png");
  wall4 = loadImage("wall4.png");
  wall5 = loadImage("wall5.png");
  wall6 = loadImage("wall6.png");


  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  kangaroo = createSprite(50,180,20,50);

  kangaroo.addAnimation("jumping", kangaroo_jumping);
  kangaroo.addAnimation("collided",kangaroo_collided);
  kangaroo.scale = 0.5;
 
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
 
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
 
  restart = createSprite(300,140);
  restart.addImage(restartImg);
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  cloudsGroup = new Group();
  wallsGroup = new Group();
 
  score = 0;
}

function draw() {
  //kangaroo.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
if (gameState===PLAY){
     score = score + Math.round(getFrameRate()/60); 
     ground.velocityX = -(6 + 3*score/100);
    
    if(keyDown("space") && kangaroo.y >= 159) {
     kangaroo.velocityY = -12;
    }

     kangaroo.velocityY = kangaroo.velocityY + 0.8

    if (ground.x < 0){
       ground.x = ground.width/2;
    }

    kangaroo.collide(invisibleGround);
     spawnClouds();
     spawnwalls();

    if(wallsGroup.isTouching(kangaroo)){
         gameState = END;
    }
  }
    else if (gameState === END) {
     gameOver.visible = true;
     restart.visible = true;

    //set velcity of each game object to 0
    ground.velocityX = 0;
    kangaroo.velocityY = 0;
    wallsGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
 
    //change the kangaroo animation
    kangaroo.changeAnimation("collided",kangaroo_collided);

    //set lifetime of the game objects so that they are never destroyed
    wallsGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
 
    if(mousePressedOver(restart)) {
     reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

     //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = kangaroo.depth;
    kangaroo.depth = kangaroo.depth + 1;
 
    //add each cloud to the group
     cloudsGroup.add(cloud);
   }
}

function spawnwalls() {
    if(frameCount % 60 === 0) {
        var wall = createSprite(600,165,10,40);
        //obstacle.debug = true;
        wall.velocityX = -(6 + 3*score/100);
     
        //generate random walls
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: wall1.addImage(wall1);
                  break;
          case 2: wall2.addImage(wall2);
                  break;
          case 3: wall3.addImage(wall3);
                  break;
          case 4: wall4.addImage(wall4);
                  break;
          case 5: wall5.addImage(wall5);
                 break;
          case 6: wall6.addImage(wall6);
                 break;
        default: break;
      }
     
      //assign scale and lifetime to the wall          
      walls.scale = 0.5;
      walls.lifetime = 300;
      //add each wall to the group
      wallsGroup.add(walls);
      }
    }
    
function reset(){
     gameState = PLAY;
     gameOver.visible = false;
     restart.visible = false;
     
     wallsGroup.destroyEach();
     cloudsGroup.destroyEach();
     
     kangaroo.changeAnimation("running",kangaroo_running);
     
    
     
     score = 0;
}