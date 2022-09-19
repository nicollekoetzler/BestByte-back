import { COLLECTIONS } from "../enums/collections";
import { STATUS_CODE } from "../enums/statusCode";
import mongo from '../db/db.js';


// Dados de sessões do meu usuário automaticamente
async function validation (req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) {
        return res.send(STATUS_CODE.BAD_REQUEST);
    }

    try {
        const session = await mongo.collection(COLLECTIONS.SESSIONS).findOne({
            token,
        });

        if(!session) {
            return res.send(STATUS_CODE.UNAUTHORIZED);
        }

        const user = await mongo.collection(COLLECTIONS.USERS).findOne({
            _id: session.userId,
        });


        // enviando dados para o insert
        res.locals.session = session;
        res.locals.user = user;
        next();

    } catch (error) {
        return res.send(STATUS_CODE.SEVER_ERROR);
    }

}

export {
    validation
}