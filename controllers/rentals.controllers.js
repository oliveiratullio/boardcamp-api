import dayjs from "dayjs"
import { db } from "../database/database.connection.js"

export async function getRentals(req, res) {
    try {
       const rentals = await db.query(`
            SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName" FROM rentals 
            JOIN customers ON rentals."customerId" = customer.id
            JOIN games ON rentals."gameId" = games.id;
       `)
       const result = rentals.rows.map((rental) =>{
            const rentalResponse = {...rental, customer: {id: rental.customerId, name: rental.customerName},game:{id: rental.gameId, name: rental.gameName}}
            delete rentalResponse.customerName
            delete rentalResponse.gameName
            return rentalResponse
       })
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createRental(req, res) {
    try {
        const { customerId, gameId, daysRented } = req.body
        const { pricePerDay } = res.locals
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, null, null);
       `, [customerId, gameId, daysRented, dayjs().format('YYYY-MM-DD'), pricePerDay * daysRented])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function finishRental(req, res) {
    try {
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteRental(req, res) {
    try {
        
    } catch (err) {
        res.status(500).send(err.message)
    }
} 