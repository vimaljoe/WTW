import SearchPage from '../support/PageObjects/searchpage'

// Constructor
const searchPage = new SearchPage()

// Searching results usig a string
Cypress.Commands.add("Search", (searchText) => {
    searchPage.getSearchInput()
            .type(searchText)
    searchPage.getSearchTool()
            .click() 
})

