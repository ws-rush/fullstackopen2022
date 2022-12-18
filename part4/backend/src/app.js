const app = require('express').Router()

app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

module.exports = app
