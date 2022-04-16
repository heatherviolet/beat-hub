import Nav from "./components/Nav";
<<<<<<< HEAD
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
=======
>>>>>>> origin/develop
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

// establish graphql uri
const httpLink = createHttpLink({
  uri: "/graphql",
});

// get the token from local storage if it exists
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// create a new apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header d-flex align-items-start justify-content-start">
            <Nav />
          </header>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/search" />
            <Route exact path="/profile" />
<<<<<<< HEAD
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            
=======
>>>>>>> origin/develop
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
