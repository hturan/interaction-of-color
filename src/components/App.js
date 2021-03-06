import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Contents from './Contents';
import IV from './IV';
import V from './V';
import Sandbox from './Sandbox';

class App extends Component {
  render() {
    const basename =
      process.env.NODE_ENV === 'production' ? '/interaction-of-color' : '';
    return (
      <Router basename={basename}>
        <main>
          <Route exact path="/" component={Contents} />
          <Route path="/iv" component={IV} />
          <Route path="/v" component={V} />
          <Route path="/sandbox" component={Sandbox} />
        </main>
      </Router>
    );
  }
}

export default App;
