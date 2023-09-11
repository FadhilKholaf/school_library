const express = require('express')
const app = express()
app.use(express.json())
const adminController = require('../controllers/admin.controller')
app.get("/", adminController.getAllAdmin)
app.post("/", adminController.addAdmin)
app.post("/find", adminController.findAdmin)
module.exports = app