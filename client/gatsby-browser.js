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
  }

  a {
    color: white;
  }

  input {
    width: 280px;
    height: 32px;
    border-radius: 5px;
    border: none;
    font-size: 14px;
    padding: 0 10px;
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
    outline: none;
    height: 32px;
    border-radius: 5px;
    cursor: pointer;
    width: 300px;
    background-color: #8DCBF5;
    padding: 0 10px;
    margin-bottom: 20px;
  }

  button:hover {
    opacity: .9;
  }
`;

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet"/>
      </Helmet>
      <GlobalStyle />
      <Provider store={store}>{element}</Provider>
    </>
  );
}