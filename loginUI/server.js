var app = require('./app')
var express = require('express')
var port = 6700;


//static file path
app.use(express.static(__dirname+'/public'))
//View files
app.set('views', './views');
//View engine
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index',{msg:req.query.msg?req.query.msg:''})
})

app.listen(port,() =>{
    console.log(`server is running on port ${port}`)
})