var buttonColors = ['red', 'green', 'blue', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(document).on('keypress', function() {
    if (!gameStarted) {
        nextSequence();

        gameStarted = true;
    }
});

$('.btn').on('click', function() {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});



// FUNCTIONS
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * buttonColors.length);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
    level++;
    $('h1').text('Level ' + level);

    userClickedPattern = [];
}

function playSound(name) {
    var sound = new Audio('sounds/' + name + '.mp3');
    sound.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        $('h1').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    gameStarted = false;
}