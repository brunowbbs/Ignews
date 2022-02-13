/**
 * API Routes
 * Todo arquivo criado dentro desse diretorio "api" será uma rota do backend
 * http://localhost:3000/api/users
 */

import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {
      id: 1,
      name: "Wesley",
    },
    {
      id: 2,
      name: "Bruno",
    },
    {
      id: 3,
      name: "João",
    },
  ];

  return response.json(users);
};
