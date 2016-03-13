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

            //Not Found
            .url(base + '/#bob')
            .pause(100)
            .assert.containsText('h1', '404')

            .end()
    }
}
