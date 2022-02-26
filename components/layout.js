/* /components/Layout.js */

import React from "react";
import Head from "next/head";
import Link from "next/link";

import { Container, Nav, NavItem } from "reactstrap";
import { useSelector ,useDispatch} from "react-redux";

export const siteTitle = "Welcome to Itelvox";

export default function Layout(props) {
  console.log('props in component layout',props)
  //const title = "Welcome to Itelvox";

  let handleClick;
  const dispatch = useDispatch();

  handleClick = e => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
    });
    //props.history.push("/");
    window.location.assign ('/');

  };

  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <style jsx>
          {`
            a {
              color: white;
            }
          `}
        </style>
        <Nav className="navbar navbar-dark bg-dark">
          <NavItem>
            <Link href="/">
              <a className="navbar-brand">Home</a>
            </Link>
          </NavItem>
          {/*
          <NavItem className="ml-auto">
            <Link href="/login">
              <a className="nav-link">Sign In</a>
            </Link>
          </NavItem>
          */}

          <NavItem>
            <Link href="#">
              <a className="nav-link" onClick={handleClick} > Logout</a>
            </Link>
          </NavItem>
        </Nav>
      </header>
      <Container>{props.children}</Container>
    </div>
  );
}

