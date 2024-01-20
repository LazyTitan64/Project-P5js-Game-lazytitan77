let pressStart2P; /*Setting up our font as a variable*/

function preload() {
  pressStart2P = loadFont("PressStart2P-Regular.ttf"); /*loads in our font*/
  dinoright = loadImage("hddino.png") /*loads in the right dino image*/
  dinoleft = loadImage("hddino-left.png") /*loads in the left dino image*/
  food = loadImage("food.png") /*loads in the food image*/
  desert = loadImage("desert.jpg") /*loads in the desert image*/
  dino = dinoright /*makes the dino start facing right*/
  chomp = new Audio('chomp.mp3') /*setting up the chomp sound as a variable*/
  ouch = new Audio('ouch.mp3') /*setting up the ouch sound as a variable*/
  roar = new Audio('roar.mp3') /*setting up the roar sound as a variable*/
  burp = new Audio('burp.mp3') /*setting up the burp sound as a 
  variable*/
  ding = new Audio('ding.mp3') /*setting up the ding sound as a 
  variable*/
}

function setup() {
  createCanvas(windowWidth, windowHeight); /*creating the canvas*/
  frameRate(60) /*picking the framerate*/
  imageMode(CENTER) /*adjusting the image mode*/
  score = 0 /*making the score start at 0*/
  dinoSpeed = 3 /*making the speed of the dino start at 3*/
  y = height/2 /*setting the y value of the dino to the middle of the screen*/
  x = width/2 /*setting the x value of the dino to the middle of the screen*/
  foodY = (y + random(windowHeight)) /*randomly move the food away from the dino*/
  foodX = (x + random(windowWidth)) /*randomly move the food away from the dino*/
  dinoSize = 175 /*setting the size of the dino*/
  foodSize = 100 /*setting the size of the food*/
}

function draw() { 
  image(desert, 0, 0, width*2, height*2) /*setting the background*/
  if(keyIsDown(UP_ARROW)) /*checks if you are pressing up*/ 
    y = y - dinoSpeed /*makes the dino move up with dinospeed*/
  if(keyIsDown(DOWN_ARROW)) /*checks if you are pressing down*/ 
    y = y + dinoSpeed /*makes the dino move down with dinospeed*/
  if(keyIsDown(RIGHT_ARROW)) /*checks if you are pressing right*/  
  { 
    x = x + dinoSpeed /*makes the dino move right with dinospeed*/
    dino=dinoright /*makes the dino face right*/
  }
  if(keyIsDown(LEFT_ARROW)) /*checks if you are pressing left*/ 
  {
    x = x - dinoSpeed /*makes the dino move left with dinospeed*/
    dino=dinoleft /*makes the dino face left*/
  }
  if (keyIsDown(32)) /*checks if you are pressing space*/
     roar.play() /*plays roar sound !LOUD! */

  if (mouseIsPressed) /*checks if you are clicking the mouse*/
   burp.play() /*plays burp sound*/

  if (x<0) x = x + windowWidth /*makes the dino enter from the right of the screen if it is exiting from the left of the screen*/
  if (x>windowWidth) x = x - windowWidth /*makes the dino enter from the left of the screen if it is exiting from the right of the screen*/
  if (y<0) y = y + windowHeight /*makes the dino enter from the bottom of the screen if it is exiting from the top of the screen*/
  if (y>windowHeight) y = y - windowHeight /*makes the dino enter from the top of the screen if it is exiting from the left of the screen*/

  image(dino, x, y, dinoSize*2, dinoSize, ) /*drawing the dino*/
/*checks if the dino (x,y) coordinates are within the food area (food is a square with center foodX, foodY, and side size foodSize)*/
  if (foodX - foodSize/2 <= x && 
    foodX + foodSize/2 >= x &&
    foodY - foodSize/2 <= y &&
    foodY + foodSize/2 >= y) { /*now the food has been eaten*/
    score = score + 1 /*increase the score by one*/
    dinoSize = dinoSize + 2 /*make the dino bigger*/
    dinoSpeed = dinoSpeed + 1 /*make the dino faster*/
    chomp.play()/*play chomp sound*/
    ouch.play() /*play ouch sound*/
    /*moves the food somewhere else*/
    foodX = (foodX + random(windowWidth) - windowWidth/2)
    foodY = (foodY + random(windowHeight) - windowHeight/2) }

  /*checks if the food (foodX,foodY) coordinates are within the dino area (dino is a rectangle with center x, y, and side size of dinoSize*2 and dinoSize)*/
 else if (x - dinoSize/2 <= foodX && 
    x + dinoSize/2 >= foodX &&
    y - dinoSize/2 <= foodY &&
    y + dinoSize/2 >= foodY) { /*now the food has been eaten*/
   score = score + 1 /*increase the score by one*/
   dinoSize = dinoSize + 2 /*make the dino bigger*/
   dinoSpeed = dinoSpeed + 1 /*make the dino faster*/
   chomp.play() /*play chomp sound*/
   ouch.play() /*play ouch sound*/
   /*moves the food somewhere else*/
   foodX = (foodX + random(windowWidth) - windowWidth/2)
   foodY = (foodY + random(windowHeight) - windowHeight/2) }

  fill(255, 0, 0)
  /* checks if  food random location is inside the screen and adjust accordingly*/
  if (foodX<0) foodX = foodX + windowWidth /* if food is past the left edge of the screen, move back towards the right*/
  if (foodX>windowWidth) foodX = foodX - windowWidth /* if food is past the right edge of the screen, move back towards the left*/
  if (foodY<0) foodY = foodY + windowHeight /* if food is past the top edge of the screen, move back towards the bottom*/
  if (foodY>windowHeight) foodY = foodY - windowHeight /* if food is past the bottom edge of the screen, move back towards the top*/
  
  image(food, foodX, foodY, foodSize, foodSize) /* draws the food*/
  fill(255, 255, 255) /*making the score white*/
  if (score > 49) /*checks if the score is bigger than 49*/
    fill(205, 127, 50) /*makes the score display bronze*/
  if (score > 149) /*checks if the score is bigger than 149*/
    fill(192, 192, 192) /*makes the score display silver*/
  if (score > 299) /*checks if the score is bigger than 299*/
     fill(255, 215, 0)	/*makes the score display gold*/
  if (score > 999) /*checks if the score is bigger than 999*/
      fill(0,255,255) /*makes the score display diamond*/  
  textFont(pressStart2P, 25) /*font and size of the score*/
  text("Score:" + score, width/2 - 75, height/12) /*writing the score on the top of the screen*/
  textFont(pressStart2P, 10) /*font and size of the watermark*/
  fill(255, 255, 255) /*makes the watermark white*/
  text ("Yusef.S", 0 + 3, windowHeight - 10 ) /*my watermark*/
   if (mouseX >= 0 + 3 && mouseX <= 90 && mouseY >= windowHeight - 10 && mouseY <= windowHeight) /*checks if the mouse is within the watermark*/
     ding.play() /*plays the ding sound*/
}