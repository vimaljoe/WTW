class SearchResultsPage
{
    getResultsHeader()
    {
        return cy.get('[class=wtw-coveo-split-header]')
    }

    getWTWLogo()
    {
        return cy.get('[alt="Willis Towers Watson Logo"]')
    }

    getDateSort()
    {
        return cy.get('[id=coveo9de96e90]')
    }

    getArticleFilter()
    {
        return cy.get('[title=Article]')
    }

    getArticleFilterTag()
    {
        return cy.get('[class=coveo-facet-breadcrumb-caption]')
    }

    getResultsPages()
    {
        return cy.get('[class="coveo-pager-list-item-text coveo-pager-anchor"]')
    }

    getResultsList()
    {
        return cy.get('[class="coveo-list-layout CoveoResult"]')
    }

    getResultsCounter()
    {
        return cy.get(".CoveoQuerySummary")
    }

    getNextPageIcon()
    {
        return cy.get('[class="img-fluid coveo-pager-next-icon-svg"]', {timeout: 5000})
    }
}

export default SearchResultsPage