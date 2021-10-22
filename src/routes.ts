import { Router } from "express";
import { handleAuthenticateUser } from "./controllers/AuthenticateUsersController";
import { handleCreateMessage } from "./controllers/CreateMessageController";
import { handleGetLast3Messages } from "./controllers/GetLast3MessagesController";
import { handleProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", handleAuthenticateUser);

router.post("/messages", ensureAuthenticated ,handleCreateMessage);
router.get("/messages/last3", handleGetLast3Messages);

router.get("/profile", ensureAuthenticated, handleProfileUserController);


export { router };
