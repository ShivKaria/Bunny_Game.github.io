const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope,rope2,rope3
var fruit_con;
var food,rabbit,bg_image
var bunny,button,button2,button3
var blink,eat,sad
var air,eating_sound,sad_sound,cut_sound,bg_sound
var blower
var mute_button

function preload(){
food=loadImage("melon.png")
rabbit=loadImage("Rabbit-01.png")
bg_image=loadImage("background.png")

blink=loadAnimation("blink.png","blink_2.png","blink_3.png")
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
blink.playing=true
eat.playing=true
eat.looping=false
sad.playing=true
sad.looping=false

bg_sound=loadSound("sound1.mp3")
sad_sound=loadSound("sad.wav")
cut_sound=loadSound("rope_cut.mp3")
eating_sound=loadSound("eating_sound.mp3")
air=loadSound("air.wav")
}

function setup() 
{
  createCanvas(500,700);

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  frameRate(80);

//bg_sound.play()
//bg_sound.setVolume(0.5)

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canH,600,20);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  bunny = createSprite(170,canH-80,100,100);
  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("crying",sad)
  bunny.changeAnimation("blinking")
  bunny.scale=0.2

  blower=createImg('balloon.png')
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(airballoon)

  mute_button=createImg('mute.png')
  mute_button.position(450,20)
  mute_button.size(50,50)
  mute_button.mouseClicked(mute)

button=createImg('cut_button.png')
button.position(20,30)
button.size(50,50)
button.mouseClicked(drop)

button2=createImg('cut_button.png')
button2.position(330,35)
button2.size(60,60)
button2.mouseClicked(drop2)

button3=createImg('cut_button.png')
button3.position(360,200)
button3.size(60,60)
button3.mouseClicked(drop3)

  rectMode(CENTER);
  
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);

  image(bg_image,0,0,displayWidth+800,displayHeight+30)
  push()
  imageMode(CENTER)

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,75,75)
  }
  pop()
  
  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  drawSprites()
  ground.show();
  if(Collide(fruit,bunny)==true)
  {
    bunny.changeAnimation("eating")
    eating_sound.play()
  }

  if(fruit!=null&&fruit.position.y>=650){
    bunny.changeAnimation("crying")
    bg_sound.stop()
    sad_sound.play()
    fruit=null
  }
}

function drop(){
  cut_sound.play()
  rope.break()
  fruit_con.detach()
  fruit_con=null
}

function drop2(){
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
}

function drop3(){
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
}

function Collide(body,sprite){
if (body!=null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(d<=80){
    World.remove(engine.world,fruit)
    fruit=null
    return true
  }
  else{
    return false
  }
}
}

function airballoon(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play()
}

function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else{
    bg_sound.play()
  }
}
