import db from "../config/db.js";


export async function listarProdutos(req, res){
    try {
        const produtos = await db.collection('products').find().toArray()
        
        return res.send(produtos)

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export async function enviarCarrinho(req, res){

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const carrinho = req.body
    
    try {
        const validToken = await db.collection('sessions').findOne({
            token: token
        }) 
        if(!validToken){
            return res.sendStatus(401)
        }
        await db.collection('cart').insertOne({
            userId: validToken.userId,
            price: carrinho.price,
            name: carrinho.name,
            image: carrinho.image
        })
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}