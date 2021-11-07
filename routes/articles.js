const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Article = require('./../models/article')
router.get('/', (req, res) => {
    res.send('I am articles router')
})

router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.get('/:id',async(req,res)=> {
    const article = await Article.findById(req.params.id)
    if(article==null)res.redirect('/')
    // console.log("created........................")
    // console.log(article.title)
    // res.send(req.params.id)
    res.render('articles/show',{article: article})
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    console.log(article)
    console.log(mongoose.connection.readyState)
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('articles/new', { article: article })
    }
})

router.delete('/:id',async(req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/')
})

module.exports = router