import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect } from 'react-router-dom';



import './App.css';
import './styles/style.sass';
import BoardsPage from './components/boards/';
import ListsPage from './components/b/';
import SignUp from './components/signup/';
import LogIn from './components/login/';


class App extends Component {
  render() {
    return (<>
      <BrowserRouter>
        
        <div className="App">
          <Route path='/boards' component={BoardsPage}/>
          <Route path='/b/:id' component={ListsPage}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={LogIn}/>
          <Route exact path="/" render={() => ( <Redirect to="/login"/>)}/>
        </div>
      </BrowserRouter>
    </>
    );
  }
}

export default App;
