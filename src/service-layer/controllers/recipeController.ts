import { app } from "../../server"
import { addRecipe, getRecipe } from "../../data-layer/data-agents/recipe"
import { createHash } from "crypto"


const ROUTE = '/recipes'

app.post(`${ROUTE}`, generateId, (req, res) => {
    addRecipe(req.body).then(() => {
        res.send('Success!')
    })
})

app.get(`${ROUTE}/:id`, (req, res) => {
    getRecipe(req.params.id).then((recipe) => {
        res.send(recipe)
    }, err => {
        throw err
    })
})

function generateId(req: any, res: any, next: any) {
    let buff = new Buffer(createHash('sha1').update(JSON.stringify(req.body)).digest('hex'))
    req.body.id = buff.toString().slice(0, 10)
    next()
}