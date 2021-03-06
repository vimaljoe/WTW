class SearchPage
{
    getSearchInput()
    {
        return cy.get('input[role=searchbox]')
    }

    getSearchTool()
    {
        return cy.get('[class="CoveoSearchButton coveo-accessible-button"]', { timeout: 5000 })
    }
}

export default SearchPage