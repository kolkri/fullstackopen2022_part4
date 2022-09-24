const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'HTML is easy',
      author: 'Author 1',
      url: 'https://google.com',
      likes: 0,
    },
    {
      title: 'CSS is easy',
      author: 'Author 2',
      url: 'https://google.com',
      likes: 0,
    }
  ]

  const nonExistingId = async () => {
      const blog = new Blog({
          title: 'willremovethissoon',
          url: 'https://google.com'
      })
      await blog.save()
      await blog.remove()
    
      return blog._id.toString
  }

  const blogsInDatabase = async () => {
      const blogs = await Blog.find({})
      return blogs.map(blog => blog.toJSON())
  }

  const usersInDatabase = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  module.exports = {
    initialBlogs, 
    nonExistingId, 
    blogsInDatabase,
    usersInDatabase
  }