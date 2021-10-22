import { Request , Response } from "express";
import { executeGetUserProfile } from "../services/ProfileUserService";

const handleProfileUserController = async (request: Request, response: Response) => {
  const { user_id } = request;

  try {
    const result = await executeGetUserProfile(user_id);

    return response.json(result);
  } catch (error) {
    return response.json({ error: error.message });
  }
}

export { handleProfileUserController };
