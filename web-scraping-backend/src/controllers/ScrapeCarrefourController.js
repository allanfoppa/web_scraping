const puppeteer = require('puppeteer');

module.exports = {
    async index(request, response){
        // DOING: Parei aqui
        const url = 'https://www.carrefour.com.br/dicas/mercado?crfint=hm|header-menu|mercado|9'

        let scrape = async () => {
            const browser = await puppeteer.launch({ headless: false })
            const page = await browser.newPage()

            await page.goto(url, { waitUntil: 'domcontentloaded' })

            var results = []

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
                        var name        = element.children[0].children[2].children[6].children[0].children[1].children[0].innerText
                        // Preço Por
                        var precoPor    = element.children[0].children[2].children[6].children[0].children[1].children[1].children[0].children[3].children[0].children[1].innerText
                        // Produto Indisponível
                        var prodUnavailable = element.children[0].children[2].children[6].children[0].children[1].children[1].children[0].children[1].children[0].innerText
                        console.log(name + ' ' + precoPor + ' ' + prodUnavailable)
                    } catch (error) {
                        console.log(error)
                        continue
                    }

                    data.push({ name, precoPor, prodUnavailable })
                }

                console.log(data)
                return data
            });
        }

        scrape()
    }
}