import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    //CRIANDO CONTA DO USUARIO NO STRIPE

    //Acessar dados do usuario nos cookies
    const session = await getSession({ req: request });

    console.log(session);

    const stiperCustomer = await stripe.customers.create({
      email: session.user.email,
    });

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stiperCustomer.id,
      payment_method_types: ["card"],
      billing_address_collection: "required", //preencher endereço
      line_items: [
        {
          price: "price_1K2um3Gn5CgYL8XmCxMCWYT9",
          quantity: 1,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    response.setHeader("Allow", "POST");
    response.status(405).end("Method not allowed");
  }
}
