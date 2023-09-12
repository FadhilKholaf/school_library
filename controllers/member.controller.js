const memberModel = require('../models/index').member
const upload = require('./upload-profile').single(`photo`)
const Op = require('sequelize').Op
const path = require('path')
const fs = require('fs')
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
exports.addMember = async (req,res) =>{
    upload(req,res,async error => {
        if(error){
            return res.json({message:error})
        }
        if(!req.file){
            return res.json({message:"nothing to upload"})
        }
        let newMember = {
            name: req.body.name,
            address: req.body.address,
            gender: req.body.gender,
            contact: req.body.contact,
            photo: req.file.filename
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
}
exports.updateMember = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        let id = request.params.id 
        let dataMember = {
            name: request.body.name,
            address: request.body.address,
            gender: request.body.gender,
            contact: request.body.contact
        }
        if (request.file) {
            const selectedMember= await memberModel.findOne({
                where: { id: id}
            })
            const oldProfileMember = selectedMember.photo
            const pathProfile = path.join(__dirname,`./photo`,oldProfileMember)
            if (fs.existsSync (pathProfile)) {
                fs.unlink(pathProfile, error => console.log(error))
            }
            dataMember.photo = request.file.filename
        }
        memberModel.update(dataMember, {where: { id: id } })
            .then(result => {
                return response.json({
                    success: true,
                    data:result,
                    message: "Data book has been updated"
                }) 
            })
            .catch(error => {
                return response.json({
            })
        })
    })
}
exports.deleteMember = async (req,res) =>{
    const id = req.params.id
    const member = await memberModel.findOne({where:{id:id}})
    const oldProfileMember = member.photo
    const pathProfile = path.join(__dirname,`./photo`,oldProfileMember)
    if(fs.existsSync(pathProfile)){
        fs.unlink(pathProfile,error=>console.log(error))
    }
    memberModel.destroy({where:{id:id}})
    .then(result=>{
        return res.json({
            success:true,
            message:"book deleted"
        })
    })
    .catch(error=>{
        return res.json({
            success:false,
            message:error.message
        })
    })
}