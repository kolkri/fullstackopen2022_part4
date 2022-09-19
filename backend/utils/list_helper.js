const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs[0].likes
}

const favoriteBlog = (blogs) => {
    const favBlog  = blogs.reduce((acc, value) => acc.likes > value.likes ? acc : value)
    const result = {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
    return result
}

const mostBlogs = (blogs) => {
    const authorArray = _.map(blogs,'author')
    const author = _.head(_(authorArray).countBy().entries().maxBy(_.last))
    const countArray = _.countBy(authorArray)
    result = {author: author, blogs: countArray[author]}
    return result
}

const mostLikes = (blogs) => {
    
    let mostLikesAuthor = blogs.reduce((op, {author, likes}) => {
        op[author] = op[author] || 0
        op[author] += likes
        return op
      },{})
    const values = Object.values(mostLikesAuthor);
    const most = Math.max(...values)
    const mostLikedAuthor = Object.keys(mostLikesAuthor).find(key => mostLikesAuthor[key] === most);
    const result = {author: mostLikedAuthor, likes: mostLikesAuthor[mostLikedAuthor]}
    return result
}
  

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }