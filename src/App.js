import React, {useEffect} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import {connect} from 'react-redux';
import {getUser} from './redux/reducer';

function App(props) {

  useEffect(() => {
    props.getUser()
  },[]);

  return (
    <div className="App">
      <Nav search={props.search}/>
      {routes}
    </div>
  );
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(App);
