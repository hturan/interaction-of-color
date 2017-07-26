import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Contents from './Contents';
import IV from './IV';
import V from './V';

class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <Route exact path="/" component={Contents} />
          <Route path="/iv" component={IV}/>
          <Route path="/v" component={V}/>
        </main>
      </Router>
    );
  }
}

export default App;
