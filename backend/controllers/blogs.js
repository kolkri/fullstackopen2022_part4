const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
      response.json(blogs)
    })
})

notesRouter.post('/', (request, response, next) => {
    const body = request.body
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0
    })
  
    blog.save()
      .then(savedBlog => {
        response.json(savedBlog)
      })
      .catch(error => next(error))
})

module.exports = notesRouter