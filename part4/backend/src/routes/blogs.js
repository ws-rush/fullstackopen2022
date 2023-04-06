const blogRouter = require('express').Router()
const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const Comment = require('../models/comment.model')
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

blogRouter.get('/:id/comments', async (req, res) => {
  // get all blog comments
  const blog = await Blog.findById(req.params.id).populate('comments', {
    content: 1
  })
  if (blog) {
    res.json(blog.comments)
  } else {
    res.status(404).end()
  }
})

blogRouter.use(userExtractor)

blogRouter.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  // find a user by id
  const user = await User.findById(req.user)
  const blog = await Blog.create({ ...req.body, user: req.user })
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  res.status(201).json(blog)
})

blogRouter.post('/:id/comments', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  // write code to add comment for comments collection
  // then link it to the blog
  const comment = await Comment.create({ ...req.body, user: req.user })
  const blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(comment._id)
  await blog.save()
  res.status(201).json(comment)
})

blogRouter.put('/:id', async (req, res) => {
  const blogToUpdate = await Blog.findById(req.params.id)
  if (!blogToUpdate) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blogToUpdate.user && blogToUpdate.user.toString() !== req.user) {
    return res.status(401).json({ error: 'unauthorized' })
  }

  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  })
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
