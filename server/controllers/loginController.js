const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

exports.login = async (req,res)=>{

    const locals = {
        title: 'Sign In'
    }

    res.render('item/login',locals)
}

exports.register = async (req,res)=>{

    const locals = {
        title: 'Sign Up'
    }

    res.render('item/register',locals)
}

exports.userregister = async (req,res)=>{
    console.log(req.body)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
        await User.create(newUser)
        res.redirect('/')
    }catch(error){
        console.log(error)
    }
}

exports.userlogin = (req, res) => {
    const {email, password} = req.body 
    User.findOne({ email: email }).then((user) => {
        console.log(user)
        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id
                    res.redirect('/')
                    console.log("login success")
                } else {
                    res.redirect('/login')
                    console.log("login fail")
                }
            })
        } 
    })
}

