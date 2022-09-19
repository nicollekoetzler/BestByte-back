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

    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

function calculaValorTotal(products){
    let total = 0
    for( let i = 0; i < products.length ;i++ ){
        total += products[i].price
    }
    return total
}

export async function enviarCheckout(req, res){

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const purchase = req.body
    const purchaseSchema = joi.object({
        purchaseProduct: joi.array().required()
    })

    const isBodyValid = purchaseSchema.validate(purchase);

    if ( isBodyValid.error ){
        return res.sendStatus(422);
    }

    try {

        const sessionData = await db.collection("sessions").findOne({ token })
    
        if ( !sessionData ){
            return res.status(401).send("token inválido.");
        }

        const valorTotal = calculaValorTotal(purchase.purchaseProduct)

        await db.collection("checkout").insertOne(
            { 
                products: purchase.purchaseProduct,
                userId: sessionData._id,
                total: valorTotal
            }
        );

        res.sendStatus(201)

    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}