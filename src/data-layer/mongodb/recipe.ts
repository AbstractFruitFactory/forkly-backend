import { getDb, onConnected } from "./config"
import { Collection } from "mongodb"

let recipes: Collection<any>

onConnected(() => {
    const db = getDb()

    db.createCollection("recipes", function (err, res) {
        if (err) throw err
    })

    recipes = db.collection('recipes')
})

export async function insertOne(recipe: any) {
    await recipes.insertOne(recipe)
}

export async function findOne(id: string) {
    return await recipes.findOne({
        id
    })
}


