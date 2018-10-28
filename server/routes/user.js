// server/routes/article.js
const usercontroller = require('./../controllers/user.ctrl')
const multipart = require('connect-multiparty')
const multipartWare = multipart()
module.exports = (router) => {
    router
        .route('/user')
        .get(usercontroller.getUserInfo)
    router
        .route('/user/addSchedule')
        .post(usercontroller.addScheduleToUser)
    router
        .route('/user/removeSchedule')
        .post(usercontroller.removeScheduleFromUser)
}