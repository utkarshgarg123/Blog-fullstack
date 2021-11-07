const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')


mongoose.connect('mongodb://localhost/blog')
app.use(express.urlencoded({extended: false}))

app.set('view engine','ejs')
app.get('/', async (req,res) => {
    article = await Article.find().sort({date: 'desc'})
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

app.listen(5000)