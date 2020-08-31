const puppeteer = require('puppeteer');

module.exports = {
    async index(request, response){

        const url = 'https://www.carrefour.com.br/dicas/mercado?crfint=hm|header-menu|mercado|9'

        var date = new Date();

        const today = {
            data: date.toISOString().substr(0, 10).split('-').reverse().join('/')
        }

        let scrape = async () => {
            const browser = await puppeteer.launch({ headless: false })
            const page = await browser.newPage()

            await page.goto(url, { waitUntil: 'domcontentloaded' })

            await page.waitFor(4000)

            var results = []

            results.push(today)
            results = results.concat(await extractedEvaluateCall(page))

            browser.close()

            return response.json(results)
        };

        let extractedEvaluateCall = async (page) => {

            return page.evaluate(() => {
                let data = []
                // SELECT ALL PRODUCTS
                let elements = document.querySelectorAll('.owl-item')

                // .carousel-list
                    //Mais Populares
                    //Produtos em Destaque
                    //Produtos Patrocinados

                // .js-owl-carousel
                    //Despensa
                    //Bebidas Alcoólicas
                    //Bebidas Não Alcoólicas
                    //Cuidados Pessoais
                    //Abasteça sua geladeira
                    //Frutas e Legumes
                    //Melhores Marcas


                // LOOP THROUGH EACH PROUDCT
                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i]
                    console.log(element)
                    try {
                        // Nome do produto
                        var name        = element.children[0].children[2].children[6].children[0].children[1].children[0].innerText.trim()
                        // Preço Por / Produto indisponivel
                        if (element.children[0].children[2].children[6].children[0].children[1].children[1].children[0].className == 'available-prd-info') {
                            var value    = element.children[0].children[2].children[6].children[0].children[1].children[1].children[0].children[3].children[0].children[1].innerText.trim()
                        } else {
                            var value = element.children[0].children[2].children[6].children[0].children[1].children[1].children[0].children[1].children[0].innerText.trim()
                        }
                        // Produto Indisponível
                    } catch (error) {
                        console.log(error)
                    }

                    data.push({ name, value })
                }

                return data
            });
        }

        scrape()
    }
}