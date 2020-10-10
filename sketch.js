var database;
var dog,dogIMG,dogIMG2;
var foodS,foodStock;
var feed,feedDog,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  dogIMG = loadImage("images/dogImg.png");
  dogIMG2 = loadImage("images/dogImg1.png");
}

function setup() {
	var canvas = createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,250,20,20);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the Dog");
  feed.position(670,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(770,95)
  addFood.mousePressed(addFood);
}


function draw() {  
background(46, 139, 87);

if(lastFed >12) {
text("Last Feed : " +lastFed%12 + "PM", 350,30);

}else if(lastFed == 0){
  text("Last Feed : 12 AM",350,30);

}else {
  text("Last Feed :" +lastFed +"AM",350,30);
}


  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,180,150);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed DOG Milk!",130,10,300,20);
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
   
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val
})

}


function feedDog() {
  dog.addImage(dogIMG2);

  foodObj.updateFoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
      
     Food:foodObj.getFoodSock(),
     Foodtime:hour()
       
    })

  }

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  
  })

}