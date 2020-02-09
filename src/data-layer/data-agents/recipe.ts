import { insertOne, findOne } from "../mongodb/recipe"
var imageDataURI = require('image-data-uri')

interface Recipe {

}

export async function addRecipe(recipe: any) {
   recipe.description.forEach((item: any) => {
      if (item.type === 'image') {
         const url = `./assets/images/${recipe.id}/${item.data.name}`
         imageDataURI.outputFile(item.data.content, url)
         item.data.content = url
      }
   })

   insertOne(recipe)
}

export async function getRecipe(id: string) {
   const recipe = await findOne(id)

   let promises: Promise<any>[] = []
   recipe.description.forEach((item: any) => {
      if (item.type === 'image') {
         promises.push(new Promise(async (resolve, reject) => {
            const imageData = await imageDataURI.encodeFromFile(item.data.content)
            item.data.content = imageData
            resolve()
         }))
      }
   })

   await Promise.all(promises)

   return recipe
}