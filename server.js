const express = require('express')
const dadosRoutes  = require('./src/routes/dadosRoutes')

const app = express()
const port = 3001

app.use(express.json())
app.use('/api', dadosRoutes )

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

