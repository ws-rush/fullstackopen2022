const blogRouter = require('express').Router()
const Blog = require('../models/blog.model')
const User = require('../models/user.model')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  const user = await User.findById(req.user)
  const blog = await Blog.create({
    title,
    author,
    url,
    likes,
    user: user._id
  })
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  res.status(201).json(blog)
})

blogRouter.put('/:id', async (req, res) => {
  const user = await User.findById(req.user)
  if (user.blogs.includes(req.params.id)) {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' })
    res.json(blog)
  }
  res.status(401).json({ error: 'unauthorized' })
})

blogRouter.delete('/:id', async (req, res) => {
  const user = await User.findById(req.user)
  if (user.blogs.includes(req.params.id)) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
  res.status(401).json({ error: 'unauthorized' })
})

module.exports = blogRouter
