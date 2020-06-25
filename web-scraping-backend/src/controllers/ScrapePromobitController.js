const puppeteer = require('puppeteer');

module.exports = {
    async index(request, response){

        const url = 'https://www.promobit.com.br/'
        const promo = 'promocoes/'
        const category = 'games'

        const formatedUrl = url + promo + category

        let scrape = async () => {
            const browser = await puppeteer.launch({ headless: false, args: ["--disable-notifications"] })
            var page = await browser.newPage()

            await page.goto(formatedUrl, { waitUntil: 'domcontentloaded' })

            var results = []

            if (promo == '' && category == '') {
                console.log('home')
                // TODO: Acertar o elemento de click para rolar a página
                await page.click("body > div.onboard.onboard--start.p3.fixed.js-onboard.display-flex > div.onboard__header.mb2 > button > .fa.fa-times.onboard__close-icon.js-onboard__close-icon.js-pr__tracking--click")
                await page.waitFor(2000)

                await page.evaluate(_ => {
                    window.scrollTo(0, document.body.scrollHeight)
                });
                await page.waitFor(30000)

            } else {
                console.log(`categoria: ${category}`)
                await page.click(`#timeline_content > div.in-size.endbox-unlock.flex.align-center.justify-center.mb10.mt8 > div > div`)
                await page.waitFor(2000)

                await page.evaluate(_ => {
                    window.scrollTo(0, document.body.scrollHeight)
                });
                await page.waitFor(10000)
            }

            results = results.concat(await extractedEvaluateCall(page))

            browser.close()
            return response.json(results)
        };

        let extractedEvaluateCall = async (page) => {

            return page.evaluate(() => {
                let data = []
                // SELECT ALL PRODUCTS
                let elements = document.querySelectorAll('.pr-tl-card')

                // LOOP THROUGH EACH PROUDCT
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];

                    try {
                        var title = element.children[1].innerText;

                        // If has Old Price
                        // get children position 2
                        // else
                        // get children position 1
                        if (element.children[2].children[1].classList.contains('oldprice')) {
                            var price = element.children[2].children[2].innerText
                        } else {
                            var price = element.children[2].children[1].innerText
                        }

                    } catch (error) {
                        console.log(error)
                        continue
                    }

                    data.push({ title, price })
                }

                return data
            });
        }

        scrape()
    }

}