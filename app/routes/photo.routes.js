
const controller = require("../controllers/photo.controller");

module.exports = function (app) {
  
    // Route for photo upload
    app.post("/api/photo/upload", controller.uploadPhoto)
   
}