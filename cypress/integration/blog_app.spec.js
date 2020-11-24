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

    it('Login from is shown', function() {
      cy.contains('Login').click()
      cy.contains('username')
      cy.contains('password')
    })
  
    describe('Login', function() {
      it('Logging in is possible', function() {
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

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.contains('Login').click()
        cy.get('#username').type('testi')
        cy.get('#password').type('testi')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('testi-blogi')
        cy.get('#author').type('testi-kayttaja')
        cy.get('#url').type('testi-url')
        cy.contains('submit').click()
        cy.contains('Blogin lisääminen onnistui!')
        cy.contains('testi-blogi')
      })
    })
  })