/// <reference types="cypress" />

const getProfileIcon = ".masterbar__item.masterbar__item-me";
const getFirstName = "#first_name";
const getLastName = "#last_name";
const getDisplayName = '#display_name';
const getAboutMe = '#description';
const getLogout = '.sidebar__me-signout';
const getUserName = '#usernameOrEmail';
const getSubmitButton = "[type='submit']";
const getPassword = "[type='password']";

describe('Validate Wordpress Profile Page', () => {
    before(() => {
        cy.visit('/')
    })

    it('displays two todo items by default', () => {
        // We use the `cy.get()` command to get all elements that match the selector.
        // Then, we use `should` to assert that there are two matched items,
        // which are the two default items.
        cy.wait(1200)
        cy.fixture("user").then((user) => {
            const userName = user.UserName;
            const password = user.Password;
            const displayName = user.DisplayName;
            const description = user.Description;
            const firstName = user.FirstName;
            const lastName = user.LastName;
            cy.get(getUserName).type(userName)
            cy.get(getSubmitButton).click();
            cy.wait(1200)
            cy.get(getPassword).type(password);
            cy.get(getSubmitButton).click();
            cy.wait(2000);
            cy.get(getProfileIcon, { timeout: 10000 }).should('be.visible');
            cy.get(getProfileIcon).click();
            cy.get(2000)
            cy.get(getDisplayName, { timeout: 10000 }).should('be.visible');
            cy.get(getDisplayName).should("have.attr", "value")
                .and("contain", displayName);
            cy.get(getAboutMe).should("have.text", description);
            cy.get(getLogout).click();
            cy.title().should('eq', 'WordPress.com')

        })
    })
})