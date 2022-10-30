                            // Création des contextes canevas jeu et canrvas lives(vies):

let principalCanvas = document.getElementById("canevasGame");
let principalContext = principalCanvas.getContext("2d");

let livesCanvas = document.getElementById("canvasScore");
let livesCtx =  livesCanvas.getContext("2d");

// Dimensions des canvas 

principalCanvas.width = 1100;
principalCanvas.height = 720;

livesCanvas.width = 268;
livesCanvas.height = 102;


                                              // Variables de Jeu:

let lives = 3 ;
let score = 0 ; 
let level = 0;
let animate = true;
var rightPressed = false;
var leftPressed = false;
var startPressed = false;
var paddleHeight = 20;
var paddleWidth = 115;
var paddleX = (principalCanvas.width-paddleWidth)/2;                                                        
var balleRadius = 28;                                                       
var x = paddleX + (paddleWidth / 2) - (balleRadius/2);
var y = principalCanvas.height-45;
var dx = 4.5;
var dy = -4.5; 
var brickRowCount = 3;
var brickColumnCount = 10;
var brickWidth = 100;
var brickHeight = 15;
var brickPadding = 5;
var brickOffsetTop = 25;
var brickOffsetLeft = 25;
var fingame = 300;
var eyes = false;

    


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

                                             /**Commandes de jeu */

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeX = e.clientX - principalCanvas.offsetTop;
    if(relativeX > paddleWidth/2 && relativeX < principalCanvas.width - paddleWidth/2) {
      paddleX = relativeX - paddleWidth/2;
      if(!startPressed)x = relativeX  - (balleRadius/2);
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true; 
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true; 
    }
    else if (e.keyCode == 32){
        startPressed = true;
    } 
       
}
                                               
function keyUpHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68){
        rightPressed = false; 13
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false; 
    }
    else if (e.keyCode == 32){
        startPressed = true;
    }
    
} 

                                               // Images de jeu:

let imgLives = new Image();
imgLives.src = "images/sprite_barre_de_vies.png" ;

let paddle = new Image();
paddle.src = "images/paddle.png";

let eyesImg = new Image();
eyesImg.src = "images/redeyes.png";

let danBreakoib = new Image();
danBreakoib.src = "images/danbreakoid.png";

let ball = new Image();
ball.src = "images/ball3.png";

let succes = new Image();
succes.src = "images/m_succes.png";

let heHe = new Image();
heHe.src = "images/m_rire.png";


                                                 // Animation affichage Lives(parties réstantes), Score et level;

function cleanLivesCanvas(){                                                // netoyage canevas live  
    livesCtx.clearRect(0, 0, livesCanvas.width, livesCanvas.height)
}

function drawLevel(){
    let affLevel = document.getElementById("levelGame");
    affLevel.innerText = "Level:";
    let affLvlValue = document.getElementById("levelValue");
    affLvlValue.innerText = level;
}

function drawLives(){                                                       // afficahge nombre de patries réstantes
    let affLives = document.getElementById("livesQtty");
    affLives.innerText = "Lives:";
    cleanLivesCanvas();
    livesCtx.drawImage(imgLives, (3 - lives)*livesCanvas.width, 0, livesCanvas.width, livesCanvas.height, 0, 0, livesCanvas.width, livesCanvas.height); 
    
}

function afficheScore(){                                      // affichage score
    let textScore = document.getElementById("totalPoints");
    textScore.innerText = "Score:"
    let affScore = document.getElementById("affScore");
    affScore.innerHTML = score;
}

function animScore() {                                        // animation score pour 100 points
    anime({
        targets: '#affScore',
        keyframes: [
            {color: '#DBEC5E', scale: 1.35, duration:50}, 
            {color: '#C60030', scale: 1.25, duration:50},
            {color: '#DBEC5E', scale: 1.35, duration:50}, 
            {color: '#C60030', scale: 1.25, duration:50}, 
            {color: '#DBEC5E', scale: 1.35, duration:50}, 
            {color: '#DBEC5E', scale: 1.25, duration:50},
            {color: 'rgb(165, 250, 38)', scale: 1, duration:50},                                  
        ],
        loop:false
    });
}

function animAffScore(){
    if(score % 100 ==0 && score != 0)animScore();
}


function animLive3() {                                                  // couleur "Lives"
    anime({
        targets: '#livesQtty',
        keyframes: [
          {color: '#00FA9A',duration:500},
        ],
        
        loop: false
    });
}


function animLive2() {
    anime({
        targets: '#livesQtty',
        keyframes: [
          {color: '#FF8C00'},
        ],
        
        loop: false
    });
}

