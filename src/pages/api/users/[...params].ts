import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  //pegando vários parametros via URL

  //http://localhost:3000/api/users/edit/1/banana

  console.log(request.query.params); //{params:['edit',1,'banana']}

  return response.json({ params: request.query.params });
};
