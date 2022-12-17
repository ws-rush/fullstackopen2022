const app = require('express').Router()
const Blog = require('./models/blog.model')

app.get('/api/blogs', (req, res) => {
  Blog
    .find()
    .then(blogs => {
      res.json(blogs)
    })
})

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

app.post('/api/blogs', async (req, res, next) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

app.put('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, context: 'query' })
  res.json(blog)
})

app.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = app