function animLive1() {
    anime({
        targets: '#livesQtty',
        keyframes: [
          {color: '#F70E0E', scale: 1.22 ,duration:500},
          {color: '#F9F9F9', scale: 1 , duration:500},
        ],
        
        loop: false
    });
}
function animeLives() {
    switch(lives){
        case 1: animLive1();
                break;
        case 2: animLive2();
                break;
        default: animLive3();
                break;
        
    }
}

                                                                // fonctions relatives au canevas principal

function cleanPrincipalCanvas(){
    principalContext.clearRect(0, 0, 1100, 720);
}


// Images sur Canvas :

function backStyl(){
    switch(level){
        case 2 : principalCanvas.style.background ='url("images/bg_niveau2.png")';
            break;
        case 3 : principalCanvas.style.background ='url("images/bg_niveau3.png")';
            break;
        default : principalCanvas.style.background = 'url("images/bg_niveau1.png")';
            break;
    }
}




// Animations  d'acceuil.

function  EyesEntry(){
    anime({
        targets: '#divEyes',
        keyframes: [
            {translateY: 1150, duration:4500}
        ],
        loop:false
    });
}

function DanEntry(){
    anime({
        targets: '#divDan',
        keyframes: [
            {translateY: 1670, duration:4500}
        ],
        loop:false
    });
}

function EyesOut(){
    anime({
        targets: '#divEyes',
        keyframes: [
            {scale:0, duration:4},
            {translateY: -1150, duration:4},
            {scale:1, duration:4},
        ],
        loop:false,
    });
}

function DanOut(){
    anime({
        targets: '#divDan',
        keyframes: [
            {scale:0, duration:4},
            {translateY: -1670, duration:4}
        ],
        loop:false,
    });
}

function divEntry(){
    anime({
        targets: '#gameDiv',
        keyframes: [
            {translateY: 1200, duration:4500}
        ],
        loop:false
    });
}

function buttonEntry(){
    anime({
        targets: '#divButton',
        keyframes: [
            {scale: 0, duration: 20},
            {translateY: 1200, duration: 4000},
            {scale: 1, duration: 2},
            {scale: 1.01,duration:300},
            {scale: 1, duration:150},
            {scale: 1.01,duration:300},
            {scale: 1, duration:150},
            {scale: 1.01,duration:300},
            {scale: 1, duration:150},
        ],
        loop:false,
    });
}


                                                                           // Animations .

function buttonOut(){
    anime({
        targets: '#divButton',
        keyframes: [
            {scale:0, duration:4},
            {translate4: -1200, duration:4}
        ],
        loop:false,
    });
}

function loadAnim(){
    anime({
        targets: '#container',
        keyframes: [
            {scale: 0, duration: 10},
            {translateY: 950, duration: 10},
            {scale: 1, duration: 10},
            {scale: 1,duration:3980},
            {scale: 0, duration: 10},
            {translateY: -1200, duration: 10},

        ],
        loop:false
    });
}

// Succes image

function  drawSucces() {
    principalContext.drawImage(succes,0,0);
}

// Hé Hé Hé!!! image

function drawHeHe(){
    principalContext.drawImage(heHe,800,25);    
}

   /** Textes de jeu */


function textLevel1_2(){
    principalContext.font = '48px serif';
    principalContext.fillStyle  = "white";
    principalContext.fillText("NIVEAU 1 TERMINÉ", 350, 300);
    principalContext.fillText("Passez au niveau 2", 360 , 360);
}

function textLevel2_3(){
    principalContext.font = '48px serif'; 
    principalContext.fillStyle  = "#FFFFFF"; 
    principalContext.fillText("NIVEAU 2 TERMINÉ", 350, 300);
    principalContext.fillText("Passez au niveau 3", 360 , 360) ; 
}

function textWin(){
    principalContext.font = '48px serif';
    principalContext.fillStyle  = "#FFFFFF";
    principalContext.fillText("!!!!! GAGNÉ !!!!!", 350, 300);
    principalContext.fillText("!!!!! REJOUER !!!!!", 340 , 360);
}

function textGameOver(){
    principalContext.font = '48px serif';
    principalContext.fillStyle  = "#F9530C";
    principalContext.fillText("!!!!! PERDU !!!!!", 350, 340);
    principalContext.fillText("!!!!! REJOUER !!!!!", 340 , 400);
}

                                                        /** Elements de Jeu */


                                                        
function drawPedal(){                        // paddle
    
    if(rightPressed && paddleX < principalCanvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    principalContext.drawImage(paddle,paddleX, principalCanvas.height - paddleHeight);
    
}



function drawBall(){                         // balle
    
    if(rightPressed && paddleX < principalCanvas.width-paddleWidth &&  !startPressed) {
        x += 7;
    }
    else if(leftPressed && paddleX > 0 &&  !startPressed) {
        x -= 7;
    }
    
    principalContext.drawImage(ball, x, y);
}

//tableau de briques
var bricks = [];

function brickList(){
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1}; 
        }
    }
}


