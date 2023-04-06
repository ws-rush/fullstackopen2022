const userRouter = require('express').Router()
const User = require('../models/user.model')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1
  })
  res.json(users)
})

userRouter.get('/:id', async (req, res) => {
  // get user by id with all blogs directly populated
  const user = await User.findById(req.params.id).populate('blogs', {
    url: 1,
    title: 1
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = userRouter
