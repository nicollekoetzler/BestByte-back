import { MongoClient } from "mongodb";

let db;
const mongoClient = new MongoClient('mongodb://localhost:27017');

try {
    mongoClient.connect();
} catch (error) {
    console.log(error);
}

db = mongoClient.db('bestByte');

export default db;