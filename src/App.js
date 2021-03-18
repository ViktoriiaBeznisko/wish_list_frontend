import './App.css';
import WishList from './components/wish/WishList';
import Login from './components/authentication/Login';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setWishLists, autoLogin, logout } from './redux/actionCreators';
import { Switch, Route } from 'react-router-dom'
import {Redirect} from 'react-router-dom';
import {useEffect} from 'react';
import WishListsMain from "./components/wish_lists/List";


const App = function(props){
  useEffect(component_did_mount,[])
  function component_did_mount(){
    localStorage.token && props.autoLogin()
    props.setWishLists()}
    return (
      <>
        {!props.user.id && <Redirect to={'/login'}/> }
          <Switch>
            <Route path="/wish_lists/:wish_list_ID?" component={WishList}/>
            {/* need ro add link to WISH LIST  so user can create ne one */}
            <Route path={'/login'} component={Login}/>
            <Route path={'/mainpage'} component={WishListsMain}/>
          </Switch>

      </>
    );
  }


const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps, { setWishLists, autoLogin, logout })(App);

