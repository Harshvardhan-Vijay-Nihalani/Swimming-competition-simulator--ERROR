class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    swimmer1 = createSprite(150,480,20,20);
    swimmer1.addImage(swim1Image);
    swimmer1.scale=0.2;
    swimmer2 = createSprite(290,480,20,20);
    swimmer2.addImage(swim2Image);
    swimmer2.scale=0.2;
    swimmer3 = createSprite(230, 480,20,20);
    swimmer3.addImage(swim3Image);
    swimmer3.scale = 0.2;
    swimmers = [swimmer1, swimmer2, swimmer3];

    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    //get the winner
      
    if(allPlayers !== undefined){
      //var display_position = 100;
      // background image once all players have joined
        background("blue");

        //adding the image on the canvas
       
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y=0;

      laneLine1=createSprite(width/3, 0, 10, 8800);
      laneLine1.shapeColor="white";
      laneLine2=createSprite((width/3)*2, 0, 10, 8800);
      laneLine2.shapeColor="white";
      laneLine3=createSprite(width-10, 0, 10, 8800);
      laneLine3.shapeColor="white";
      laneLine4=createSprite(10, 0, 10, 8800);
      laneLine4.shapeColor="white";

      for(var plr in allPlayers){
        player.getWinner();
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        
        //use data form the database to display the cars in y direction
        y = height - allPlayers[plr].distance;
        //console.log(y);
        swimmers[index-1].x = x;
        swimmers[index-1].y = y;
        //console.log(allPlayers);
        if (index === player.index){
        //  swimmers[index - 1].shapeColor = "red";
          camera.position.x = width/2;
          camera.position.y = swimmers[index - 1].y;
        }
          push();
          fill(allPlayers[plr].look);  
          ellipse(swimmers[index-1].x, swimmers[index-1].y, 70, 120);
          pop();
         /* fill(allPlayers[plr].look); 
          ellipse(swimmer2.x, swimmer2.y, 70, 120);
          fill(allPlayers[plr].look); 
          ellipse(swimmer3.x, swimmer3.y, 70, 120);*/
          

         
           // cars[index - 1].debug = true;
            
            
          
            
      // }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        x += 400;

        if(swimmer1.isTouching(laneLine1)||swimmer1.isTouching(laneLine2)||swimmer1.isTouching(laneLine3)){
          swimmer1.x=swimmers[index-1].x;
        }
        if(swimmer2.isTouching(laneLine1)||swimmer2.isTouching(laneLine2)||swimmer2.isTouching(laneLine3)){
          swimmer2.x=swimmers[index-1].x;
        }
        if(swimmer3.isTouching(laneLine1)||swimmer3.isTouching(laneLine2)||swimmer3.isTouching(laneLine3)){
          swimmer3.x=swimmers[index-1].x;
        }

      }

    }
// add touches

    if((keyIsDown(UP_ARROW)||touches.length>0) && player.index !== null && gameState!==2){
        player.distance += 10;
      player.update();
      touches=[];
    }
    if(keyIsDown(RIGHT_ARROW)&& player.index !== null && gameState!==2){
      swimmers[index-1].x += 2;
    player.update();
    touches=[];
  }
  if(keyIsDown(LEFT_ARROW)&& player.index !== null && gameState!==2){
    swimmers[index-1].x -= 2;
  player.update();
  touches=[];
}

      if (player.distance > 4400) {
          gameState = 2;
          player.rank += 1;
          Player.updateWinner(player.rank);
      }
     
  }
    end() {
        //console.log("game is over");
        //console.log(player.rank);
    }
}
