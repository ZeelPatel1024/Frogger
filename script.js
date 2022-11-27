/*
This template is just to get you started.  Feel free to change the screen any way you want.  This includes
using your own pictures.  There are many functions listed in this project.  Many of these are optional and just
meant to help you think about your project.  Refer to the project document to get a full picture of what you need
to do at any given level.
 */
var car1 = new Image();
car1.src = "resources/car1.png"; //need this to simply load the image into the browsers memory
var car2 = new Image();
car2.src = "resources/car2.png";
var car3 = new Image();
car3.src = "resources/car3.png";
var car4 = new Image();
car4.src = "resources/car4.png";

var log1 = new Image();
log1.src = "resources/log.png";
var log2 = new Image();
log2.src = "resources/log2.png";

var frog = new Image();
frog.src = "resources/frog.png";

var snake = new Image();
snake.src = "resources/snake.png";

var snake2 = new Image();
snake2.src = "resources/snake.png";

var heart = new Image();
heart.src = "resources/heart.png";

var lilypad = new Image();
lilypad.src = "resources/lilypad.png";

var star = new Image();
star.src = "resources/star.png";

var frogSpot1 = new Image();
frogSpot1.src = "resources/frog.png";

var frogSpot2 = new Image();
frogSpot2.src = "resources/frog.png";

var frogSpot3 = new Image();
frogSpot3.src = "resources/frog.png";

var frogSpot4 = new Image();
frogSpot4.src = "resources/frog.png";

var frogSpot5 = new Image();
frogSpot5.src = "resources/frog.png";

//the rectangles in the home spots
var rect1;
var rect2;
var rect3;
var rect4;
var rect5;

//Make all of your arrays and instance field here
var a;
//array that stores the cars
var carsArray = [];
//array that holds the hearts for the life
var heartsArray = [];
//array that holds the diffrent logs
var logsArray = [];
//array that holds the lilly pads
var lilyPadsArray = [];
//score allows the player to know how many times they have crossed the "finish line"
var score = 0;
//this is for when the frog hits a star and once this is 300 the frog gets 1 point added to the score.
var bonusPoints = 0;
//this is related to the hearts to know how many lifes there are corresponds with how many hearts are visible
var health = 3;
//variable for the levels, 3 in total
var level = 1;
//signals whether or not the game is over
var gameOver = false;
//signals whether or not you won the game
var winGame = false;
//varibale to check if the frog collides with the water
var collWater = false;
//variable to check if the frog collides with the logs
var collLog = false;
//random number to check the boundires of the first snake
var detSnakeMov;
//random number to check the boundires of the second snake
var detSnakeMov2;
//variable that stores the highscore
var highScore = 0;
//175 y top max; 750 y low; 0 x is left to 650 right max
//random number for the stars X coordinets
var starXCor;
//random number for the starts Y coordinets
var starYCor;

// var randSanMov = getRandomInt(-1,-5);
//variable to check if the frog collides with the spots.
var touchSpots = false;
// var move1 = getRandomInt(-5,0);
// var move2 = getRandomInt(0,5);

//draws game board
function drawBackground() {
    //draws the grass
    drawGrass();
    //draws the water
    drawWater();
    //draws the road
    drawRoad();
    //draws the home spots
    drawHome();
    //draws the text at the top of the canvas
    drawText();
}
//draws the grass
function drawGrass() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#13691d";
    ctx.fillRect(0,0,650,850);
}
//draws the road
function drawRoad() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#605f5f";
    ctx.fillRect(0,550,window.innerWidth,250);
    drawDashed();
}
//draws the water
function drawWater() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#a5c5ff";
    ctx.fillRect(0,150,window.innerWidth,350);
}
//draws the home spots
function drawHome() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#3bdb13";
    ctx.fillRect(0,150,window.innerWidth,25);
    ctx.fillRect(0,175,90,80);//
    ctx.fillRect(155,175,35,80);
    ctx.fillRect(255,175,35,80);
    ctx.fillRect(355,175,35,80);//
    ctx.fillRect(455,175,35,80);
    ctx.fillRect(560,175,100,80);
}
//draws the dashed lines in the road
function drawDashed() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.setLineDash([10, 20]);
    ctx.moveTo(0, 750);
    ctx.lineTo(650, 750);
    ctx.moveTo(0, 700);
    ctx.lineTo(650, 700);
    ctx.moveTo(0, 650);
    ctx.lineTo(650, 650);
    ctx.moveTo(0, 600);
    ctx.lineTo(650, 600);
    ctx.stroke();
}
//draws the text
function drawText(){
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle= "#ff00c8";
    ctx.font = "30px Arial";
    //make sures it only draws it while the game is playing
    if (level < 4){
        ctx.fillText("Score: " + score, 50,50);
        ctx.fillText("Health: ", 50,100);
        ctx.fillText("Level: " + level, 400,50);
        ctx.fillText("Points: " + bonusPoints, 400,100);
        ctx.fillText("High Score: " + highScore, 400,140);
    }
}
//draws the text that says game over
function drawGameOverText(){
    var ctx = document.getElementById("canvas").getContext("2d");
    if (gameOver == true){
        drawBackground();
        ctx.fillStyle= "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!!", 200,100);
    }
}
//draws the text that says you win the game
function gameEndWinText(){
    var ctx = document.getElementById("canvas").getContext("2d");
    if (winGame == true){
        ctx.fillStyle= "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("You Win!!!", 200,100);
    }
}


