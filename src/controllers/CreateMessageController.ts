import { Request , Response } from "express";
import { execute } from "../services/CreateMessageService";

const handleCreateMessage = async (request: Request, response: Response) => {
  const { message } = request.body;
  const { user_id } = request;

  try {
    const result = await execute(message, user_id);

    return response.json(result);
  } catch (error) {
    response.json({ error: error.message });
  }

}

export { handleCreateMessage };
