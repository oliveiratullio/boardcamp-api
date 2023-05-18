import { db } from "../database/database.connection"

export async function validateCreateRental(req, res, next){
    try{
        const { customerId, gameId } = req.body
        const customers = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])
        if (customers.rowCount === 0) return res.status(400)
        const games = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId])
        if (games.rowCount === 0) return res.status(400)
        const checkGameStock = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL;`, [gameId])
        if (checkGameStock.rowCount >= games.rows[0].stockTotal) return res.status(400)
        res.locals.pricePerDay = games.rows[0].pricePerDay
        next()
    } catch (err){
        res.status(500).send(err.message)
    }
}
export async function validateReturnRental(req, res, next){
    try{
        const { id } = req.params
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        if (rental.rowCount === 0) return res.status(404)
        if (rental.rows[0].returnDate !== null) return res.status(400)
        const { originalPrice, daysRented, rentDate } = rental.rows[0]
        res.locals.pricePerDay = originalPrice / daysRented
        res.locals.rentDate = rentDate
        res.locals.daysRented = daysRented
        next()
}catch (err){
        res.status(500).send(err.message)
    }
}
export async function validateDeleteRental(req, res, next){
    try{
        const { id } = req.params
        const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
        if (rental.rowCount === 0) return res.status(404)
        if (rental.rows[0].returnDate === null) return res.status(400)
        next()
    }catch (err){
        res.status(500).send(err.message)
    }
}