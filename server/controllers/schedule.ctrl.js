/** server/controllers/schedule.ctrl.js*/
const Schedule = require('./../models/Schedule')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    reduceFoodItem: (req, res, next) => {
        Schedule.findById(req.body.sched_id).then(
            schedule => {
                return schedule.ReduceFoodItem(req.body.food_item_id,
                                               req.body.count)
                .then(() => {
                    return res.json({msg: "Done"})
                })
            }).catch(next);
    },
    addFoodItem: (req, res, next) => {
        Schedule.findById(req.body.sched_id).then(
            schedule => {
                return schedule.AddFoodItem(req.body.food_item_id,
                                               req.body.count)
                .then(() => {
                    return res.json({msg: "Done"})
                })
            }).catch(next);
    },
    updateSchedule: (req, res, next) => {
        Schedule.findById(req.body.sched_id).then(
            schedule => {
                return schedule.UpdateSchedule(req.body.items)
                .then(() => {
                    return res.json({msg: "Done"})
                })
            }).catch(next);
    },
    getSchedulesForUserID: (req, res, next) => {
        Schedule.find({user_id : req.body.sched_id},
                                    null,
                                    null,
                                    function (err, docs) {
            res.send(docs)  
        }).catch(next);
    },
    
}