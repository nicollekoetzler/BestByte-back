import mongo from '../db/db.js';

async function insert (req, res) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) {
        return res.send()
    }
}

export { insert };