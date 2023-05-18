import { Router } from "express"
import { createRental, deleteRental, getRentals, finishRental } from "../controllers/rentals.controllers.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { rentalSchema } from "../schemas/rentals.schemas.js"
import {  validateCreateRental, validateDeleteRental, validateReturnRental } from "../middlewares/rentals.middlewares.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchema(rentalSchema), validateCreateRental, createRental)
rentalsRouter.post("/rentals/:id/return", validateReturnRental, finishRental)
rentalsRouter.delete("/rentals/:id", validateDeleteRental, deleteRental)

export default rentalsRouter