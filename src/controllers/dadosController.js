const axios = require("axios")

const getProducts = async (req, res) => {
    const { termoPesquisado, precoMinimo, precoMaximo, condicao } = req.query

    if (!termoPesquisado) {
        return res.status(400).send('Termo pesquisado é obrigatório.')
    }

    if (!precoMinimo) {
        return res.status(400).send('Preço mínimo não preenchido.')
    }

    if (!precoMaximo) {
        return res.status(400).send('Preço máximo não preenchido.')
    }

    // Valida se os preços são válidos
    const minPrice = Number(precoMinimo)
    const maxPrice = Number(precoMaximo)

    if (isNaN(minPrice)) {
        return res.status(400).send('O preço mínimo deve ser um número válido.')
    }

    if (isNaN(maxPrice)) {
        return res.status(400).send('O preço máximo deve ser um número válido.')
    }

    try {
        const response = await axios.get('https://api.mercadolibre.com/sites/MLB/search', {
            params: {
                q: termoPesquisado,
                price: `${minPrice}-${maxPrice}`,
                condition: condicao,
            },
        })
        if (response.data.results <= 0) {
            return res.status(400).send('Nenhum produto encontrado com esses critérios.')
        }

        const products = response.data.results
        res.json({ results: products })

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
        res.status(500).send("Erro ao buscar dados da API")
    }
}

const fetchProductDetails = async (req, res) => {
    const { id } = req.params

    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${id}`)
        console.log(response)

        if (!response.data.id) {
            return res.status(404).send('Produto não encontrado.')
        }

        res.json( response.data)

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error)
        res.status(500).send("Erro ao buscar dados da API")
    }
}

const fetchProductDescription = async (req, res) => {

    const { id } = req.params;
    console.log('ID da descrição:', id);

    try {
        const response = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
        
        if (!response.data.plain_text) {
            return res.status(404).send('Descrição não encontrada para este produto.');
        }

        res.json({ description: response.data.plain_text }); // Retorna apenas a descrição do produto

    } catch (error) {
        console.error('Erro ao buscar descrição da API:', error.message);
        res.status(500).send("Erro ao buscar descrição da API");
    }
}

module.exports = {
    getProducts,
    fetchProductDetails,
    fetchProductDescription,
}

// Documentação utilizada como base para realizar o Search
// https://developers.mercadolivre.com.br/pt_br/categorias-e-atributos-veiculos
// https://developers.mercadolivre.com.br/pt_br/itens-e-buscas
