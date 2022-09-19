const listHelper = require('../utils/list_helper')
describe('most blogs', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f9',
        title: 'blog title',
        author: 'blog author',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f7',
        title: "anothe from this author",
        author: "Edsger W. Dijkstra",
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0
      }
    ]
  
    test('most blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        blogs: 2
      })
    })
  })