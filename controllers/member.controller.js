const memberModel = require('../models/index').member
const Op = require('sequelize').Op
exports.getAllMember = async (req, res) => {
    let members = await memberModel.findAll()
    return res.json({
        success: true,
        data: members,
        message: 'All members have been loaded'
    })
}
exports.findMember = async (req,res) => {
    let input = req.body.input
    let members = await memberModel.findAll({
        where: {
            [Op.or]:[
                {name: {[Op.substring]: input}},
                {gender: {[Op.substring]: input}},
                {address: {[Op.substring]: input}}
            ]
        }
    })
    return res.json({
        success: true,
        data: members,
        message: 'All members have been loaded'
    })
}
exports.addMember = ((req, res) => {
    let newMember = {
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        contact: req.body.contact
    }
    memberModel.create(newMember)
    .then(result => {
        return res.json({
            success: true,
            data: result,
            message: 'New member has been insertend'
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
})
exports.updateMember = (req, res) => {
    let dataMember = {
        name: req.body.name,
        address: req.body.address,
        gender: req.body.gender,
        contact: req.body.contact
    }
    let idMember = req.params.id
    memberModel.update(dataMember, {where : {id: idMember}})
    .then(result => {
        return res.json({
            success:true,
            message: 'Data memeber has been updated'
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}
exports.deleteMember = (req, res) => {
    let idMember = req.params.id
    memberModel.destroy({where : {id: idMember}})
    .then(result => {
        return res.json({
            success:true,
            message: 'Data memeber has been updated'
        })
    })
    .catch(error => {
        return res.json({
            success: false,
            message: error.message
        })
    })
}