const express = require('express')
const cors = require('cors'); // Importando o pacote cors
const dadosRoutes  = require('./src/routes/dadosRoutes')

const app = express()
const port = 3001

app.use(cors())

app.use(express.json())
app.use('/api', dadosRoutes )


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

