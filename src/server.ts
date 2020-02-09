import express from "express"
import { connect } from "./data-layer/mongodb/config"
import bodyParser from 'body-parser'

var cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

connect()

export { app }

import './service-layer/controllers/recipeController'