//initialize functions onload
function initialize(){

    //draws the background
    drawBackground();
    var ctx = document.getElementById("canvas").getContext("2d");

    //draw the main character, the frog
    frog = createImage(frog.src,300,800,50,50,50);
    ctx.drawImage(frog,frog.left,frog.top,frog.width,frog.height);

    //draw the star
    star = createImage(star.src,200,600,50,50);
    ctx.drawImage(star,star.left,star.top,star.width,star.height);

    //draw the lilly pads
    lilyPadsArray.push(createImage(lilypad.src,95,185,50,50));
    lilyPadsArray.push(createImage(lilypad.src,195,185,50,50));
    lilyPadsArray.push(createImage(lilypad.src,295,185,50,50));
    lilyPadsArray.push(createImage(lilypad.src,395,185,50,50));
    lilyPadsArray.push(createImage(lilypad.src,495,185,50,50));
    for(i = 0;i<lilyPadsArray.length;i++){
        ctx.drawImage(lilyPadsArray[i],lilyPadsArray[i].left,lilyPadsArray[i].top,lilyPadsArray[i].width,lilyPadsArray[i].height);
    }

    //draws the invisible rectangles
    ctx.fillStyle = "#ffffff00";
    rect1 = createRectangle(90,175,65,75);
    ctx.fillRect(rect1.x,rect1.y,rect1.width,rect1.height);

    rect2 = createRectangle(190,175,65,75);
    ctx.fillRect(rect2.x,rect2.y,rect2.width,rect2.height);

    rect3 = createRectangle(290,175,65,75);
    ctx.fillRect(rect3.x,rect3.y,rect3.width,rect3.height);

    rect4 = createRectangle(390,175,65,75);
    ctx.fillRect(rect4.x,rect4.y,rect4.width,rect4.height);

    rect5 = createRectangle(490,175,70,75);
    ctx.fillRect(rect5.x,rect5.y,rect5.width,rect5.height);

    //draws the frogs at the home spots
    frogSpot1 = createImage(frogSpot1.src,95,185,50,50);
    ctx.drawImage(frogSpot1,frogSpot1.left,frogSpot1.top,frogSpot1.width,frogSpot1.height);
    frogSpot1.vis = false;

    frogSpot2 = createImage(frogSpot2.src,195,185,50,50);
    ctx.drawImage(frogSpot2,frogSpot2.left,frogSpot2.top,frogSpot2.width,frogSpot2.height);
    frogSpot2.vis = false;

    frogSpot3 = createImage(frogSpot3.src,295,185,50,50);
    ctx.drawImage(frogSpot3,frogSpot3.left,frogSpot3.top,frogSpot3.width,frogSpot3.height);
    frogSpot3.vis = false;

    frogSpot4 = createImage(frogSpot4.src,395,185,50,50);
    ctx.drawImage(frogSpot4,frogSpot4.left,frogSpot4.top,frogSpot4.width,frogSpot4.height);
    frogSpot4.vis = false;

    frogSpot5 = createImage(frogSpot5.src,495,185,50,50);
    ctx.drawImage(frogSpot5,frogSpot5.left,frogSpot5.top,frogSpot5.width,frogSpot5.height);
    frogSpot5.vis = false;

    //draws the first snake
    snake = createImage(snake.src,500,500,100,50,-2);
    ctx.drawImage(snake,snake.left,snake.top,snake.width,snake.height);

    //draws the second snake
    snake2 = createImage(snake2.src,100,550,100,50,4);
    ctx.drawImage(snake2,snake2.left,snake2.top,snake2.width,snake2.height);
    snake2.vis = false;


    //draws the hearts
    heartsArray.push(createImage(heart.src,150,65,50,50));
    heartsArray.push(createImage(heart.src,210,65,50,50));
    heartsArray.push(createImage(heart.src,270,65,50,50));
    for(i = 0;i<heartsArray.length;i++){
        ctx.drawImage(heartsArray[i],heartsArray[i].left,heartsArray[i].top,heartsArray[i].width,heartsArray[i].height);
    }

    //draws the cars
    carsArray.push(createImage(car4.src,150, 750,50,50,2));//first row white car
    carsArray.push(createImage(car2.src,350, 750,50,50,2));//first row red car

    carsArray.push(createImage(car3.src,50, 700,50,50,-4));//second row green car
    carsArray.push(createImage(car1.src,250, 700,50,50,-4));//second row purple car
    carsArray.push(createImage(car3.src,450, 700,50,50,-4));//second row purple car for lvl inc, i = 4;


    carsArray.push(createImage(car2.src,150, 650,50,50,3));//third row red car
    carsArray.push(createImage(car4.src,350, 650,50,50,3));//third row white car
    carsArray.push(createImage(car2.src,550, 650,50,50,3));//third row red car for lvl inc, i = 7;

    carsArray.push(createImage(car3.src,250, 600,50,50,-2));//top row green car
    carsArray.push(createImage(car1.src,50, 600,50,50,-2));//top row purple car



    for(i = 0;i<carsArray.length;i++){
        ctx.drawImage(carsArray[i],carsArray[i].left,carsArray[i].top,carsArray[i].width,carsArray[i].height);
        carsArray[4].vis = false;
        carsArray[7].vis = false;
    }



    //draws the logs
        logsArray.push(createImage(log1.src,50,435,75,80,2));//first row y- 435
    logsArray.push(createImage(log2.src,350,450,150,45,2));

    logsArray.push(createImage(log2.src,50,400,150,45,-3));//second row
    logsArray.push(createImage(log2.src,450,400,150,45,-3));

    logsArray.push(createImage(log1.src,10,335,75,80,1));//third row
    logsArray.push(createImage(log1.src,250,335,75,80,1));// i = 5
    logsArray.push(createImage(log1.src,450,335,75,80,1));

    logsArray.push(createImage(log2.src,50,300,150,45,-5));//forth row
    logsArray.push(createImage(log1.src,350,285,75,80,-5));// i = 8;

    logsArray.push(createImage(log1.src,50,235,75,80,1));//fifth row
    logsArray.push(createImage(log2.src,350,250,150,45,1));

    for(i = 0;i<logsArray.length;i++){
        ctx.drawImage(logsArray[i],logsArray[i].left,logsArray[i].top,logsArray[i].width,logsArray[i].height);
    }




    //add functions here that will set up your frog, car array, etc...


}
//You may or may not need this function.  Remember you can add other properties inside the function if you want.
var createRectangle =  function(xCor, yCor, w,h){
    //the words in purple are not special.  You could have typed blahblah and it still works
    //the first line makes a new object.  without it all of the rectangles would act line 1 rectangle
    var temp = new Object();
    temp.x = xCor;
    temp.y = yCor;
    temp.width = w;
    temp.height = h;
    //return is necessary so that when you use your rectangle, the variables you made in this funciton can be used also.
    return temp;
}
//You may or may not need this function.  Remember you can add other properties inside the function if you want.
var createImage = function(src,xco,yco,w,h,m) {
    var img   = new Image();
    img.src   = src;
    img.left = xco;
    img.top = yco;
    img.width = w;
    img.height = h;
    img.movement = m;
    img.vis= true;
    return img;

};


