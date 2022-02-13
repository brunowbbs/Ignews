import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  //pegando parametro via URL
  const idUser = request.query.user;

  return response.json({ user: idUser });
};
