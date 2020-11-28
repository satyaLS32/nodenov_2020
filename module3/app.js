//const { response } = require('express');
const express = require('express');
const app = express();
const port = 5700;
var request = require('request');

app.use(express.static(__dirname+'/public'));
app.set('views' ,'./src/views');
app.set('view engine','ejs');

var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=America&mode=Json&units=metric&cnt=10&appid=fbf712a5a83d7305c3cda4ca8fe7ef29'

app.get('/weather',(req,res) =>{
    request(url,(err,response)=>{
    if(err) throw err
       // res.send(response.body)
       var output = JSON.parse(response.body)
       res.render('index',{title:'Weather App',result:output})
})
})

app.listen(port,(err)=>{
    if(err) throw err;
    else
    console.log(`server is running on port ${port}` )
})


//http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29