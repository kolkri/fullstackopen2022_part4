const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

notesRouter.post('/',  async (request, response, next) => {
    const body = request.body
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

notesRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

notesRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

notesRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(201).end()
})
module.exports = notesRouter