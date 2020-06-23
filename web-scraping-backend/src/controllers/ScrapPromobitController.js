const puppeteer = require('puppeteer');

module.exports = {
    async index(request, response){

        const url = 'https://www.promobit.com.br/'
        const promo = 'promocoes/'
        const category = 'games'
        const formatedUrl = url + promo + category

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(formatedUrl, { waitUntil: 'domcontentloaded' })

        const result = await page.evaluate(() => {
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

        browser.close();
        return response.json(result);
    }

}