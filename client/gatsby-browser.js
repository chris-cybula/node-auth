import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { store } from './src/store';
import { Helmet } from "react-helmet"

const GlobalStyle = createGlobalStyle`

  body {
    background-color: #35363A;
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 300;   
    /* display: flex;
    justify-content: center; */
  }

  a {
    color: white;
  }
`;

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;700&display=swap" rel="stylesheet"/>
      </Helmet>
      <GlobalStyle />
      <Provider store={store}>{element}</Provider>
    </>
  );
}