
describe('Testes de login', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('usuario deve logar com sucesso', () => {
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()
    cy.url().should('include', 'dashboard')
  })


  it('Usuario não deve logar', () => {
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('yuasdbudbsau')
    cy.get('#login').click()
    cy.get('#check-login-form > div.v-snack.v-snack--active.v-snack--bottom').should('visible')
  })

  it('Alterar nome Perfil', () => {
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()
    cy.get('#app > div.application--wrap > div.v-card.v-card--flat.v-sheet.theme--light > nav > div > div:nth-child(8) > div > button > div').click()
    cy.get('#app > div.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active.mt-2.arrow-top > div:nth-child(3) > div.tile > a > div.v-list__tile__title').click()
    cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div.flex.card-custom__form.sm8 > form > div:nth-child(1) > div > div.v-input__slot > div > input[type=text]').clear().type('Teste.Signa.Br')
    cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div.flex.card-custom__form.sm8 > div > button.card-custom__actions__button.v-btn.theme--dark > div').click()
    cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div.v-snack.v-snack--active.v-snack--bottom > div > div').should('visible')
  })

  it('Fechar tela perfil', () => {
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()
    cy.get('#app > div.application--wrap > div.v-card.v-card--flat.v-sheet.theme--light > nav > div > div:nth-child(8) > div > button > div').click()
    cy.get('#app > div.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active.mt-2.arrow-top > div:nth-child(3) > div.tile > a > div.v-list__tile__title').click()
    cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div.flex.card-custom__form.sm8 > form > div:nth-child(1) > div > div.v-input__slot > div > input[type=text]').clear().type('Teste.Signa.Br')
    cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div.flex.card-custom__form.sm8 > div > button.card-custom__actions__button.v-btn.theme--dark > div').click()
    cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div.v-snack.v-snack--active.v-snack--bottom > div > div').then(($el) => {
      const msgValida = 'Informações alteradas com sucesso!'
      const formatString = $el.text().split('\n')[1].trim()
      expect(formatString).to.be.eq(msgValida)
    })
    cy.get('#app > div.v-dialog__content.v-dialog__content--active > div > div > div > div.flex.card-custom__form.sm8 > div > button.card-custom__actions__button.v-btn.v-btn--flat.theme--light > div').click()
  })

  it('Logout', () => {
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()
    cy.get('#app > div.application--wrap > div.v-card.v-card--flat.v-sheet.theme--light > nav > div > div:nth-child(8) > div > button > div > div').click()
    cy.get('#app > div.v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active.mt-2.arrow-top > div:nth-child(3) > div:nth-child(2) > a > div.v-list__tile__title').click()
    //cy.visit('https://app.ecargoasp.com.br/dashboard/')
    cy.url().should('include', 'https://app.ecargoasp.com.br/')
  })
  //-------------------------------------------------------------------------------------
  it('teste frame', () => {
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()

    cy.get('#app > div.application--wrap > div.v-card.v-card--flat.v-sheet.theme--light > aside > nav > div > div > div > div').type('perfil')
    cy.contains('Ger. Usuários').click()
    cy.contains('Perfil de Grupo').click()

    cy.wait(2000)
    cy.get('#frame').then($iframe => {
      const $body = $iframe.contents().find('body')
      cy.get($body).as('iframe')
      return cy.get($body[0]).as('iframe')
    })

    /*
    cy.get('@iframe').find('#searchInput').type('teste')
    cy.get('@iframe').find('')
    */

    cy.wait(1000)
    cy.get('@iframe').find('#mainHome > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections').click()
    cy.get('@iframe').contains('ADMINISTRADOR').click()

    cy.wait(1000)
    cy.get('@iframe').find('#mainHome > div:nth-child(2) > div > div > div.flex.my-0.lg3.sm12.xs12 > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections').click()
    cy.get('@iframe').contains('Celular').click()

    cy.get('@iframe').find('#searchInput').type('CEL - Aceite Coleta')
    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.flex.lg12.md12 > div.flex > div > div.v-table__overflow > table > tbody > tr > td:nth-child(2) > div > div > div > div > div').click()
    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.layout.wrap > button.v-btn.v-btn--flat.theme--light.btn-gravar.btn-style > div').click()

    cy.get('@iframe').find('.v-snack__content').then(($el) => {
      const msgValida = 'Permissões foram gravadas com sucesso.'
      const formatString = $el.text().split('\n')[1].trim()
      expect(formatString).to.be.eq(msgValida)
    })

  })
  //-------------------------------------------------------------------------------------
  it('Preenchimento de Combos', () => {
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()

    cy.get('#app > div.application--wrap > div.v-card.v-card--flat.v-sheet.theme--light > aside > nav > div > div > div > div').type('perfil')
    cy.contains('Ger. Usuários').click()
    cy.contains('Perfil de Grupo').click()

    cy.wait(1000)
    cy.get('#frame').then($iframe => {
      const $body = $iframe.contents().find('body')
      cy.get($body).as('iframe')
      return cy.get($body[0]).as('iframe')
    })

    /*
    cy.get('@iframe').find('#searchInput').type('teste')
    cy.get('@iframe').find('')
    */

    cy.wait(1000)
    cy.get('@iframe').find('#mainHome > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections').click()
    cy.get('@iframe').contains('ADMINISTRADOR').click()

    cy.wait(1000)
    cy.get('@iframe').find('#mainHome > div:nth-child(2) > div > div > div.flex.my-0.lg3.sm12.xs12 > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections').click()
    cy.get('@iframe').contains('Celular').click()

    //cy.wait(1000)
    //cy.get('@iframe').find('#searchInput').type('CEL - Aceite Coleta')
    cy.wait(2000)
    cy.get('@iframe').find('[role="checkbox"]').click({force: true, multiple: true })
    cy.wait(2000)
    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.layout.wrap > button.v-btn.v-btn--flat.theme--light.btn-gravar.btn-style > div').click()
    /*cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.flex.lg12.md12 > div.flex > div > div.v-table__overflow > table > tbody > tr > td:nth-child(2) > div > div > div > div > div').click()
    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.layout.wrap > button.v-btn.v-btn--flat.theme--light.btn-gravar.btn-style > div').click()

    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.flex.lg12.md12 > div.flex > div > div.v-table__overflow > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > div > div > div > div').click()
    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.layout.wrap > button.v-btn.v-btn--flat.theme--light.btn-gravar.btn-style > div').click()

    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.flex.lg12.md12 > div.flex > div > div.v-table__overflow > table > tbody > tr:nth-child(1) > td:nth-child(4) > div > div > div > div > div').click()
    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.layout.wrap > button.v-btn.v-btn--flat.theme--light.btn-gravar.btn-style > div').click()

    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.flex.lg12.md12 > div.flex > div > div.v-table__overflow > table > tbody > tr:nth-child(1) > td:nth-child(5) > div > div > div > div > div').click()
    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.layout.wrap > button.v-btn.v-btn--flat.theme--light.btn-gravar.btn-style > div').click()*/
    //Botão Gravar
    //cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.layout.wrap > button.v-btn.v-btn--flat.theme--light.btn-gravar.btn-style > div').click()

  })

  it('Pegar Modal', () => { 
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()

    cy.get('#app > div.application--wrap > div.v-card.v-card--flat.v-sheet.theme--light > aside > nav > div > div > div > div').type('perfil')
    cy.contains('Ger. Usuários').click()
    cy.contains('Perfil de Grupo').click()

    cy.wait(1000)

    cy.get('#frame').then($iframe => {
      const $body = $iframe.contents().find('body')
      cy.get($body).as('iframe')
      return cy.get($body[0]).as('iframe')
    })

    cy.wait(1000)
    cy.get('@iframe').find('#mainHome > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections').click()
    cy.get('@iframe').contains('ADMINISTRADOR').click()

    cy.wait(1000)
    cy.get('@iframe').find('#mainHome > div:nth-child(2) > div > div > div.flex.my-0.lg3.sm12.xs12 > div > div > div.v-input__slot > div.v-select__slot > div.v-select__selections').click()
    cy.get('@iframe').contains('Celular').click()

    cy.get('@iframe').find('#mainHome > div:nth-child(3) > div.layout.row.wrap > div.flex.lg12.md12 > div.flex > div > div.v-table__overflow > table > tbody > tr:nth-child(4) > td:nth-child(6) > span > div > span').click()
    cy.get('@iframe').find('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text.father-check > div.checkboxes > div:nth-child(1) > div > div.v-input__slot > div > div').click()
    cy.get('@iframe').find('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text.father-check > div.checkboxes > div:nth-child(2) > div > div.v-input__slot > div > div').click()
    cy.get('@iframe').find('#app > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions.flex-actions > button.btn-text.font-height.v-btn.v-btn--depressed.theme--light > div').click()

  })

  it.only('Selecionar combos', () => { 
    cy.get('#email').type('asp.signa')
    cy.get('#password').type('2020@Apr.2020')
    cy.get('#login').click()

    cy.get('#app > div.application--wrap > div.v-card.v-card--flat.v-sheet.theme--light > aside > nav > div > div > div > div').type('perfil')
    cy.contains('Ger. Usuários').click()
    cy.contains('Perfil de Grupo').click()

    cy.wait(1000)
    cy.get('#frame').then($iframe => {
      const $body = $iframe.contents().find('body')
      cy.get($body).as('iframe')
      return cy.get($body).as('iframe')
    })

    // --Preenche todos-- cy.get('@iframe').find('[role="checkbox"]').click({force: true, multiple: true })
    cy.wait(3000)
    cy.get('@iframe')
    
    // --Clica no Combo         -- cy.get('@iframe').find('#mainHome > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div.v-input__slot').click()
    // --Clica no item do Combo -- cy.get('@iframe').find('[role="listitem"]').find('#app > div.v-menu__content.theme--light.menuable__content__active > div > div > div:nth-child(6) > a > div').click({force: true, multiple: true })

  })
})
