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
