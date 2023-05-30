const app = require('express').Router()

app.use('/api/auth', require('./routes/auth'))
app.use('/api/blogs', require('./routes/blogs'))
app.use('/api/users', require('./routes/users'))

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', require('./routes/testing'))
}

app.get('/health', (req, res) => {
  res.send('I am fine')
})

module.exports = app
