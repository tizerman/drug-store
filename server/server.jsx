import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import dotenv from 'dotenv'
import db from './db.js'
import cors from 'cors'
import App from '../src/App.jsx'
import router from './routes/index.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'..','dist')))
app.use('/api', router)

app.get('/', (req, res) => {
  fs.readFile(path.resolve("./public/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )
  })
})

const start = async () => {
  try {
    await db.authenticate()
    await db.sync()
    app.listen(PORT, () => console.log('Server listening on port ' + PORT))
  } catch (error) {
    console.log(error)
  }
}

start()