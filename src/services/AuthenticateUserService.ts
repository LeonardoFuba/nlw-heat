import axios from "axios";

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

  return data;
}

export { execute };