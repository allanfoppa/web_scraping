const puppeteer = require('puppeteer');

module.exports = {
    async index(request, response){

        const url = 'https://rs.olx.com.br/'
        const region = 'regioes-de-porto-alegre-torres-e-santa-cruz-do-sul/'
        const category = 'videogames'
        const formatedUrl = url + region + category

        let scrape = async () => {
            const browser = await puppeteer.launch({ headless: false })
            const page = await browser.newPage()

            await page.goto(formatedUrl, { waitUntil: 'domcontentloaded' })

            var results = []
            var pagesScrapeQtd = 10

            let pageToGo = 2

            for (let index = 0; index < pagesScrapeQtd; index++) {

                await page.waitFor(1000)

                results = results.concat(await extractedEvaluateCall(page))

                if (index != pagesScrapeQtd - 1) {
                    console.log('pageToGo' + ' ' + pageToGo)
                    console.log('validação' + index != pagesScrapeQtd - 1)
                    // Starts in 2
                    await page.click(`#content > div > div.col2.sc-15vff5z-5.fFdJjk > div:nth-child(12) > ul > li:nth-child(${pageToGo})`)
                    pageToGo++
                }
            }

            browser.close()
            return response.json(results)
        };

        let extractedEvaluateCall = async (page) => {

            return page.evaluate(() => {
                let data = []
                // SELECT ALL PRODUCTS
                let elements = document.querySelectorAll('.sc-1fcmfeb-2')

                // LOOP THROUGH EACH PROUDCT
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i]

                    try {
                        var title   = element.children[0].children[0].children[1].children[0].children[0].innerText
                        var price   = element.children[0].children[0].children[1].children[0].children[1].innerText
                        var date    = element.children[0].children[0].children[1].children[0].children[2].innerText
                        var city    = element.children[0].children[0].children[1].children[1].children[0].children[0].innerText

                    } catch (error) {
                        console.log(error)
                        continue
                    }

                    data.push({ title, price, date, city })
                }

                return data
            });
        }

        scrape()
    }

}