class CountryPage
{
    getAmericas()
    {
        return cy.get('[alt=Americas]')
    }

    getUSEnglish()
    {
        return cy.get('[data-eventlabel="Country: United States  | Click Text: English"]')
    }
}

export default CountryPage