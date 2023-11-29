//Tests do not start from the state where the previous tests ended.

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Alex',
      username: 'Alex',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
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
  })


  describe('when logged in', function() {
    //need to log in first because each test starts from zero

    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('Alex')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
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
        cy.contains('new blog').click()
        cy.get('#title').type('First class tests')
        cy.get('#author').type('Robert C. Martin')
        cy.get('#url').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')

        cy.contains('Create').click()
      })

      it('can increase the number of likes', function () {

        cy.contains('First class tests')
        cy.contains('view').click()
        cy.contains('Likes: 0')
        cy.contains('like').click()
        cy.contains('Likes: 1')
      })
    })
  })
})