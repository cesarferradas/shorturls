const express = require('express')

const app = express()

const PORT = process.env.PORT || 4000

app.route('/').get((req, res) => {
  res.send('Server running')
})

app.listen(PORT)
