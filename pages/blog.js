import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import React from 'react';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.graphql.jobs/',
    fetch
  }),
  cache: new InMemoryCache()
});

function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      jobs(input: {type: "" slug: ""}) {
        title
        tags
        {
          name
        }
      }
    }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.jobs.map(({ title, tags }) => (
    <div key={title}>
      <p>
        {title}
      </p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
          <div>
            <p>Available GraphQL Jobs</p>
          </div>
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          <em>"If you would be a real seeker after truth, it is necessary that at least once in your life you doubt, as far as possible, all things."</em>
        </p>
        <p>-Rene Descartes</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <App />
    </Layout>
  )
}