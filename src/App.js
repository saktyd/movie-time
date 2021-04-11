import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
const Main = lazy(() => import('./pages/Main'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div style={{height: '100%', width: '100%', backgroundColor: 'black'}}>Loading...</div>}>
        <Switch>
          <Route exact path="/:type?" component={Main} />
        </Switch>
      </Suspense>
      </Router>
  );
}

export default App;
