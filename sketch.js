var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
var box1, box2, box3;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
	packageSprite.velocityY = 3

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
  	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	//ground = new Box(width/2, height-35, width,10);
	box1 = new Box(350, 650, 200, 20);
	box2 = new Box(250, 570, 20, 200);
	box3 = new Box(450, 570, 20, 200);

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);


	 var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 700,
            showAngleIndicator: true
        }
    });

	Render.run(render);
	
	Engine.run(engine);
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  
  box1.display();
  box2.display();
  box3.display();
  //ground.display();
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW){
 	Matter.Body.setStatic(packageBody, false);
  }

  else if(keyCode === LEFT_ARROW){
	helicopterSprite.x = helicopterSprite.x - 20;
	Matter.Body.translate(packageBody, {x:-20, y:0})
}

else if(keyCode === RIGHT_ARROW){
  helicopterSprite.x = helicopterSprite.x + 20;
  Matter.Body.translate(packageBody, {x:20, y:0})
}
}



