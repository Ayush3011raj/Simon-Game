var buttoncolors=["red","blue","green","yellow"];
var gamepattern=[];
var userClickedPattern = [];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userchosencolor= $(this).attr("id");
    userClickedPattern.push(userchosencolor);
    playsound(userchosencolor);
    animatepress(userchosencolor);
    checkanswer(userClickedPattern.length-1);
});
function playsound(name){
   var audio= new Audio("sounds/"+name+".mp3");
   audio.play();
}
function animatepress(currentcolor){
    var active= $("#"+currentcolor);
    active.addClass("pressed");
    setTimeout(function(){
        active.removeClass("pressed");
    },100);
}

function checkanswer(currentLevel){
     if(gamepattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamepattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
     }
     else{
        $("#level-title").text("Game Over press any key to start");
        var audio= new Audio("./sounds/wrong.mp3");
        audio.play();
        var obj= $("body");
        obj.addClass("game-over");
        setTimeout(function(){
            obj.removeClass("game-over");
        },200);
        startover();
     }
}

function nextsequence(){
  level++;
  userClickedPattern=[];
  $("#level-title").text("Level "+level);
  var randomnumber= Math.floor(Math.random()*4);
   var randomchosencolor= buttoncolors[randomnumber];
   gamepattern.push(randomchosencolor);
   $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
   var audio= new Audio("sounds/"+randomchosencolor+".mp3");
   audio.play();
}
function startover(){
    level=0;
    gamepattern=[];
    started=false;
}


