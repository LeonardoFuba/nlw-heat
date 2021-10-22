import { Request , Response } from "express";
import { executeGet3LastMessages } from "../services/GetLast3Messages";

const handleGetLast3Messages = async (request: Request, response: Response) => {
  try {
    const result = await executeGet3LastMessages();

    return response.json(result);
  } catch (error) {
    return response.json({ error: error.message });
  }
}

export { handleGetLast3Messages };
