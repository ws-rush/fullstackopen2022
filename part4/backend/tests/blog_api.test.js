const mongoose = require('mongoose')
const supertest = require('supertest')
const server = require('../src/index')
const helper = require('./test_helper')
const Blog = require('../src/models/blog.model')
const api = supertest(server)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)

describe('when there is initially some blogs saved', () => {
  // check if response type is json
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  // check of all blogs are returned
  test('there are four blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  // check if spesfic blog can be viewed
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  }, 100000)

  // check if first blog is the same as the first blog in initialBlogs
  test('the first blog is the same', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe(helper.initialBlogs[0].title)
  }, 100000)

  // check if response contains a specific blog
  test('the response contains a specific blog', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Marvel vs DC')
  }, 100000)

  // check if id is defined
  test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 100000)

  // check if like is 0 if not defined
  test('like is 0 if not defined', async () => {
    const newBlog = {
      title: 'test your node applications',
      author: 'test',
      url: 'test-node'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[4].likes).toBe(0)
  }, 100000)

  // check if status is 404 if blog does not exist
  test('status is 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  // faield with 400 if id is invalid
  test('status is 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  // check if valid blog can be added
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'test your node applications',
      author: 'test',
      url: 'test-node',
      likes: 4
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('test your node applications')
  }, 100000)

  // check if blog without title or url cant be added
  test('blog without title cant be added', async () => {
    const newBlog = {
      author: 'test',
      likes: 4
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe('update of a blog', () => {
  // check if blog can be updated
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      title: 'Marvel vs DC',
      author: 'comics boy',
      url: 'comics',
      likes: 100
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(100)
  }, 100000)
})

describe('deletion of a blog', () => {
  // check if blog can be deleted
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})
