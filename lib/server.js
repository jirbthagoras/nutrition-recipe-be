const express = require('express')
const app = express()
require('dotenv').config()

app.get('/', (req, res) => {
     res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
     console.log(`Example app running on port 3000`)
})