import bcrypt from 'bcrypt';
import mongo from '../db/db.js';
import { v4 as uuid }from 'uuid';
import { STATUS_CODE } from '../enums/statusCode.js';
import { COLLECTIONS } from '../enums/collections.js';
import { signInSchema, signUpSchema } from '../schemas/authSchema.js';

async function signUp(req, res) {
    const { name, email, password } = req.body;

    const isValid = signUpSchema.validate({
        name, email, password
    });

    if(isValid.error) {
        return res.send(STATUS_CODE.BAD_REQUEST);
    }

    const userExist = await mongo.collection(COLLECTIONS.USERS).find({email}).count();

    if(userExist > 0) {
        res.status(409).send({"message": "Já existe usuário cadastrado nesse email!"});
        return;
    }{name, email}

    const encrypetPassword = bcrypt.hashSync(password, 12);
    try {
        mongo.collection(COLLECTIONS.USERS).insertOne({
            name,
            email,
            password: encrypetPassword,
        });

        return res.send(STATUS_CODE.CREATED);

    } catch (error) {
        console.error(error);
        return res.send(STATUS_CODE.SEVER_ERROR);
    }
}

async function signIn (req, res) {
    const { email, password } = req.body;

    const isValid = signInSchema.validate({
        email, password
    });

    if(isValid.error) {
        return res.send(STATUS_CODE.BAD_REQUEST);
    }

    try {

        const user = await mongo.collection(COLLECTIONS.USERS).findOne({
            email
        });

        const isValidPass = bcrypt.compareSync(password, user.password);

        if(!user || !isValidPass) {
            return res.send(STATUS_CODE.UNAUTHORIZED);
        }

        const token = uuid();
        mongo.collection('sessions').insertOne({
            userId: user._id,
            token,
        });


        return res.send(token);

    } catch (error) {
        return res.send(STATUS_CODE.SEVER_ERROR);
    }
}

export { signUp, signIn };