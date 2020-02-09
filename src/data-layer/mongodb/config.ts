import { MongoClient, Db } from "mongodb"

var url = "mongodb://localhost:27017/"

let mongoDb: MongoClient

let collectionInitiators: Function[] = []

export async function connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) reject(err)
            console.log("Database created!")
            mongoDb = db

            collectionInitiators.forEach(event => {
                event()
            })

            resolve(true)
        })
    })
}

export function getDb(): Db | null {
    return mongoDb.db('forkly')
}

export function onConnected(event: () => any) {
    collectionInitiators.push(event)
}