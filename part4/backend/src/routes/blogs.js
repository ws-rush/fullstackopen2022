const blogRouter = require('express').Router()
const Blog = require('../models/blog.model')
const { userExtractor } = require('../utils/middleware')

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

blogRouter.use(userExtractor)

blogRouter.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  const user = req.user
  const blog = await Blog.create({ ...req.body, user: user.id })
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  res.status(201).json(blog)
})

blogRouter.put('/:id', async (req, res) => {
  const blogToUpdate = await Blog.findById(req.params.id)
  if (!blogToUpdate) {
    return res.status(404).json({ error: 'blog not found' })
  }
  
  if (blogToUpdate.user && blogToUpdate.user.toString() !== req.user) {
    
    return res.status(401).json({ error: 'unauthorized' })
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' })
  res.json(blog)
})

blogRouter.delete('/:id', async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id)
  if (!blogToDelete) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== req.user) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogRouter
