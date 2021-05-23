class Food{
    constructor(){
        this.image = loadImage("images/Milk.png")  
        this.foodStock = 0
        this.lastfed
    }

    getFoodStock(){
        return this.foodStock
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock-=1
        }
    }

    display(){
        image(this.image, 600, 185, 100, 100)

        var x = 80, y = 60
        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 === 0){
                    x = 80; y+=50
                }
                image(this.image, x, y, 50, 50)
                x+=30
            }
        }
    }
}