describe('Blog app', function() {
  beforeEach(function() {
    // create new user
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'rushy',
      username: 'rushy',
      password: 'rushy'
    }
    cy.request('POST', 'http://localhost:3003/api/auth/register/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Blog app, wusaby-rush 2022')
  })

  it('login form is shown', function() {
    cy.contains('login')
  })

  it('user can login', function() {
    cy.visit('http://localhost:3000')
    cy.contains(/login/)
    cy.get('input:first').type('rushy')
    cy.get('input:nth(1)').type('rushy')
    cy.get('input:last').click()
  })

  it('login fails with wrong credinteals', function() {
    cy.contains('login').click()
    cy.get('input:first').type('mluukkai')
    cy.get('input:nth(1)').type('wrong')
    cy.get('input:last').click()

    // and is alternative to use should more than one in multiple lines
    cy.get('.error')
      // should like use contains directly but have more options
      .should('contain', 'wrong username or password')
      // color should be rgb in cypress
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      // some css props like `border-style` fails in firefox
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.visit('http://localhost:3000')
      // cy.get('input:first').type('rushy')
      // cy.get('input:nth(1)').type('rushy')
      // cy.get('input:last').click()
      // fully test the login flow but only once (cypress rule)
      cy.request('POST', 'http://localhost:3000/api/auth/login', {
        username: 'rushy', password: 'rushy'
      }).then(response => {
        localStorage.setItem('loggedBlogsappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input:first').type('test blog')
      cy.get('input:nth(1)').type('test author')
      cy.get('input:nth(2)').type('test url')
      cy.get('input:last').click()
      cy.wait(10000)
      cy.contains('test blog')
    })

    describe('and a blog exists', function() {
      let random = Math.floor(Math.random() * 1000)
      beforeEach(function() {
        // fully test any code flow only once (same above cypress rule)
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: { title:`test title ${random}`, author: 'test author', url: 'test-url' },
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsappUser')).token}`
          }
        })

        cy.visit('http://localhost:3000')
      })

      it('it can be liked', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.wait(10000)
        cy.contains('1 likes')
      })

      it('it can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.wait(10000)
        // check if elment doesnt exist
        cy.get('html').should('not.contain', `test blog ${random}`)
      })

      it('it can not be deleted by another user', function() {
        cy.request('POST', 'http://localhost:3003/api/auth/register/', {
          name: 'another user',
          username: 'another user',
          password: 'another user'
        })
        cy.request('POST', 'http://localhost:3000/api/auth/login', {
          username: 'another user', password: 'another user'
        }).then(response => {
          localStorage.setItem('loggedBlogsappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })

        cy.contains('view').click()
        cy.contains('remove').click()
        cy.wait(10000)
        // check if elment doesnt exist
        cy.get('html').should('not.contain', `test blog ${random}`)
      })

      it('blogs are ordered by likes', function() {
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: { title:`test title ${random}`, author: 'test author', url: 'test-url', likes: 10 },
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsappUser')).token}`
          }
        })

        cy.visit('http://localhost:3000')
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('view').click()
          cy.wrap(blogs[0]).contains('10 likes')
          cy.wrap(blogs[1]).contains('view').click()
          cy.wrap(blogs[1]).contains('0 likes')
        })
      })
    })
  })
})
