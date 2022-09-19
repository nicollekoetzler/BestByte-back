import db from "../config/db.js";

export async function receberCarrinho(req, res){

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    
    try {

        const sessionData = await db.collection("sessions").findOne({ token })
    
        if ( !sessionData ){
            return res.status(401).send("token inválido.");
        }

        const products = await db.collection('cart').find({ userId: sessionData.userId }).toArray()
        const userData = await db.collection('users').findOne({ _id: sessionData.userId })
        
        const response = {
            name: userData.name,
            products: products
        }

        res.status(200).send(response);

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}