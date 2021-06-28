var player,ground,titleImg;
var imageTitle;
var playButton;

var START=0;
var PLAY=1;
var END=2;

var gameState=START;

var menu;
var breadEaten=0;

var breadG,poisonG,vegsG,fruitG,meatG,donutG;

function preload(){
    titleImg=loadImage("title.png");
}

function setup(){
    createCanvas(displayWidth,displayHeight-150)
    player=createSprite(200,displayHeight-300,40,50);
    player.shapeColor="red";

    ground=createSprite(0,displayHeight-210,displayWidth*5,140);
    ground.velocityX=-20;
    playButton=createSprite((displayWidth/2)-5,(displayHeight/2)+20);

    menu=new Menu();

    breadG=new Group();
    poisonG=new Group();
    vegsG=new Group();
    fruitG=new Group();
    meatG=new Group();
    donutG=new Group();
}

function draw(){
    background(0,190,235);

    if(gameState===START){
        menu.display();

        playButton.shapeColor="blue";

        player.visible=false;
        ground.visible=false;

        if(mousePressedOver(playButton)){
            gameState=PLAY;
        }
        
    }
    
    if(gameState===PLAY){
        
        if(keyDown("SPACE")&&player.y>displayHeight-315){
            player.velocityY=-30;
        }

        if(keyDown(LEFT_ARROW)&&player.x>15){
            player.x=player.x-10;
        }

        if(keyDown(RIGHT_ARROW)&&player.x<displayWidth-15){
            player.x=player.x+10;
        }

        //gravity code

        fill("black");
        textSize(20);
        strokeWeight(1);
        stroke("black");
        text("Bread Eaten: "+breadEaten,80,100);

        imageTitle.visible=false;
        playButton.visible=false;

        player.visible=true;
        ground.visible=true;

        player.velocityY=player.velocityY+2;

        player.collide(ground);

        if(ground.x<700){
            ground.x=ground.width/2;
        }

        spawnPoison();
        spawnBread();
        spawnVegs();

        if(breadG.isTouching(player)){
            breadEaten++;
            breadG[0].destroy();
        }

        if(breadEaten>30){
            gameState=END;
        }

    }

    if(gameState===END){
        poisonG.destroyEach();
        breadG.destroyEach();
        vegsG.destroyEach();
        ground.destroy();
        player.destroy();
        
        textSize(30);
        fill("red");
        strokeWeight(1);
        stroke("red");
        text("GAME OVER",(displayWidth/2)-10,displayHeight/2);
        textSize(20);
        fill("black");
        text("You need to eat a balanced diet to stay healthy!",(displayWidth/2)-40,displayHeight/2+20);
    }

    drawSprites();

}

function spawnPoison(){
    if(frameCount%120===0){
        poison=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        poison.velocityX=-20;
        poison.scale=0.4;
        poison.shapeColor="green";
        poisonG.add(poison);
        poison.lifetime=120;
    }
}


function spawnBread(){
    if(frameCount%60===0){
        bread=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        bread.velocityX=-15;
        bread.scale=0.4;
        bread.shapeColor="yellow";
        breadG.add(bread);
        bread.lifetime=120;
    }
}

function spawnVegs(){
    if(frameCount%300===0){
        vegs=createSprite(displayWidth,Math.round(random(displayHeight-500,displayHeight-300)));
        vegs.velocityX=-10;
        vegs.scale=0.4;
        vegs.shapeColor="lightgreen";
        vegsG.add(vegs);
        vegs.lifetime=200;
    }
}