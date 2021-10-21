import { Request , Response } from "express";
import { execute } from "../services/AuthenticateUserService";

const handleAuthenticateUser = async (request: Request, response: Response) => {
  const { code } = request.body;

  try {
    const result = await execute(code);
    return response.json(result);

  } catch (error) {
    response.json({ error: error.message });
  }

}

export { handleAuthenticateUser };
