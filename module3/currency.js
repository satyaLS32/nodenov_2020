var express = require('express');
var app= express();
var port = 2300;
var request = require('request');

var apiKey = 'http://api.currencylayer.com/live?access_key=38e1711f119236855f474af6cd0fac29'

app.get('/currency',(req,res)=>{
    request(apiKey,(err,response)=>{
        if(err) throw err
        res.send(response.body)
        
    })
})

app.listen(port,(err)=>{
    if(err) throw err
    else
    console.log(`server is running on port ${port}`)

})
/*    38e1711f119236855f474af6cd0fac29
    */