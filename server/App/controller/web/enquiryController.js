const express = require("express");
const enquiryModel = require("../../model/enquiryModel");


let enquiryInsert = (req,res)=>{

    let {name,email,phone,message} = req.body;
    let obj = {name,email,phone,message};
    
    let enquiry = new enquiryModel({
        name,  
        email,
        phone,
        message
    })

    // let checkEmail = enquiryModel.findOne({email});
    // if(checkEmail){
    //     return res.send({
    //         status:404,
    //         Error:"This Email are Already Exist",
    //     })
    // }

    enquiry.save().then(()=>{
        res.send(obj);
    }).catch((err)=>{
        res.send("something went wrong.",err);
    });

}

let enquiryList = async (req,res) => {
    let enquiry = await enquiryModel.find();
    res.send({
        status:1,
        enquiry:enquiry
    })
}

let enquiryDelete = async (req,res)=>{
    
    let deleteId = req.params.id;
    let enquiry = await enquiryModel.deleteOne({_id:deleteId});
    
    res.send({
        status:1,
        message:"Enquiry Delete Successfully",
        enquiry
    })

}

let enquirySingle = async (req,res) => {
    let editId = req.params.id;
    let enquiry = await enquiryModel.findOne({_id:editId})
    res.send({status:1,enquiry});
}

let enquiryUpdate = async (req,res) => {
    let editId = req.params.id;
    let {name,email,phone,message} = req.body;
    let obj = {name,email,phone,message};

    let updateResponce = await enquiryModel.updateOne({_id:editId},obj)
    res.send({status:1,message:"Enquiry Updated",updateResponce})
}

module.exports = {enquiryInsert,enquiryList,enquiryDelete,enquirySingle,enquiryUpdate}