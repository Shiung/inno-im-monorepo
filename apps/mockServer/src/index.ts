import express from 'express'

let app = express()

app.get('/', (req, res) => {
  res.send('hello aaa iii')
})

app.listen(5174)
