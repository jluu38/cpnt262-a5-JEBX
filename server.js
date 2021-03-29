const mongoose = require('./_connection')

const dotenv = require('dotenv').config()
const express = require('express')
const apiS = require('./routes/api/apiSubscribers')
const index = require('./routes/index')
const sub = require('./routes/subscribed')

//Xia Lin
const apiM = require('./routes/api/apiMember')
const members = require('./routes/members')

// Recipe Generator
const apiRecipeGen = require("./routes/api/apiIngr")
const recipe =  require("./routes/reciperoute")

// const admin = require('./routes/admin')
// const gallery = require('./routes/gallery')


const app = express()

app.set('view engine', 'ejs');
app.use(express.static('./public'))

app.use('/api/v0', apiS)
app.use('/subscribed', sub)

//Xia Lin
app.use('/api/v0', apiM)
app.use('/members',members)

// Recipe Generator
app.use("/api/v0", apiRecipeGen)
app.use("/recipegenerator", recipe)

app.use('/', index)

app.use(function(err, req, res, next){
  res.sendStatus(500);
  res.render('/500');
});

process.on('uncaughtException', function (err) {
  console.log('-------------------------- Caught exception: ' + err);
    app.use(function(err, req, res, next){
        res.render('/500');
    });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log('Listening on port: ' + PORT)
})