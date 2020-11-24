describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
          name: 'Testi',
          username: 'testi',
          password: 'testi'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()

      cy.contains('Testi logged in')
    })

    it('Login fails with false password', function() {
      cy.contains('Login').click()
      cy.get('#username').type('testi')
      cy.get('#password').type('vaara')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })