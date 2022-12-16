import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import Banner from './components/headers/Banner'


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <Banner />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
