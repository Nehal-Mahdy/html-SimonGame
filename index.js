
var buttonColors= ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level= 0 ;

var started=false;

$(document).on("keydown",function(){


    if(!started){

    $("#level-title").text("level "+level);
    nextSequence();
    started=true;

    
    }})


function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("level "+level);
}




$(".btn").on("click",function(){
    var userChosenColor= this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)


})

function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function () {
    $("#"+currentColor).removeClass("pressed");

}, 100);

}


function checkAnswer(currentlevel){
    if ( gamePattern[currentlevel] === userClickedPattern[currentlevel] )
    {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
      
        }
    }
    else{
        console.log("wrong");
        var wrongSound = new Audio ("sounds/wrong.mp3");
        wrongSound.play();  

        $("body").addClass("game-over");
        setTimeout(function () { 
            $("body").removeClass("game-over");

        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
        
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}