import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Calculator from './component/Calculator'
import Review from './component/Review'
import {BrowserRouter,Route, Redirect,Switch} from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route  exact path="/" component={Calculator}/>
        <Route path="/review" component={Review}/>

      </BrowserRouter>
        
    </div>
  );
}

export default App;
