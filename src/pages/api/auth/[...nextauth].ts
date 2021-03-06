import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: "read:user" } },
    }),
  ],
  callbacks: {
    //função executada ao realizar o login
    async signIn({ user, account, profile, email }) {
      //console.log(user);

      try {
        //Salvando o usuário no Banco de dados Faunadb.

        await fauna.query(
          //Se não existir um usuario com o email
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("user_by_email"), q.Casefold(user.email))
              )
            ),

            //IF Faça o cadastro do usuario
            q.Create(q.Collection("users"), { data: { email: user.email } }),

            //ELSE
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
