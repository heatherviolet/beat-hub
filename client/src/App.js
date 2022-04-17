import Nav from "./components/Nav";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Footer from "./components/Footer";

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
          <header className="d-flex align-items-start justify-content-start">
            <Nav />
          </header>
          <main className="d-flex justify-content-start px-4">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
