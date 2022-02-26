/*
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <div style={{ height: 700, width: '100%' }}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Bienvenido a <a href="http://itelvox.com">Itelvox!</a>
        </h1>

        <p className="description">
          Validación de Caller ID <code>asterisk/callerid</code>
        </p>

        <div className="grid">
          <Link href="/postman/basic">
          <a className="card">
            <h3>Proveedores VoIP &rarr;</h3>
            <p>Parámetros de red y enrutamiento por proveedor VoIP.</p>
          </a>
          </Link>

          <Link href="/postman/execute">
          <a className="card">
            <h3>Ejecutar Matrix &rarr;</h3>
            <p>Programar la ejecución de una matrix de llamadas</p>
          </a>
          </Link>

          <Link href="/postman/matrix">
          <a className="card">
            <h3>Matrix de llamadas &rarr;</h3>
            <p>Crear una matrix de llamadas por proveedor y los números destinos implementados.</p>
          </a>
          </Link>

          <Link href="/postman/busqueda">
          <a className="card">
            <h3>Busqueda &rarr;</h3>
            <p>
              Buscar los resultados de las pruebas de Caller ID.
            </p>
          </a>
          </Link>

        </div>
      </main>

      <footer>
        <a
          href="http://itelvox.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
*/

import { useSelector } from "react-redux";
import Head from "next/head";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from '../components/Login/Login';
import Layout from "../components/layout";
import Home from "./Home";

const Index  =(pageProps)=>{

  console.log('porps in Index ',pageProps)

  const userState = useSelector((state) => state);
  let isLogin = false;
  if(Object.keys(userState).length !== 0){
    if (userState.loggedIn){
      isLogin = true
    }
  }

  return (
      <>

        { ! isLogin ? (
            <Login {...pageProps} />

        ) : (
            <>
              <Layout/>
              <Home {...pageProps} />

            </>

          )}

      </>

  );
}
export default Index ;