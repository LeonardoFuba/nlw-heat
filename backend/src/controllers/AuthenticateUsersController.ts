import { Request , Response } from "express";
import { executeAuthenticate } from "../services/AuthenticateUserService";

const handleAuthenticateUser = async (request: Request, response: Response) => {
  const { code } = request.body;

  try {
    const result = await executeAuthenticate(code);
    return response.json(result);

  } catch (error) {
    return response.json({ error: error.message });
  }

}

export { handleAuthenticateUser };
