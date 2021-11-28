import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./login";
import Register from "./register";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
