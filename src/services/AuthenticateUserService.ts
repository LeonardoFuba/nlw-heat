import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

/**
 * Receber code(string)
 * Recuperar access_token no Github
 * Recuperar infos do user no Github
 * Verificar se o user existe no DB
 * --> SIM = Gera um token
 * --> NÃO = Cria no DB, gera um token
 * Retorna o token com as infos do user
 */

interface IAccessTokenResponse {
  access_token: string;
  token_type: "bearer";
  scope: string;
}

interface IUserResponse {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

const execute = async (code: string) => {
  const url = "https://github.com/login/oauth/access_token"

  const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(
    url,
    null, {
    params: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    headers: {
      "Accept": "application/json"
    }
  })

  const { data } = await axios.get<IUserResponse>("https://api.github.com/user", {
    headers: {
      authorization: `Bearer ${accessTokenResponse.access_token}`
    }
  });

  const { login, id, avatar_url, name } = data;

  let user = await prismaClient.user.findFirst({
    where: {
      github_id: id
    }
  })

  if(!user) {
    user = await prismaClient.user.create({
      data: {
        name,
        github_id: id,
        avatar_url,
        login,
      }
    })
  }

  const token = sign(
    {
      user: {
        id: user.id,
        name: user.name,
        avatar_url: user.avatar_url,
      }
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: "1d"
    },
  )

  return { token, user };
}

export { execute };
