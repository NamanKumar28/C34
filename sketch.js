var ball,database;
var position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var dbBallPosition = database.ref('ball/position');
    dbBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position !== undefined){

        if(keyDown(LEFT_ARROW)){
            writePosition(-5,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(5,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-5);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+5);
        }
        drawSprites();
    }
       
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function showError(){
    console.log("errorReading");
}

function readPosition(data){
position = data.val();
ball.x = position.x;
ball.y = position.y;
}

function writePosition(x,y){
database.ref('ball/position').set({
    'x': position.x + x,
    'y': position.y + y
})
}
