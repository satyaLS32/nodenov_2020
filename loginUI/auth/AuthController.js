/*var express = require('express')
var router = express.Router()

var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../config')
var User = require('../user/User')
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.post('/register',(req,res)=>{
    const hashedPassword = bcrypt.hashSync(req.body.password,8)

    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    },(err,user)=>{
        if(err) return res.status(500).send('error while register')
        //res.send('registered successfully')
        var message = encodeURIComponent('Sucessfully register please login now')
        res.redirect('/?msg='+message)
    })
})

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(401).send('problem while login')
        if(!user){
            //res.send('user does not exists')
            var message = encodeURIComponent('user does not exists')
            res.redirect('/?msg='+message)
        }else{
            var passwordIsVaild = bcrypt.compareSync(req.body.password,user.password)
            if(!passwordIsVaild){
                //res.send('enter correct password')
                var message = encodeURIComponent('enter correct password')
                res.redirect('/?msg='+message)
            }else{
                var token = jwt.sign({id:user._id},config.secert,{
                    expiresIn:86400//24hrs
                })
                localStorage.setItem('authToken',token)
                res.redirect('/users/profile')

               // res.send({auth:true,token:token})
            }
        }

    })
})


router.get('/getUser',(req,res)=>{
    var token = req.headers['x-access-token'];
    if(!token)
    res.status(401).send({auth:false,message:'no token provided'})

    jwt.verify(token,config.secert,(err,decode)=>{
        if(err)
        res.status(401).send({auth:false,message:'Invalid token'})
        User.findById(decode.id,{password:0},(err,user)=>{
            if(err)res.status(500).send('problem in finding user')
            if(!user)
            res.status(500).send('no user found')
            res.send(user)

        })
    })
})


router.get('/users',(req,res)=>{
    User.find({},(err,user)=>{
        if(err) return res.status(500).send('error while fetching')
        res.send(user)
   

    })
})


 module.exports = router; */

 const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../user/User');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.post('/register', (req,res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password,8);

    User.create({
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword
    },(err,user) => {
        if(err) return res.status(500).send('Problem while register');
        //res.send('Registration successfull')
        const messsage = encodeURIComponent('Succesfully register Please login now')
        res.redirect('/?msg='+messsage)
    });
});

router.post('/login', (req,res) => {
    User.findOne({email:req.body.email}, (err,user) => {
        if(err) return res.status(401).send('Problem while login');
        if(!user){
            const messsage = encodeURIComponent('User Does not exist')
            res.redirect('/?msg='+messsage)
        }else{
            const passwordIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passwordIsValid) {
                const messsage = encodeURIComponent('Enter Correct password')
                res.redirect('/?msg='+messsage)
            }
            else{
                var token = jwt.sign({id:user._id}, config.secert, {
                    expiresIn: 86400 //24 hours
                });
                localStorage.setItem('authToken', token)
                res.redirect('/users/profile')
            }
        }
    });
});

router.get('/getUser', (req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.status(401).send({auth:false,message:'No Token Provided'});

    jwt.verify(token,config.secert,(err,decode) => {
        if(err) res.status(401).send({auth:false,message:'Invalid Token'});
        User.findById(decode.id,{password:0},(err,user) => {
            if(err) res.status(500).send('Problem finding user');
            if(!user) res.status(500).send('No User found');
            res.send(user)
        })
    } )
})


router.get('/users', (req,res) => {
    User.find({},(err,user) => {
        if(err) return res.status(500).send('Error while fetching user');
        res.send(user)
    });
});


module.exports = router;
