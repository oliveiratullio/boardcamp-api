import { db } from "../database/database.connection.js"

export async function validateCustomerCpf(req, res, next){
    try{
        const { cpf } = req.body
        const { id } = req.params
        const customer =await db.query(`SELECT * FROM  customers WHERE cpf=$1;`, [cpf])
        if (customer.rowCount === 0 || customer.rowCount > 0 && customer.rows[0].id ===  Number(id)) return next() 
        return res.status(409   )
    } catch (err){
        res.status(500).send(err.message)
    }
}