/*var express = require('express')
var router = express.Router()
var app = express();
var bodyParser = require('body-parser')
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../config')
var User = require('../user/User')

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

//static file path
app.use(express.static(__dirname+'/public'))
//View files
app.set('views', './views');
//View engine
app.set('view engine', 'ejs');

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.get('/profile',(req,res)=>{
    var token = localStorage.getItem('authToken')
    if(!token){
        var message = encodeURIComponent('Login first for profile page')
        res.redirect('/?msg='+message)
    }
    jwt.verify(token,config.secert,(err,decode)=>{
        if(err){
            var message = encodeURIComponent('invalid token')
            res.redirect('/?msg='+message)
        }
        User.findById(decode.id,{password:0},(err,user)=>{
            var message = encodeURIComponent('Invalid token')
            var message1 = encodeURIComponent('No user found')
           
            if(err){
                res.redirect('/?msg='+message)
                if(!user){
                    res.redirect('/?msg='+message1)
                }
                else{
                    res.render('profile',{user})
                }
            }
            })
        })
    })

module.exports = router; */

const express = require('express');
const router  = express.Router();
const app = express();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../user/User');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static(__dirname+'/public'));

router.get('/signup',(req,res) => {
    res.render('signup')
});

router.get('/profile', (req,res) => {
    var token = localStorage.getItem('authToken');
    console.log(">>>>In Profile>>>>",token)
    if(!token){
        const messsage = encodeURIComponent('Login first for profile page')
        res.redirect('/?msg='+messsage)
    }
    jwt.verify(token,config.secert, (err,decode) => {
        if(err){
            const messsage = encodeURIComponent('Invalid Token')
            res.redirect('/?msg='+messsage)
        }
        User.findById(decode.id, {password:0}, (err,user) => {
            const messsage = encodeURIComponent('Invalid Token')
            const messsage1 = encodeURIComponent('No User found')
            if(err) { res.redirect('/?msg='+messsage)}
            if(!user) {
                res.redirect('/?msg='+messsage1)
            }
            res.render('profile',{user})
        })
    })
});

router.get('/logout', (req,res) => {
    localStorage.removeItem('authToken');
    const messsage = encodeURIComponent('SuccessFully Logout')
    res.redirect('/?msg='+messsage)

})

module.exports = router;




