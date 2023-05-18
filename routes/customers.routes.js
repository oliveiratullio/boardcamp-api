import { Router } from "express"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { customerSchema } from "../schemas/customers.schemas.js"
import { createCustomer, getCustomerById, getCustomers, updateCustomer } from "../controllers/customers.constrollers.js"
import { validateCustomerCpf } from "../middlewares/custumers.middlewares.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomerById)
customersRouter.post("/customers", validateCustomerCpf, validateSchema(customerSchema), createCustomer)
customersRouter.put("/customers/:id", validateCustomerCpf, validateSchema(customerSchema), updateCustomer)

export default customersRouter  