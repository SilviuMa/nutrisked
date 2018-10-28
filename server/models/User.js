// server/models/User.js
const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
    {        
        email: {
          type: String,
          unique: true,
          required: true,
          trim: true
        },
        first_name: {
            type: String,
            required: true,
            trim: true
        },
        last_name: {
            type: String,
            required: true,
            trim: true
        }, 
        password: {
            type: String,
            required: true,
            trim: true
        },   
        title: String,
        height: Number,
        calories_per_day: Number,
        minerals_per_day: Number,
        protein_per_day: Number,
        fiber_per_day: Number,
        schedule: {
            monday: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Schedule'
            },
            tuesday: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Schedule'
            },
            wednesday: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Schedule'
            },
            thursday: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Schedule'
            },
            friday: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Schedule'
            },
            saturday: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Schedule'
            },
            sunday: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Schedule'
            },
        }
    }
);

User.methods.UpdatePerDayNutrient = function(nutrient_name, new_val) {
    this[nutrient_name] = new_val;

    return this.save();
};

User.methods.AddScheduleToUser = function(dOW, sched_id) {
    this.schedule[dOW] = sched_id;

    return this.save();
}

User.methods.RemoveScheduleFromUser = function(dOW) {
    this.schedule[dOW] = null;

    return this.save();
}

export default mongoose.model('User', UserSchema);