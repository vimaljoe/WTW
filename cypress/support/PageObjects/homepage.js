class HomePage
{

    getCountrySelector()
    {
        return cy.get('[aria-expanded=false][aria-controls=country-selector][class="font-p font-p-small site-nav__utility-btn"]')
    }

    getWTWLogo()
    {
        return cy.get('[alt="Willis Towers Watson Logo"]')
    }

    getSearchBtn()
    {
        return cy.get('[class="site-nav__btn__label d-none d-md-block"]')
    }

}

export default HomePage