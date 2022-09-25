const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 })
  console.log('Token', request.token)
  response.json(blogs)
})

blogsRouter.post('/',  async (request, response, next) => {
    const body = request.body
    const user = request.user
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if ( blog.user.toString() === user._id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(201).end()
})
module.exports = blogsRouter