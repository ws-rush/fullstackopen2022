const userRouter = require('express').Router()
const User = require('../models/user.model')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(users)
})

module.exports = userRouter
