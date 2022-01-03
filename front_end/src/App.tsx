import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { ChainId, Rinkeby, Kovan, DAppProvider } from "@usedapp/core";
import { Header } from "./components/Header";
import { Container } from "@material-ui/core";
import { Main } from "./components/Main";

function App() {
  return (
    <DAppProvider config={{ networks: [Kovan, Rinkeby] }}>
      <Header />
      <Container maxWidth="md">
        <div>Hi!</div>
        <Main></Main>
      </Container>
    </DAppProvider>
  );
}

export default App;