function startGame(){
    //disables the start button so that the player doesn't press start again and has to use the restart
    document.getElementById("start").disabled = true;
    //calls the animate loop that goes 40 frames per second
    animate();


}


/*
this code allows you to use the keyboard.  It is written in Jquery.  Jquery is version of javascript that is downloaded
as a library.  The download line is in the header of the html.  Each of the keycodes below can be found in the
ASCII table.
 */
$(document).keydown(function(event){  //jQuery code to recognize a keydown event
    var keycode = (event.keyCode ? event.keyCode : event.which);

    // if(keycode == 13)
    // {
    //     alert("you pressed the return key");
    // }
    // if(keycode == 27)
    // {
    //     alert("escape key")
    // }
    //a key to go left
    if(keycode == 65)
    {

        frog.left = frog.left - 50;
        // console.log(frog.left + "," + frog.top);

    }
    // d key to go right
    if(keycode == 68)
    {
        frog.left = frog.left + 50;
    }

    if(keycode == 87)
    {
        frog.top = frog.top - 50;
    }

    if(keycode == 83)
    {
        frog.top = frog.top + 50;
    }

});



//Anything that needs to be drawn on the screen should be in this function.  Make sure it is abstracted
function animate() {
    a=requestAnimationFrame(animate);
    //draws the background
    drawBackground();

    //draws the lillypads
    for (i = 0; i<lilyPadsArray.length; i++){
        drawLilyPads(lilyPadsArray[i]);
    }

    //draws and moves the cars and checks for its collision with the frog
    for (i = 0; i<logsArray.length;i++){
        moveLogs(logsArray[i]);
        checkCollisionWithLogs(frog,logsArray[i]);
    }
    //draws the moving star and checks its collision with the frog
    drawStar();
    //draws the invisible rectangles at the home spots
    drawReactan();
    //draws the frog
    drawFrog();
    //draws the many frogs in the home
    drawMultipleFrogs();
    //moves the first snake
    moveSnake();
    //moves the second snake
    moveSnake2();

    //moves the cars and checks its collisions with the frog
    for(i = 0;i<carsArray.length;i++){
        moveCars(carsArray[i]);
        checkCollisionWithCars(frog,carsArray[i]);
    }

    //draws the hearts according to the health
    for(i = 0;i<health;i++){
        drawHearts(heartsArray[i]);
    }

    //checks the frogs collision with the spots
    checkFrogEndCollisionWithSpots();
    //checks the frogs collision with the walls
    checkFrogCollideWithWalls();
    //checks the collision with the snakes
    checkCollisionWithSnake();
    //checks the frogs collision with the water
    checkCollisionWithWater();


}

/*
**********************************************************************************************************
* Below are a few functions you may need.  You will need a lot more than what is listed.
*
* Also don't feel like you have to code each of these functions in order.  It is simply to help you think
* about what you need to do in this project.
*
* IMPORTANT!!! Do not push more images or shapes into an array in any function that is called from the animate()
* ********************************************************************************************************
 */
//draws the frog
function drawFrog(){

    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.drawImage(frog,frog.left,frog.top,frog.width,frog.height);
    console.log(detSnakeMov);
    // console.log(randSanMov);
    // console.log(touchSpots);
    // console.log(rect3.x + " , " + rect3.height);
    // console.log(frog.left + "," + frog.top);
}

//draws the star at its diffrent random spots and checks the frogs collision with it.
function drawStar(){
    var ctx = document.getElementById("canvas").getContext("2d");
    //only draws the star if its vis is true
    if (star.vis == true){
        ctx.drawImage(star,star.left,star.top,star.width,star.height);
    }

    //checks if the frog touches the star
    if(frog.left + frog.width > star.left && frog.left < star.left+ star.width &&
        frog.top + frog.height > star.top && frog.top < star.top + star.height && frog.vis == true && star.vis == true){

        //resets the star at a random X and Y
        starYCor = getRandomInt(300,750);
        starXCor = getRandomInt(0,650);

        //stes the frog at the random X and Y generated
        star.left = starXCor;
        star.top = starYCor;

        //Adds a bonus points for each time the frog hits the star
        bonusPoints = bonusPoints + 50;
        //checks if the bonus points have reached 300
        checkBonusPnts();

    }
}
//checks if the bonus points have reached 300
function checkBonusPnts(){
    if (bonusPoints == 300){
        //increases the score
        score += 1;
        //resets the frog
        frog.left = 300;
        frog.top = 800;
        //sets the stars visibility to false
        star.vis = false;
    }
}

