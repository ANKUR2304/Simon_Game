var buttonColors=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var firstTime=true;

$(".btn").click(function(){
    userClickedPattern.push(this.id);

    // add animation to press
    animatePress(this.id);

    //play sound for press
    playSound(this.id);

    //now check answer
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){
    //adding pressed class and removing it after 100 ms
    $("#"+currentColor).addClass("pressed");

    setInterval(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success"); 
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        console.log("wrong");
    }
}

function nextSequence(){
    // har level k liye naya pattern click krna hai that will be combination of all previous patterns + one new button
    //so, for each level , we need to store a new pattern clicked by user & that should match with the gamePattern that is storing all buttons including previous levels also because it is not cleared on each level instead gamePattern becoming large on each level
    // on level 1 size of game pattern is 1 
    // on level 2 size of game pattern is 2 & so on
    // but user has to click pattern starting over
    // means level 1 pe 1 button click krna hai tujhe jo pop hua tha uske corresponding
    // ab level 2 pe ek or button pop hoga , or is baar last level ka button + jo abhi pop hua tha wo press krna h i.e. is baar tujhe 2 button click krne h
    // it keeps on adding for further levels
    // to is ttarah se har level pe gamePattern to incrrease ho rha h & userPattern shuru se shuru ho rha h
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    animatePress(randomChosenColor);

    playSound(randomChosenColor); 
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function startOver(){
    level=0;
    firstTime=true;
    gamePattern=[];
    
}

$(document).keypress(function(){
    if(firstTime){
        //when the game starts, we show "Level 0" in h1
        $("#level-title").text("Level " + level);

        nextSequence();
        firstTime=false;
    }
});
