const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map((blog) => blog.likes).reduce((acc, cur) => acc + cur, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, cur) => !acc.likes || cur.likes > acc.likes ? cur : acc, {})
}

const mostBlogs = (blogs) => {
    if(blogs.length<=0) return ({})
    const authors = []
    blogs.map(blog => blog.author).forEach(element => {
        const existingElement = authors.find((authorInfo) => authorInfo.author === element)

        if(existingElement) existingElement.blogs++
        else authors.push({author: element, blogs: 1})
    })

    return authors.sort((a,b) => b.blogs - a.blogs)[0]
}

const mostLikes = (blogs) => {
    if(blogs.length<=0) return ({})
    const authors = []
    blogs.forEach(element => {
        const existingElement = authors.find((authorInfo) => authorInfo.author === element.author)

        if(existingElement) existingElement.likes+=element.likes
        else authors.push({author: element.author, likes: element.likes})
    })

    return authors.sort((a,b) => b.likes - a.likes)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}