function drawBricks() {
    
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
                var a = Math.floor(c*r/5);
                var b = r * 25;
                var d = Math.floor(c*35);

                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                principalContext.beginPath();
                principalContext.rect(brickX, brickY, brickWidth, brickHeight);
                principalContext.fillStyle = "rgb("+String(d)+","+String(a)+","+String(b)+ ")";
                principalContext.fill();
                principalContext.closePath();
            }
        }
    }
}
    
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1){
                if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight)   {
                    dy = -dy;
                    b.status = 0;
                    score+=10;
                    animAffScore();
                    afficheScore();
                    if (score == fingame){
                        startPressed = false;
                        
                        if(level<=2){
                            level++;
                            paddleX = (principalCanvas.width-paddleWidth)/2;                                                                             
                            x = paddleX + (paddleWidth / 2) - (balleRadius/2);
                            y = principalCanvas.height-45;
                            
                            
                            brickRowCount++;
                            fingame +=(brickRowCount * 100);
                            brickList();
                            cleanPrincipalCanvas();
                            drawSucces();
                            drawHeHe();
                            if(level == 2){
                                textLevel1_2() ;
                                dx = 6;
                                dy = 6;
                            }
                            if(level == 3){
                                textLevel2_3(); 
                                dx = 7.5;
                                dy = 7.5;
                            }                         
                            buttonEntry();
                            moveGame.pause();
                        }
                        else{
                            level = 1;
                            paddleX = (principalCanvas.width-paddleWidth)/2;                                                                             
                            x = paddleX + (paddleWidth / 2) - (balleRadius/2);
                            y = principalCanvas.height-45;
                            score = 0;
                            dx = 4.5;
                            dy = 4.5;
                            brickRowCount=3;
                            fingame =300;
                            lives = 3;
                            brickList();
                            cleanPrincipalCanvas();
                            drawSucces();
                            drawHeHe(); 
                            textWin();                          
                            buttonEntry();
                            moveGame.pause();
                        }                        
                    }
                }
            }
        }
    }
}



                                                         // Application Jeu:

function moveGame(){
    drawPedal();
    drawBall();   
    
    if(startPressed){
        if( x + dx < 0 || x + dx > principalCanvas.width - balleRadius){
            dx = -dx;
        }
    
        if(y + dy < 0){
            dy = -dy-0.1;
        }else if(y + dy > principalCanvas.height - balleRadius -paddleHeight/2){
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                startPressed = false;
                lives--;
                animeLives();
                drawLives();
                
                if(!lives) {
                    level = 1;
                    paddleX = (principalCanvas.width-paddleWidth)/2;                                                                             
                    x = paddleX + (paddleWidth / 2) - (balleRadius/2);
                    y = principalCanvas.height-45;
                    score = 0;
                    lives = 3;
                    dx = 4.5;
                    dy = -4.5;
                    brickRowCount=3;
                    fingame =300;
                    eyes = true;
                    brickList();
                    cleanPrincipalCanvas();
                    EyesEntry();
                    drawHeHe();
                    textGameOver()                           
                    buttonEntry();
                    moveGame.pause();
                    }
                    else {                        
                        paddleX = (principalCanvas.width-paddleWidth)/2;                                                                             
                        x = paddleX + (paddleWidth / 2) - (balleRadius/2);
                        y = principalCanvas.height-45;
                    
                }
                            
            }
        }
        x += dx;
        y += dy;
    }
}


/* lancement page d'acceuil */

backStyl();


if(level == 0){
    EyesEntry();
    DanEntry();
    backStyl();
    divEntry();
    document.getElementById("startButton").disabled = true;
    buttonEntry();     
    setTimeout(function(){document.getElementById("startButton").disabled = false;},5875 );  
}
     


/* Loading game et lancement jeu  */

function playGame(){
    if(!startPressed && level ==0){
        cleanPrincipalCanvas();
        level++;
        setTimeout(brickList,1000);
        backStyl();
        EyesOut();
        DanOut();
        buttonOut();
        loadAnim();
        setTimeout(playingGame,4000); 
    }else if (!startPressed && level >= 1){
        cleanPrincipalCanvas();
        backStyl();
        if(eyes) {
            eyes = false;
            EyesOut();
        }
        loadAnim();
        buttonOut();
        setTimeout(playingGame,4000);
    }
       
}
                                          


/* fonction Jeu */

function playingGame(){
    
    cleanPrincipalCanvas();
    drawBricks();
    backStyl();
    drawLevel();
    if (level == 1){
        drawLives();
        animeLives();
    }    
    animAffScore();
    afficheScore();
    collisionDetection();
    moveGame(); 
    
    window.requestAnimationFrame(playingGame);
}