//draws the invisible rectangles at the end
function drawReactan(){
    var ctx = document.getElementById("canvas").getContext("2d");

    ctx.fillStyle = "#ffffff00";
    ctx.fillRect(rect1.x,rect1.y,rect1.width,rect1.height);
    ctx.fillRect(rect2.x,rect2.y,rect2.width,rect2.height);
    ctx.fillRect(rect3.x,rect3.y,rect3.width,rect3.height);
    ctx.fillRect(rect4.x,rect4.y,rect4.width,rect4.height);
    ctx.fillRect(rect5.x,rect5.y,rect5.width,rect5.height);


}
//draws the multiple frogs at the end in the spots
function drawMultipleFrogs(){
    var ctx = document.getElementById("canvas").getContext("2d");
    if (frogSpot1.vis == true){
        ctx.drawImage(frogSpot1,frogSpot1.left,frogSpot1.top,frogSpot1.width,frogSpot1.height);
    }

    if (frogSpot2.vis == true){
        ctx.drawImage(frogSpot2,frogSpot2.left,frogSpot2.top,frogSpot2.width,frogSpot2.height);
    }

    if (frogSpot3.vis == true){
        ctx.drawImage(frogSpot3,frogSpot3.left,frogSpot3.top,frogSpot3.width,frogSpot3.height);
    }

    if (frogSpot4.vis == true){
        ctx.drawImage(frogSpot4,frogSpot4.left,frogSpot4.top,frogSpot4.width,frogSpot4.height);
    }

    if (frogSpot5.vis == true){
        ctx.drawImage(frogSpot5,frogSpot5.left,frogSpot5.top,frogSpot5.width,frogSpot5.height);
    }
}
//checks if the frog has collided with the end spots
function checkFrogEndCollisionWithSpots(){
    touchSpots = false;

    if(frog.left + frog.width > rect1.x && frog.left < rect1.x + rect1.width &&
        frog.top + frog.height > rect1.y && frog.top < rect1.y + rect1.height){

        touchSpots = true;
        frogSpot1.vis = true;
        score += 1;
        checkWin();
        // console.log("TOUCH DOWN BABY!");

    }

    if(frog.left + frog.width > rect2.x && frog.left < rect2.x +rect2.width &&
        frog.top + frog.height > rect2.y && frog.top < rect2.y + rect2.height){

        touchSpots = true;
        frogSpot2.vis = true;
        score += 1;
        checkWin();
        // console.log("TOUCH DOWN BABY!");

    }

    if(frog.left + frog.width > rect3.x && frog.left < rect3.x +rect3.width &&
        frog.top + frog.height > rect3.y && frog.top < rect3.y + rect3.height){

        touchSpots = true;
        frogSpot3.vis = true;
        score += 1;
        checkWin();
        // console.log("TOUCH DOWN BABY!");

    }

    if(frog.left + frog.width > rect4.x && frog.left < rect4.x +rect4.width &&
        frog.top + frog.height > rect4.y && frog.top < rect4.y + rect4.height){

        touchSpots = true;
        frogSpot4.vis = true;
        score += 1;
        checkWin();
        // console.log("TOUCH DOWN BABY!");

    }

    if(frog.left + frog.width > rect5.x && frog.left < rect5.x +rect5.width &&
        frog.top + frog.height > rect5.y && frog.top < rect5.y + rect5.height){

        touchSpots = true;
        frogSpot5.vis = true;
        score += 1;
        checkWin();
        // console.log("TOUCH DOWN BABY!");

    }





}
//draws the lilly Pads
function drawLilyPads(lily){
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.drawImage(lily,lily.left,lily.top,lily.width,lily.height);
}
//draws the hearts
function drawHearts(h){
    var ctx = document.getElementById("canvas").getContext("2d");
    if(h.vis == true){
        ctx.drawImage(h,h.left,h.top,h.width,h.height);
    }

}
//moves the car adding or subtracting its set movement
function moveCars(pic){
    var ctx = document.getElementById("canvas").getContext("2d");

    if (pic.vis == true){
        ctx.drawImage(pic,pic.left,pic.top,pic.width,pic.height);
    }

        pic.left += pic.movement;

        if (pic.movement < 0 && pic.left < -50){
            pic.left = 750;
        }else if (pic.movement > 0 && pic.left > 675){
            pic.left = -100;
        }

}
//checks the frogs collision with the cars
function checkCollisionWithCars(p1,p2){
    if(p1.left +p1.width > p2.left && p1.left < p2.left+p2.width &&
        p1.top + p1.height > p2.top && p1.top < p2.top + p2.height &&
        p1.vis == true && p2.vis ==true){//by adding these to the if statement we check for collission only if the pictures are on the screen
        frog.left = 300;
        frog.top = 800;
        checkFrogDie();
    }
}
//moves the first snake
function moveSnake(){
    var ctx = document.getElementById("canvas").getContext("2d");

    ctx.drawImage(snake,snake.left,snake.top,snake.width,snake.height);


    snake.left = snake.left + snake.movement;

    if (snake.left < -250){
        detSnakeMov = getRandomInt(0,2);
        checkSnakeRandom();
    }
    if (snake.left > 850){
        detSnakeMov = getRandomInt(0,2);
        checkSnakeRandom();
    }

}
//moves the second snake
function moveSnake2(){
    var ctx = document.getElementById("canvas").getContext("2d");

    if (snake2.vis == true){
        ctx.drawImage(snake2,snake2.left,snake2.top,snake2.width,snake2.height);
    }


    snake2.left = snake2.left + snake2.movement;

    if (snake2.left < -250){
        detSnakeMov2 = getRandomInt(0,2);
        checkSnakeRand2();
    }
    if (snake2.left > 850){
        detSnakeMov2 = getRandomInt(0,2);
        checkSnakeRand2();
    }
}
//checks the boundires of the first snake
function checkSnakeRandom(){

    if (detSnakeMov == 0){
        snake.left = -150;
        snake.movement = 2;
    }else if (detSnakeMov == 1){
        snake.left = 750;
        snake.movement = -2;
    }

}
//checks the boundires of the second snake
function checkSnakeRand2(){
    if (detSnakeMov2 == 0){
        snake2.left = -150;
        snake2.movement = 4;
    }else if (detSnakeMov2 == 1){
        snake2.left = 750;
        snake2.movement = -4;
    }
}
//checks the frogs collision with the snakes
function checkCollisionWithSnake(){
    if(frog.left +frog.width > snake.left && frog.left < snake.left+snake.width &&
        frog.top + frog.height > snake.top && frog.top < snake.top + snake.height &&
        frog.vis == true && snake.vis ==true){

        frog.left = 300;
        frog.top = 800;
        checkFrogDie();
    }

    if(frog.left +frog.width > snake2.left && frog.left < snake2.left+snake2.width &&
        frog.top + frog.height > snake2.top && frog.top < snake2.top + snake2.height &&
        frog.vis == true && snake2.vis ==true){

        frog.left = 300;
        frog.top = 800;
        checkFrogDie();
    }

}
//checks if the frog has died or not and subtractes lifes
function checkFrogDie(){
    health--;
//this ensures that the hearts are only drawn if the health is greater then 0
    if (health > 0){
        //this goes through the entire heart array
        for (i = 0; i < heartsArray.length; i++){
            //this checks that the right heart is taken away
            if (i == health){
                //sets the visibility of the frog to false
                heartsArray[i].vis = false;
                // console.log(health);
            }
        }
    }else{
        //shows game over and stops the animation
        cancelAnimationFrame(a);
        drawBackground();
        gameOver = true;
        document.getElementById("reset").disabled = false;
        drawGameOverText();
        //checks to store the highscore
        checkHighScore();
    }



}
//Checks if the frog collides with the walls
function checkFrogCollideWithWalls(){
    if (frog.left < 0 || frog.left > 600 ||frog.top + frog.height > 850) {
        frog.left = 300;
        frog.top = 800;

        checkFrogDie();
    }

    if (frog.top < 250 && touchSpots == false){
        frog.left = 300;
        frog.top = 800;
        score = score + 1;
        checkFrogDie();
    }

    if (touchSpots == true){
        checkWin();
    }


}
//checks when the game resets that the muti frogs disapper
function disFrogsViz(f1,f2,f3,f4,f5){
    f1.vis = false;
    f2.vis = false;
    f3.vis = false;
    f4.vis = false;
    f5.vis = false;
}
//checks when the game wins
function checkWin(){
    frog.left = 300;
    frog.top = 800;

    if (score == 3){
        level = 2;
        disFrogsViz(frogSpot1,frogSpot2,frogSpot3,frogSpot4,frogSpot5);
        carsArray[4].vis = true;
        logsArray[5].vis = false;
        for (i = 0; i<carsArray.length; i++){
            if (carsArray[i].movement < 0){
                carsArray[i].movement -= 0.5;
            }else{
                carsArray[i].movement += 0.5;
            }
        }

    }

    if (score == 6){
        level = 3;
        disFrogsViz(frogSpot1,frogSpot2,frogSpot3,frogSpot4,frogSpot5);
        carsArray[7].vis = true;
        logsArray[8].vis = false;
        snake2.vis = true;
        for (i = 0; i<logsArray.length; i++){
            if (logsArray[i].movement < 0){
                logsArray[i].movement -= 0.5;
            }else{
                logsArray[i].movement += 0.5;
            }
        }
    }

    if (score == 9){
        level = 4
    }

    if (level == 4){
        cancelAnimationFrame(a);
        drawBackground();
        winGame = true;
        document.getElementById("reset").disabled = false;
        gameEndWinText();
        checkHighScore();
    }
}
//resets the game
function resetGame(){
    document.getElementById("reset").disabled = true;
    score = 0;
    health = 3;
    bonusPoints = 0;
    level = 1;
    collWater = false;
    collLog = false;
    gameOver = false;
    winGame = false;
    carsArray.splice(0, carsArray.length);
    heartsArray.splice(0, heartsArray.length);
    logsArray.splice(0,logsArray.length);
    lilyPadsArray.splice(0,lilyPadsArray.length);
    initialize();
    animate();

}
//checks the high score
function checkHighScore(){
    if (score <= highScore){
        highScore = highScore;
    }else if (score >= highScore){
        highScore = score;
    }
}
//moves the logs left and right
function moveLogs(logs){
    var ctx = document.getElementById("canvas").getContext("2d");

    if (logs.vis == true){
        ctx.drawImage(logs,logs.left,logs.top,logs.width,logs.height);
    }


    logs.left += logs.movement;

    if (logs.movement < 0 && logs.left < -200){
        logs.left = 700;
    }else if (logs.movement > 0 && logs.left > 675){
        logs.left = -200;
    }
}
//checks the frogs collision with the water
function checkCollisionWithWater(){
    if (frog.top < 500){
        collWater = true;

        if (collWater == true && collLog == false){
            frog.left = 300;
            frog.top = 800;
            checkFrogDie();
        }
        collLog = false;
        // console.log(collWater);
    }

}
//checks the frogs collision with the logs
function checkCollisionWithLogs(p1,p2){
    if (p1.left + p1.width > p2.left && p1.left < p2.left +p2.width &&
        p1.top + p1.height-40 > p2.top && p1.top < p2.top + p2.height-40 &&
        p1.vis == true && p2.vis ==true){
        collLog = true;
        collWater = false;
        // console.log("TD" + " , " + collLog);
        p1.movement = p2.movement;
        p1.left += p1.movement;
    }
}
//explains how to play
function HowToPlay(){
    document.getElementById("p1").innerHTML = "So your wondering how to play frogger? Well this is not your regualr Frogger, this is my version of Frogger! Heres how you play it: Controls: A to move left, S to move down, W to move up, and D to move right. Goal: Get to the home 3 times per level. There are 3 levels which get harder each time, so be careful. Avoid getting run over by a car and be weary of the water. Collect the stars, once you get 300 bonus points you get a automatic increase in score! Watch out for the snake, and it will be randomly moving! Try to reach the end of the game and beat your highscore! Have fun!";
}


