const puppeteer = require('puppeteer');
const { json } = require('express');

module.exports = {
    async index(request, response){

        let scrape = async () => {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();

            await page.goto('http://books.toscrape.com/');

            var results = []; // variable to hold collection of all book titles and prices
            var lastPageNumber = 2; // this is hardcoded last catalogue page, you can set it dunamically if you wish
            // defined simple loop to iterate over number of catalogue pages
            for (let index = 0; index < lastPageNumber; index++) {
                // wait 1 sec for page load
                await page.waitFor(1000);
                // call and wait extractedEvaluateCall and concatenate results every iteration.
                // You can use results.push, but will get collection of collections at the end of iteration
                results = results.concat(await extractedEvaluateCall(page));
                // this is where next button on page clicked to jump to another page
                if (index != lastPageNumber - 1) {
                    // no next button on last page
                    await page.click('#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a');
                }
            }

            browser.close();
            return response.json(results);
        };

        let extractedEvaluateCall = async (page) => {
            // just extracted same exact logic in separate function
            // this function should use async keyword in order to work and take page as argument
            return page.evaluate(() => {
                let data = [];
                let elements = document.querySelectorAll('.product_pod');

                for (var element of elements) {
                    let title = element.childNodes[5].innerText;
                    let price = element.childNodes[7].children[0].innerText;

                    data.push({ title, price });
                }

                return data;
            });
        }

        scrape()
    }
}