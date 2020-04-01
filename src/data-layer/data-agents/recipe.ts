import { insertOne, findOne } from "../mongodb/recipe"
import { createHash } from "crypto"
var imageDataURI = require('image-data-uri')

interface Recipe {

}

export async function addRecipe(recipe: any) {
   //console.log(JSON.stringify(recipe, null, 2))

   Object.keys(recipe.description.entityMap).forEach(key => {
      const entity = recipe.description.entityMap[key]
      if (entity.type === 'IMAGE') {
         const fileFormat = imageDataURI.decode(entity.data.src).imageType.split('/').pop()
         const url = `./assets/images/${recipe.id}/${imageHash(entity.data.src)}.${fileFormat}`
         imageDataURI.outputFile(entity.data.src, url)
         entity.data.src = url
      }
   })

   insertOne(recipe)
}

export async function getRecipe(id: string) {
   const recipe = await findOne(id)
   let promises: Promise<any>[] = []

   Object.keys(recipe.description.entityMap).forEach(key => {
      const entity = recipe.description.entityMap[key]
      if (entity.type === 'IMAGE') {
         promises.push(new Promise(async (resolve, reject) => {
            const imageData = await imageDataURI.encodeFromFile(entity.data.src)
            entity.data.src = imageData
            resolve()
         }))
      }
   })

   await Promise.all(promises)

   return recipe
}

function imageHash(data: string) {
   let buff = new Buffer(createHash('sha1').update(JSON.stringify(data)).digest('hex'))
   return buff.toString().slice(0, 10)
}