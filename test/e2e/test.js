var base = 'http://localhost:' + (process.env.PORT || 8080)

module.exports = {
    'ractive-router e2e tests': function (browser) {
        browser
            // default Home
            .url(base)
            .waitForElementVisible('h1.home', 1000)
            .assert.containsText('h1', 'Home')
            .assert.containsText('div.home', 'App: Demo')

            //Page 1 with route params
            .click('a[href^="#page1/1234/true"]')
            .waitForElementVisible('h1.page1', 1000)
            .assert.containsText('h1', 'Page 1')
            .assert.containsText('div.page1', 'App: Demo')
            .assert.containsText('div.page1', 'id: 1234')
            .assert.containsText('div.page1', 'option: true')

            //Callback
            .click('a[href^="#page2"]')
            .waitForElementVisible('h1', 1000)
            .assert.containsText('h1', 'Custom HTML renderer')

            //Page 3 with only query params
            .url(base +  '#page3?page=250&limit=1000')
            .waitForElementVisible('h1.page3', 1000)
            .assert.containsText('h1', 'Page 3')
            .assert.containsText('div.page3', 'App: Demo')
            .assert.containsText('div.page3', 'page: 250')
            .assert.containsText('div.page3', 'limit: 1000')

            //Page 4 with path and query params
            .click('a[href^="#page4/I+1234/?page=1&limit=50"]')
            .waitForElementVisible('h1.page4', 1000)
            .assert.containsText('h1', 'Page 4')
            .assert.containsText('div.page4', 'App: Demo')
            .assert.containsText('div.page4', 'id: I+1234')
            .assert.containsText('div.page4', 'page: 1')
            .assert.containsText('div.page4', 'limit: 50')

            //Page 4 with path and query params
            .url(base +  '#page4/I+1234/value?page=1&limit=50')
            .waitForElementVisible('h1.page4', 1000)
            .assert.containsText('h1', 'Page 4')
            .assert.containsText('div.page4', 'App: Demo')
            .assert.containsText('div.page4', 'id: I+1234')
            .assert.containsText('div.page4', 'option: value')
            .assert.containsText('div.page4', 'page: 1')
            .assert.containsText('div.page4', 'limit: 50')

            .saveScreenshot('test/e2e/screenshot.png')

            //Not Found
            .url(base + '/#bob')
            .pause(100)
            .assert.containsText('h1', '404')

            .end()
    }
}
