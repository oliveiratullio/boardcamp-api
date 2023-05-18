import { Router } from "express";
import { createGame, getGames } from "../controllers/games.controllers.js";
import validateSchema from "../middlewares/validadeSchema.middleware.js";
import { gameSchema } from "../schemas/games.schemas.js";


const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateSchema(gameSchema), createGame)

export default gamesRouter