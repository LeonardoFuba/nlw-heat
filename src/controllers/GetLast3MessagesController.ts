import { Request , Response } from "express";
import { execute } from "../services/GetLast3Messages";

const handleGetLast3Messages = async (request: Request, response: Response) => {
  try {
    const result = await execute();

    return response.json(result);
  } catch (error) {
    response.json({ error: error.message });
  }
}

export { handleGetLast3Messages };
