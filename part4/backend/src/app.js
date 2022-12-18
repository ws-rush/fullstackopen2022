const app = require('express').Router()
const { tokenExtractor } = require('./utils/middleware')

app.use('/api/blogs', tokenExtractor, require('./routes/blogs'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

module.exports = app
