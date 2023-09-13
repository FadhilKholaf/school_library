const borrowModel = require('../models/index').borrow
const detailsOfBorrowModel = require('../models/index').details_of_borrow
const Op = require('sequelize').Op

exports.addBorrow = async (req,res) =>{
    let newData = {
        memberID: req.body.memberID,
        adminID: req.body.adminID,
        date_of_borrow: req.body.date_of_borrow,
        date_of_return: req.body.date_of_return,
        status: req.body.status
    }
    borrowModel.create(newData)
    .then(result=>{
        let borrowID = result.id
        let detailsOfBorrow = req.body.details_of_borrow
        for (let i = 0; i < detailsOfBorrow.length;i++){
            detailsOfBorrow[i].borrowID = borrowID
        }
        detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
        .then(result=>{
            return res.json({
                success:true,
                message:"New book borrowed has been inserted"
            })
        })
        .catch(error=>{
            return res.json({
                success:false,
                message: error.message
            })
        })
    })
    .catch(error=>{
        return res.json({
            success:false,
            message:error.message
        })
    })
}
exports.updateBorrowing = async (req,res)=>{
    let newData = {
        memberID: req.body.memberID,
        adminID: req.body.adminID,
        date_of_borrow: req.body.date_of_borrow,
        date_of_return: req.body.date_of_return,
        status: req.body.status
    }
    let borrowID = req.params.id
    borrowModel.update(newData,{where:{id:borrowID}})
    .then(async result=>{
        await detailsOfBorrowModel.destroy({where:{borrowID:borrowID}})
        let detailsOfBorrow = req.body.details_of_borrow
        for(let i = 0;i<detailsOfBorrow.length;i++){
            detailsOfBorrow[i].borrowID = borrowID
        }
        detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
        .then(result=>{
            return res.json({
                success:true,
                message:"book borrowed has been updated"
            })
        })
        .catch(error=>{
            return res.json({
                success:false,
                message:error.message
            })
        })
    })
    .catch(error=>{
        return res.json({
            success:false,
            message:error.message
        })
    })
}
exports.deleteBorrowing= async(req,res)=>{
    let borrowID = req.params.id
    detailsOfBorrowModel.destroy({where:{borrowID:borrowID}})
    .then(result=>{
        borrowModel.destroy({where:{id:borrowID}})
        .then(result=>{
            return res.json({
                success:true,
                message:"borrowing book has been deleted"
            })
        })
        .catch(error=>{
            return res.json({
                success:false,
                message:error.message
            })
        })
    })
    .catch(error=>{
        return res.json({
            success:false,
            message:error.message
        })
    })
}
exports.returnBook = async(req,res)=>{
    let borrowID = req.params.id
    let today = new Date();
    let currentDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    borrowModel.update(
        {
            date_of_return:currentDate,
            status:true
        },
        {
            where:{id:borrowID}
        }
    )
    .then(result=>{
        return res.json({
            success:true,
            message:"book has been returned"
        })
    })
    .catch(error=>{
        return res.json({
            success:false,
            message:error.message
        })
    })
}
exports.getBorrow = async(req,res)=>{
    let data = await borrowModel.findAll(
        {
            include:[
                "member","admin",
                {
                    model: detailsOfBorrowModel,
                    as:"details_of_borrow",
                    include:["book"]
                }
            ]
        }
    )
    return res.json({
        success:true,
        data:data,
        message:"all borrowing book have been loaded"
    })
}