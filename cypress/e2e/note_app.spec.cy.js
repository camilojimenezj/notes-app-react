describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'camilojj',
      name: 'camilo',
      password: '123'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can login', () => {
    cy.contains('Show login').click()
    cy.get('[placeholder="Username"]').type('camilojj')
    cy.get('[placeholder="Password"]').type('123')
    cy.contains('Login').click()
    cy.contains('New Note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show login').click()
    cy.get('[placeholder="Username"]').type('camilojj')
    cy.get('[placeholder="Password"]').type('wrong-password')
    cy.contains('Login').click()

    cy.get('.error')
      .should('contain', 'Error invalid username or password')
      .should('have.css', 'color', 'rgb(0, 0, 0)')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'camilojj', password: '123' })
    })

    it('a new note can be created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('New Note').click()
      cy.get('input').type(noteContent)
      cy.contains('Save').click()
      cy.contains(noteContent)
    })

    describe('and a note exist', () => {
      beforeEach(() => {
        cy.createNote({ content: 'This is the first note', important: false })
        cy.createNote({ content: 'This is the second note', important: false })
        cy.createNote({ content: 'This is the third note', important: false })
      })

      it('it can be made important', () => {
        cy.contains('This is the second note').as('secondNote')

        cy.get('@secondNote')
          .contains('make important')
          .click()

        cy.get('@secondNote')
          .contains('make not important')
      })
    })
  })
})
