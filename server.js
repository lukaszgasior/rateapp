const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

require('./build/webpackdev')(app)

app.use(express.static('public'))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
