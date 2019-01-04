import React, { Component } from 'react';
import Searchbar from './container/searchbar';
import ResultsPage from './container/resultsPage';
import SelectionPage from './container/selectionLandingPage';
import { Route, BrowserRouter } from 'react-router-dom';
import './style.css';



class App extends Component {
  render() {
    return (
      <BrowserRouter className='main_page'>
        <div className="App container main_page" >
            <Searchbar />
            <Route exact path = '/results' component = {ResultsPage} />
            <Route path = '/restaurant_landing' component = {SelectionPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
