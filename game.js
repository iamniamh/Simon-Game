var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = [];
var level = 0;
var started = false;

function newSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


$(".btn").on("click", function(){
  var userChosenColour = (this.id);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

$(document).keypress(function(){
    if (! started) {
    nextSequence();
    started = true;};
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("Success")
        if (userClickedPattern.length == gamePattern.length){
        setTimeout(nextSequence, 1000);}
    } else {
        console.log("Failure")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {$("body").removeClass("game-over");},200);
        $("#level-title").text("Game Over. Press Any Key to Restart.");
        startOver();
    }
};

function nextSequence(){
    level += 1;
    $("#level-title").text("Level " + String(level));
    userClickedPattern = [];
    newSequence();
};

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
};

