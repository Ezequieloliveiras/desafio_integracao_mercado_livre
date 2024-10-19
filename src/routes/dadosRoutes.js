const express = require('express')
const dadosController = require("../controllers/dadosController.js")

const router = express.Router()

router.get('/dados', dadosController.getProducts)

module.exports = router