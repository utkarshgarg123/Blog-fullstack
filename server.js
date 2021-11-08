const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb+srv://utkarsh:utkarsh@cluster0.3f8tg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://utkarsh:utkarsh@cluster0.3f8tg.mongodb.net/blogdbinsider?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.use(express.urlencoded({extended: false}))

app.set('view engine','ejs')
app.get('/', async (req,res) => {
    article = await Article.find().sort({date: 'desc'})
    console.log(article)
    // const barticles = [{
    //     title: 'Test Article headline 1',
    //     date: new Date,
    //     description: 'Test description 1'
    // },
    // {
    //     title: 'Test Article headline 2',
    //     date: new Date,
    //     description: 'Test description 2'
    // }]
    res.render('articles/index',{articles: article})
})


app.use('/articles',articleRouter)

app.listen(PORT)