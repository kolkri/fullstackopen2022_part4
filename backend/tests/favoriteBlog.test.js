const listHelper = require('../utils/list_helper')
describe('favorite blog', () => {
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
      }
    ]
  
    test('favotire blog', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
    })
  })