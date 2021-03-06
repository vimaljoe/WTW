// A program to run the below steps in Willis Towers Watson site
// -------------------------------------------------------------
// 1.	Open the following URL: http://www.willistowerswatson.com/ICT 
// 2.	Change the language and region from top left corner to United States English, see example snippet. 
// 3.	Search for the word “IFRS 17” using the search box
// 4.	Validate if you have arrived on the result page
// 5.	Check if the result is sorted by “Date”. If not, sort by “Date”
// 6.	Use the “Filter by” functionality and set Content Type to “Article”
// 7.	Validate that each article in the list displays a link that starts with “https://www.willistowerswatson.com/en-US/”

import * as _ from 'lodash'
import { trim } from 'lodash'
import HomePage from '../../support/PageObjects/homepage'
import CookiePage from '../../support/PageObjects/cookiepage'
import CountryPage from '../../support/PageObjects/countrypage'
import SearchResultsPage from '../../support/PageObjects/searchresultspage'

// Constructors
const homePage = new HomePage()
const cookiePage = new CookiePage()
const countryPage = new CountryPage()
const searchResultsPage = new SearchResultsPage()

// Open the WTW site
describe('Open the WTW website', () => {

    it("Navigate to WTW URL", () => {
        cy.visit(Cypress.env('BaseURL') +"ICT")
    })

    // If user is presented with a cookies preference form,
    // we click on the default 'Agree and Proceed' button
    it('Click on Agree and Proceed button if cookie settings window is visible', () => {
        cy.get('body').then((body) => {
            if (body.find('mainContent').length > 0){
                cookiePage.getDefaultCookie()
                    .click()
            }
        })  
    })

    // Select the country selector button which will take user to 
    // another page to seelct the country and language
    it('Click on the Country selector', () => {
        homePage.getCountrySelector()        
            .first()
            .click()
    })

    // User select the Americs image
    it('Select the Americas section', () => {
        countryPage.getAmericas()
            .click()
    })

    // User select English language parallel to Americas
    // User verify that is change the url
    it('Select US English and verify URL', () => {
        countryPage.getUSEnglish()
            .click()
        cy.url()
            .should('eq',Cypress.env('BaseURL') + "en-US")
        homePage.getWTWLogo()
            .should('be.visible')
    })

    // User clicks on the search button to open up the search input field
    it('Select the search button', () => {
        homePage.getSearchBtn()
            .contains('Search')
            .click()
    })

    // User enter the serach text 'IFRS 17' in the search inut field
    // and click on the search button
    // Using custom command 'Search'
    it('Enter the search text and search', () => {
        cy.Search("IFRS 17")
    })     
})

// The test steps are divided into two parts due to bug in Cypress.
// Reference - https://github.com/cypress-io/cypress/issues/8507
// User needs to supply the url again
describe('Work on the filtered results Page', () => {
    it ('Navigate to Search results', () => {
        cy.visit(Cypress.env('BaseURL') + "en-US/Search#q=IFRS%2017&sort=relevancy")
    })

    // Verify that the search results page is appeared
    it('Verify the results page', () => {
        searchResultsPage.getResultsHeader()
            .should('be.visible')
        searchResultsPage.getWTWLogo()
            .should('be.visible')
    })

    // Verify that results are soreted on date. 
    // If the sort is not based on date, user click on the date sort link
    // Verify that after the click, the date sort is selected
    // If not select the date sort
    it('Check if the date sort is selected', () => {
        searchResultsPage.getDateSort().then(($link) => {
            if ($link.hasClass('/*coveo-selected*/')){
                searchResultsPage.getDateSort()
                    .should('be.selected')
                searchResultsPage.getDateSort()
                    .should('be.visible')
            } else{
                searchResultsPage.getDateSort()
                    .click()
                searchResultsPage.getDateSort()
                    .should('have.attr', 'class')
                    .and('contain', 'coveo-selected')
            }
        })
    })

    // Once the 'Article' filter is visible, user select that filter 
    // Verify that the 'Article' filter tag is visible on the results page
    it('Select Article filter', () => {
        cy.get('body').then((body) => {
            if (body.find('[title=Article]').length>0){
                searchResultsPage.getArticleFilter()
                    .click()
                searchResultsPage.getArticleFilterTag()
                    .should('have.text', 'Article')        
            }
        })
    })

    // Verify that all resuls are containing a WTW website address
    // Outer iteration is based on the number of pages
    // Outer iteration will continue until the next page arrow exists
    // If next page exists, we click on the icon to go to next page after the inner iteration
    // If the text on the results are not changed, we wait for the new page to be loaded
    // Inner iteration is based onthe number of links in a page
    // Inner iteration will continue until all the results in a page are compelted
    it('All results should contain https://www.willistowerswatson.com/en-US/', () => {
        searchResultsPage.getResultsPages().each(() => {
            searchResultsPage.getResultsList().each(($match) => {
                cy.wrap($match)
                    .invoke('text')
                    .should('contain', Cypress.env('BaseURL'))
            }) 
            cy.get('body').then((body) => {
                var results
                if (body.find('[class="img-fluid coveo-pager-next-icon-svg"]').length > 0){
                    searchResultsPage.getResultsCounter()
                        .find('.coveo-highlight')
                        .invoke('text')
                        .then((text) => {
                            results = trim(text);
                    }); 
                    searchResultsPage.getNextPageIcon()
                        .click()
                    searchResultsPage.getResultsCounter()
                        .find('.coveo-highlight')
                        .invoke('text')
                        .then((text) => {
                            if (results == trim(text)){
                                cy.wait(2000)
                        }
                    })                     
                } 
            })              
        }) 
    })
})