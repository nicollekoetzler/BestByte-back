import { MongoClient } from "mongodb";

let db;
const mongoClient = new MongoClient(process.env.MONGODB_URL)

try {
    mongoClient.connect();
} catch (error) {
    console.log(error);
}

db = mongoClient.db('bestByte');

export default db;