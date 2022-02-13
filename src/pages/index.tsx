// import { GetServerSideProps } from "next";
import { GetStaticProps } from "next";
import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "../styles/home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      {/* Tudo que for adicionado a esse Header, será também vinculado ao Header do _document.tsx */}
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>
              for{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.amount)}{" "}
              month
            </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

/*

  -> getServerSideProps: O servidor node no Next faz uma requisição ao servidor, monta a página antes de apresentar ao browser. Toda vez
                         que a página for aberta, o next busca no servidor e faz essa montagem da página.

  -> getStaticProps: Cria um arquivo de cache e deixa salvo ne servidor, para que não haja requisição ao servidor em toda abertura da página,
                     após passar o tempo do revalidate, na proxima abertura um novo arquivo é criado e salvo no next, substituindo o antigo.
*/

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K2um3Gn5CgYL8XmCxMCWYT9", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24hours
  };
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve("price_1K2um3Gn5CgYL8XmCxMCWYT9", {
//     expand: ["product"],
//   });

//   const product = {
//     priceId: price.id,
//     amount: price.unit_amount / 100,
//   };

//   return {
//     props: {
//       product,
//     },
//   };
// };
