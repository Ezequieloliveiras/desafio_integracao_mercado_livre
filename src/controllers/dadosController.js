const axios = require("axios")

const getProducts = async (req, res) => {
    try {
        const response = await axios.get('https://api.mercadolibre.com/sites/MLB/search?q=%7Bq')

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
