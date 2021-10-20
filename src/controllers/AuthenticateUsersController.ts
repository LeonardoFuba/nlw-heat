import { Request , Response } from "express";
import { execute } from "../services/AuthenticateUserService";

const handleAuthenticateUser = async (request: Request, response: Response) => {
  const { code } = request.body; 

  const result = await execute(code);

  return response.json(result);
}

export { handleAuthenticateUser };