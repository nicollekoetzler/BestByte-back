import mongo from '../db/db.js';
import { COLLECTIONS } from '../enums/collections.js';
import { STATUS_CODE } from '../enums/statusCode.js';

async function insert (req, res) {

    const { session, user } = res.locals;

    console.log(session);

    try {
        mongo.collection(COLLECTIONS).insertOne({
            userId: sessionStorage.userId,
        })

        return res.send(STATUS_CODE.CREATED);

    } catch (error) {
        return res.send(STATUS_CODE.SEVER_ERROR);
    }
}

export { insert };