import { Request , Response } from "express";
import { executeCreateMessages } from "../services/CreateMessageService";

const handleCreateMessage = async (request: Request, response: Response) => {
  const { message } = request.body;
  const { user_id } = request;

  try {
    const result = await executeCreateMessages(message, user_id);

    return response.json(result);
  } catch (error) {
    return response.json({ error: error.message });
  }

}

export { handleCreateMessage };
