describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'MyName',
      username: 'MyUsername',
      password: 'MyPassword'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    const userSecondary = {
      name: 'Secondary User',
      username: 'SecondaryUser',
      password: 'PasswordTwo'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userSecondary)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('MyUsername')
      cy.get('#password').type('MyPassword')
      cy.get('#login-button').click()

      cy.contains('MyName logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('MyUsername')
      cy.get('#password').type('WrongPassword')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'MyName logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'MyUsername', password: 'MyPassword' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blog-title').type('a blog created by cypress')
      cy.get('#blog-author').type('author name')
      cy.get('#blog-url').type('https://example.com')

      cy.get('#create-button').click()
      cy.contains('a blog created by cypress')
      cy.contains('author name')
      cy.contains('view').click()
      cy.contains('https://example.com')
      cy.contains('likes 0')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'my new blog', author: 'author name', url: 'https://example2.com', likes: 0 })
      })

      it('A blog can be liked', function() {
        cy.contains('my new blog')
          .parent()
          .as('blogSelection')

        cy.get('@blogSelection')
          .contains('view')
          .click()

        cy.get('@blogSelection')
          .contains('likes 0')

        cy.get('@blogSelection')
          .contains('like')
          .click()

        cy.get('@blogSelection')
          .contains('likes 1')
      })

      it('The user who created it can delete it', function() {
        cy.contains('my new blog')
          .parent()
          .as('blogSelection')

        cy.get('@blogSelection')
          .contains('view')
          .click()

        cy.get('@blogSelection')
          .contains('remove')
          .click()

        cy.get('html').should('not.contain', 'my new blog')
      })

      it('The user who create it has a delete option', function() {
        cy.contains('my new blog')
          .parent()
          .as('blogSelection')

        cy.get('@blogSelection')
          .contains('view')
          .click()

        cy.get('@blogSelection').contains('remove').should('be.visible')
      })

      it('The user who did not create it does not have a delete option', function() {
        cy.login({ username: 'SecondaryUser', password: 'PasswordTwo' })

        cy.contains('my new blog')
          .parent()
          .as('blogSelection')

        cy.get('@blogSelection')
          .contains('view')
          .click()

        cy.get('@blogSelection').contains('remove').should('not.be.visible')
      })
    })

    describe('and multiple notes exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'The title with the least likes', author: 'author name', url: 'https://example2.com', likes: 11 })
        cy.createBlog({ title: 'The title with the second most likes', author: 'author name', url: 'https://example2.com', likes: 76 })
        cy.createBlog({ title: 'The title with the third most likes', author: 'author name', url: 'https://example2.com', likes: 56 })
        cy.createBlog({ title: 'The title with the most likes', author: 'author name', url: 'https://example2.com', likes: 99 })
        cy.createBlog({ title: 'The title with the fourth most likes', author: 'author name', url: 'https://example2.com', likes: 12 })
      })

      it('Blogs are sorted by number of likes', function() {
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'The title with the third most likes')
        cy.get('.blog').eq(3).should('contain', 'The title with the fourth most likes')
        cy.get('.blog').eq(4).should('contain', 'The title with the least likes')
      })

      it('Blogs are sorted correctly after updated likes', function() {
        cy.contains('The title with the least likes').as('blogSelection')

        cy.get('@blogSelection').contains('view').click()
        cy.get('@blogSelection').contains('like').click()
        cy.get('@blogSelection').contains('like').click()

        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blog').eq(2).should('contain', 'The title with the third most likes')
        cy.get('.blog').eq(3).should('contain', 'The title with the least likes')
        cy.get('.blog').eq(4).should('contain', 'The title with the fourth most likes')
      })
    })
  })
})