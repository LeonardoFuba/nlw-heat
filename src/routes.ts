import { Router } from "express";
import { handleAuthenticateUser } from "./controllers/AuthenticateUsersController";

const router = Router();

router.post("/authenticate", handleAuthenticateUser);

export { router };