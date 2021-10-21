import { Router } from "express";
import { handleAuthenticateUser } from "./controllers/AuthenticateUsersController";
import { handleCreateMessage } from "./controllers/CreateMessageController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", handleAuthenticateUser);

router.post("/messages", ensureAuthenticated ,handleCreateMessage);

export { router };
