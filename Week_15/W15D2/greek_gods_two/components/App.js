import React from "react";
import { Route, Switch } from 'react-router-dom';
import GodsList from './gods/GodsList';
import Create from './create/create.js'
import Nav from './nav/nav'
import GodDetail from './gods/GodDetail'

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/god/:id" component={GodDetail} />
        <Route exact path="/new" component={Create} />
        <Route exact path="/" component={GodsList} />
      </Switch>
    </div>
  );
};
// 5e2899514b9caf1280c89845
export default App;