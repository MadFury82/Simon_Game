var gamePattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var userClickedPattern = []
var level = 0;
var started = false

    document.addEventListener('keydown', myFunction);
function myFunction(event){
    if (event.key  && started === false){
        nextSequence();
        started = true
    }
};

document.querySelector('.startGame').addEventListener('click',function(){
    if(started ===false){
    nextSequence();
    started = true
}
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    document.getElementById(randomChosenColor).addEventListener('click', function(){
        animatePress(randomChosenColor);
        playSound(randomChosenColor);
    });

    document.getElementById(randomChosenColor).classList.add('flash');
    setTimeout(function(){
        document.getElementById(randomChosenColor).classList.remove('flash');  
    },300)


    level += 1
    document.querySelector('h1').innerHTML = 'Level ' + level
}



for (var i = 0; i<4;i++){
document.getElementsByClassName('btn')[i].addEventListener('click',function(){
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length);
})
}

function animatePress(currentColor){
    document.getElementById(currentColor).classList.add('pressed');
    setTimeout(function(){
        document.getElementById(currentColor).classList.remove('pressed');  
    },100)
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel -1] !== gamePattern[currentLevel -1]){
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        document.body.classList.add('game-over');
        setTimeout(function(){
            document.body.classList.remove('game-over');
        },200);
        document.querySelector('h1').innerHTML = 'Game Over, Press Any Key to Restart';
        startOver();
    }
    if(userClickedPattern.length === level && started === true){
        setTimeout(nextSequence,700);
        userClickedPattern = [];
        document.body.classList.add('green');
        setTimeout(function(){
            document.body.classList.remove('green');
        },200);
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}





function playSound(name){
    switch (name) {
        case 'red':
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;
        case 'green':
            var green = new Audio('sounds/green.mp3');
            green.play();
            break;
        case 'blue':
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
        case 'yellow':
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;
    
        default: console.log(randomChosenColor);
    }
}
