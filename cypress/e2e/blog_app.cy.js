describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user1 = {
      name: 'Alex',
      username: 'Alex',
      password: 'secret'
    }
    const user2 = {
      name: 'Anna',
      username: 'Anna',
      password: 'secret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })


  describe('when not logged in', function() {
    it('front page can be opened', function() {
      cy.contains('Blogs')
    })

    it('login form can be opened', function() {
      cy.contains('log in').click()
    })

    it('user can log in', function() {
      cy.contains('log in').click()
      cy.get('#username').type('Alex')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Alex logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('log in').click()
      cy.get('#username').type('Alex')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials')
      cy.get('.error').contains('Wrong credentials')
      //Cypress requires the colors to be given as rgb.
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Alex logged in')
      cy.contains('Alex logged in').should('not.exist')
    })
  })

  describe('when logged in', function() {
    //need to log in first because each test starts from zero

    beforeEach(function() {
      cy.login({ username: 'Alex', password: 'secret' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('First class tests')
      cy.get('#author').type('Robert C. Martin')
      cy.get('#url').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')

      cy.contains('Create').click()

      cy.contains('First class tests')
      cy.contains('Robert C. Martin')
    })

    describe('a blog exist', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
        })
      })

      it('can increase the number of likes', function () {

        cy.contains('First class tests')
          .contains('view').click()
        cy.contains('Likes: 0')
          .contains('like').click()
        cy.contains('Likes: 1')
      })
    })

    describe('several blogs exist', function () {
      beforeEach(function () {
        // cy.login({ username: 'Alex', password: 'secret' })
        cy.createBlog({ title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html' })
        cy.createBlog({ title: 'Second class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html' })
        cy.createBlog({ title: 'Third class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html' })
      })

      it('can increase the number of likes of a specific blog', function () {

        cy.contains('Second class tests').parent('div').as('secondBlog')

        cy.contains('First class tests').find('button').click()
        cy.contains('Second class tests').find('button').click()

        cy.get('@secondBlog').contains(/Likes: 0/)
        cy.get('@secondBlog').contains('like').click()
        cy.get('@secondBlog').contains(/Likes: 1/)
        cy.get('@secondBlog').contains('like').click()
        cy.get('@secondBlog').contains(/Likes: 2/)
      })

      describe('delete blogs', function () {

        it('the user who created a blog can delete it', function() {
          cy.contains('Second class tests').parent('div').as('secondBlog')
          cy.contains('Second class tests').find('button').click()
          cy.get('@secondBlog').contains('remove').click()
          cy.get('html').should('not.contain', 'Second class tests')
        })

        it('only the creator can see the delete button of a blog', function() {

          cy.contains('Log out').click()
          cy.login({ username: 'Anna', password: 'secret' })
          cy.contains('Anna logged in')

          cy.contains('Second class tests').parent('div').as('secondBlog')
          cy.contains('Second class tests').find('button').click()
          cy.get('@secondBlog').contains('Alex')
          cy.get('@secondBlog').should('not.contain', 'Anna')
          cy.get('@secondBlog').should('not.contain', 'remove')
        })
      })
    })
  })
})