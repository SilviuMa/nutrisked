/** server/controllers/user.ctrl.js*/
const Schedule = require('./../models/Schedule')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    /**
     * article_id
     */
    getUserInfo: (req, res, next) => {
        let user = User.findById(req.params.id);

        ['monday',
         'tuesday',
         'wednesday',
         'thursday',
         'friday',
         'saturday',
         'sunday'].forEach(dOW => {
            user.populate('schedule.' + dOW);            
        });

        user.exec((err, user)=> {
            if (err)
                res.send(err)
            else if (!user)
                res.send(404)
            else
                res.send(user)
            next()            
        });
    },
    addScheduleToUser: (req, res, next) => {
        User.findById(req.body.user_id).then(user => {
            return user.AddScheduleToUser( req.body.day_of_week, 
                                            req.body.schedule_id )
                    .then(() => {
                                  return res.json({msg: "Done"})
                                })
            }).catch(next);
    },
    removeScheduleFromUser: (req, res, next) => {
        User.findById(req.body.user_id).then(user => {
            return user.RemoveScheduleFromUser( req.body.day_of_week )
                    .then(() => {
                                  return res.json({msg: "Done"})
                                })
            }).catch(next);
    }
}