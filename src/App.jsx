import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Home} from './components/home/Home';
import {MovieDetail} from './components/moviedetail/MovieDetail';
import ScrollToTop from './utils/ScrollToTop';

export function App() {
  return (
      <main>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/movie/:id" component={MovieDetail} exact/>
        </Switch>
        <ScrollToTop />
      </main>
  );
}

export default App;
