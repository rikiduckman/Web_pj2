const Item = require('../models/Item')
const mongoose = require('mongoose')


exports.addpage = async (req,res)=>{

    const locals = {
        title: 'Add Product'
    }
    let perPage = 10;
    let page = req.query.page || 1;

    try {
      const item = await Item.aggregate([ { $sort: { createdAt: 1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Item.count();

        res.render('index',{
            locals,
            item,
            current: page,
            pages: Math.ceil(count / perPage)
        })

    } catch(error){
        console.log(error)
    }
}


exports.additem = async (req,res)=>{

    const locals = {
        title: 'Add New Product!'
    }

    res.render('item/add',locals)
}


exports.postitem = async (req,res)=>{
    console.log(req.body)

    const newItem = new Item({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        details: req.body.details,
        img: req.body.img
    })
    try{
        await Item.create(newItem)
        res.redirect('/addpage')
    }catch(error){
        console.log(error)
    }
}

exports.viewitem = async (req, res) => {

    try {
      const item = await Item.findOne({ _id: req.params.id })
  
      const locals = {
        title: "View Product",
      };
  
      res.render('item/view', {
        locals,
        item
      })
  
    } catch (error) {
      console.log(error);
    }
}

exports.edititem = async (req, res) => {

    try {
      const item = await Item.findOne({ _id: req.params.id })
  
      const locals = {
        title: "Edit Product",
      };
  
      res.render('item/edit', {
        locals,
        item
      })
  
    } catch (error) {
      console.log(error);
    }
}

exports.editpost = async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id,{
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        details: req.body.details,
        img: req.body.img,
        updatedAt: Date.now()
    }).where(req.params.id)
    await res.redirect(`/edit/${req.params.id}`)
    
    console.log('redirected')
  } catch (error) {
    console.log(error)
  }
}

exports.deleteitem = async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
    res.redirect("/addpage")
  } catch (error) {
    console.log(error);
  }
}

exports.homepage = async (req,res)=>{
  const item = await Item.findOne({ _id: req.params.id })
  const locals = {
      title: 'Home My Store'
  }
  res.render("item/home",{
    locals,
    item
  })
}