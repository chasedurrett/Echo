import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedCreatePost = (props) => {
  const {path, component} = props
  return  (
    props.isLoggedIn ? <Route path={path} component={component}/> : <Redirect to="/"/>
  ) 
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(ProtectedCreatePost);