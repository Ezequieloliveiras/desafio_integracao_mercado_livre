const axios = require("axios")

const getProducts = async (req, res) => {
    const { termoPesquisado, precoMinimo, precoMaximo, condicao } = req.query
    console.log('Condicao:', condicao);
    try {
        const response = await axios.get('https://api.mercadolibre.com/sites/MLB/search', {
            params: { q: termoPesquisado, price: `${precoMinimo}-${precoMaximo}`, condition: `${condicao}` }
            
        })
        
        // if (condicao) {
        //     params.condition = condicao;
        // }
        console.log(response.data)

        res.json(response.data)

    } catch (error) {

        console.error(error)
        res.status(500).send("Erro ao buscar dados da API")
    }
}

module.exports = {
    getProducts
}


// Documentacao que explica essa url
//https://developers.mercadolivre.com.br/pt_br/categorias-e-atributos-veiculos
//https://developers.mercadolivre.com.br/pt_br/itens-e-buscas