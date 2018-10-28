// server/models/Article.js
const mongoose = require('mongoose')

let SchedulePerDaySchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        items: [
            {
                food_item_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'FoodItem'
                },
                count: Number
            }
        ]
    }
);

SchedulePerDaySchema.methods.AddFoodItem = function(food_item_id, item_count) {
    var foodItem = this.items.find(x => x.food_item_id == food_item_id);

    if( foodItem ) {
        foodItem.count =+ item_count || 1;
    } else {
        this.items.push({
            food_item_id : food_item_id,
            count        : item_count
        });
    }

    return this.save();
}

SchedulePerDaySchema.methods.ReduceFoodItem = function(food_item_id, item_count) {
    var foodItem = this.items.find( x => { x.food_item_id == food_item_id } );

    if( foodItem ) {
        if( foodItem.count > item_count ) {
            foodItem.count =- item_count;
        } else {
            let filtered = foodItem.items.filter( x => { 
                                                        if ( x.food_item_id != food_item_id ) {
                                                            return x;
                                                        }
                                                });   
            foodItem.items = filtered;
        }
    }

    return this.save();
}

SchedulePerDaySchema.methods.UpdateSchedule = function(newItems) {
    this.items = newItems;

    return this.save();
}

export default mongoose.model('SchedulePerDay', SchedulePerDaySchema);