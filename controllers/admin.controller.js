const adminModel = require('../models/index').admin
const Op = require('sequelize').Op
const md5 = require('md5')
exports.getAllAdmin = async (req, res) => {
    let admins = await adminModel.findAll()
    return res.json({
        success: true,
        data: admins,
        message: 'All admins have been loaded'
    })
}
exports.addAdmin = ((req, res) => {
    let newAdmin = {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        username: req.body.username,
        pasword: md5(req.body.pasword)
    }
    adminModel.create(newAdmin)
    .then(result => {
        return res.json({
            success: true,
            data: result,
            message: 'New admin has been insertend'
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
})
exports.findAdmin = async (req, res) => {
    /*let input =  req.body.username*/
    let admins = await adminModel.findAll({
        where: {
            [Op.and]:[
                {username: {[Op.substring]: req.body.username}},
                {pasword: md5(req.body.pasword)}
            ]
        }
    })
    return res.json({
        success: true,
        data: admins,
        message: 'Admins have been loaded'
    })
}