var dog, happyDog;
var database;
var foodS, foodStock;
var feed, addFood, fedTime, lastFed
var foodObj

function preload() {
  dogImg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(900, 400);
  database = firebase.database()

  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

  dog = createSprite(770,220,50,50)
  dog.addImage(dogImg)
  dog.scale = 0.2

  foodObj = new Food()

  feed = createButton("Feed the dog")
  feed.position(770, 66)
  feed.mousePressed(feedDog)

  addFood = createButton("Add food")
  addFood.position(880, 66)
  addFood.mousePressed(addFoods)
}


function draw() {  
  background(46,139,87)
  drawSprites();

  fedTime = database.ref("fedTime")
  fedTime.on("value", function(data){
    lastFed = data.val()
  })

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last fed : "+ lastFed%12 + " PM", 300, 30)
  } else if(lastFed == 0){
    text("Last fed : 12 AM", 300, 30)
  } else{
    text("Last fed : "+ lastFed + " AM", 300, 30)
  }

  foodObj.display()
}

function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food : foodObj.getFoodStock(), 
    fedTime : hour()
  })
}

function addFoods(){
  foodS+=1
  console.log(foodS)
  database.ref("/").update({
    Food : foodS
  })
}