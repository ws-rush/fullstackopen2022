const Blog = require('../models/blog.model')

// initial blogs with diffrent content for every one
const initialBlogs = [
  {
    title: 'test your express applications',
    author: 'test',
    url: 'test',
    likes: 0
  },
  {
    title: 'Marvel vs DC',
    author: 'comics boy',
    url: 'comics',
    likes: 1
  },
  {
    title: 'test your react applications',
    author: 'test',
    url: 'test-react',
    likes: 2
  },
  {
    title: 'test your angular applications',
    author: 'test',
    url: 'test-angular',
    likes: 3
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'test', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
