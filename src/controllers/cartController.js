import db from "../config/db.js";

export async function receberCarrinho(req, res){

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const sessionData = await db.collection("sessions").findOne({ token })

    if ( !sessionData ){
        return res.status(401).send("token inválido.");
    }

    try {

        const produtos = await db.collection('cart').find({ userId: sessionData.userId }).toArray()
        
        res.status(200).send(produtos)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}