//
// //you will need functions to draw and move all of your cars, logs, etc...
//
// function createCars(){
//
// }
//
// function createLogs(){
//
// }
//
// function moveCarsRight(){
//
// }
//
// //etc.......
//
//this function may be helpful.  You should understand it and be able to make it on your own.
function getRandomInt(min, max) { //return random int
    return Math.floor(Math.random() * (max - min)) + min;
}

// function myFunction() {
//     alert('Hello');
// }
//
// //Having a reset function allows the user to play again.
// function reset() { //resets left and top values of frog, but doesn't redraw it
//
// }
//
// //most games require a function to see if winning conditions have been met.
// //Do not reload the screen
// function checkWin() {
//
// }
//
// //your game may have multiple levels eventually.  Put code here to switch to the next level.  Switching levels
// //is not the same as going to another webpage with another HTML file
// function NextLevel() {
//
// }
//
// //You may want a function to show your controls for the user.
// function help() {
//     alert("Controls: W, T, I, and Up Arrow is up. S, G, K, and Down Arrow is down. A, F, J and Left Arrow is left. And D, H, L and Right Arrow is right. The goal of the game is to get the frog into its five homes at the top of the screen. Avoid the cars, snakes and crocodiles, while using the logs as transportation. Also, hearts, stars and clocks all act as power ups. To get to the highest round possible, join together with up to 3 people to play together. Remember there is a timer!");
// }
