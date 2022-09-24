const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'HTML is easy'
    )
  })
  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  describe('viewing s specific blog', () => {
    test('a specific blog can be reviewed', async () => {
        const blogsAtStart = await helper.blogsInDatabase()
        const blogToView = blogsAtStart[0]
        const resultBlog = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
        
        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
        expect(resultBlog.body).toEqual(processedBlogToView)
    })
    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })
    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })
  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
          title: 'new blog',
          author: 'new author',
          url: 'https://google.com'
        }
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      
        const blogsAtEnd = await helper.blogsInDatabase()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      
        const titles = blogsAtEnd.map(r => r.title)
        expect(titles).toContain(
          'new blog'
        )
    })
    test('fails with status code 400 if data invalid', async () => {
      const newBlog = {
        author: 'author',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDatabase()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    test('if the likes property is missing from the request, it will default to the value 0', async ()=> {
      const newBlog = {
        title: 'test_title',
        author: 'test_author',
        url: 'https://google.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDatabase()
      expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })
  })
  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDatabase()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDatabase()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })
  describe('edition of a blog', () => {
    test('likes can be updated', async () => {
      const blogsAtStart = await helper.blogsInDatabase()
      const blogToUpdate = blogsAtStart[0]
      const updatedBlog = {
        likes: 50
      }
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(201)
        
      const blogsAtEnd = await helper.blogsInDatabase()
      expect(blogsAtEnd[0].likes).toBe(50)
    })
  })

})




afterAll(() => {
  mongoose.connection.close()
})