import React from 'react';

import Header from './components/main/Header';
import { routes } from './constants/index';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {

  let routerComponent = routes.map((_item, _value) => 
      <Route key={_value} path={_item.routeUrl} exact component={_item.component} />);
  
  return (
    <div className="App">
      <Router>
      <Header />
        <div className="container">
          {routerComponent}
        </div>
      </Router>
    </div>
  );
}

export default withRouter(App);
