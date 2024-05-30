const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStarted = false;


function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour)
    // console.log(gamePattern)

    level++;
    $("#level-title").text("Level " + level)
    userClickedPattern = []

    playSound(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
};

function playSound(name){
    var audio = new Audio("sounds/" + name + '.mp3');
    audio.play();
}

$(".btn").click(function(e){
    handler(e.target.id)
})

function handler(id){
    let userChosenColour = id
    userClickedPattern.push(userChosenColour)
    console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)

    // Passing the last element of user's choice
    if(!checkAnswer(userClickedPattern.length - 1)){
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        return true
    } else{
        return false
    }
}

function startOver(){
    level = 0;
    isStarted = false;
    gamePattern = [];
}


$(document).on("keypress",function(){
    if(!isStarted){
        nextSequence();
        isStarted = true
    } 
})
    







