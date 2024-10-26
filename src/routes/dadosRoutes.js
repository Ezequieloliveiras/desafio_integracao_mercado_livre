const express = require('express')

const { getProducts, fetchProductDetails,fetchProductDescription } = require("../controllers/dadosController")

const router = express.Router()

router.get('/dados', getProducts)
router.get('/products/:id', fetchProductDetails)
router.get('/products/:id/description', fetchProductDescription)

module.exports = router