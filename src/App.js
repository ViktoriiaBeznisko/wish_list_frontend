import './App.css';
import WishList from './components/wish/WishList';
import Login from './components/authentication/Login';
import React, { Component } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import { setWishLists, autoLogin, logout } from './redux/actionCreators';
import { Switch, Route } from 'react-router-dom'
import {Redirect} from 'react-router-dom';
import {useEffect} from 'react';
import WishListsMain from "./components/wish_lists/List";


const App = function(){
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  useEffect(component_did_mount,[])
  function component_did_mount(){
    localStorage.token && dispatch(autoLogin())
    dispatch(setWishLists())}
  return (
      <>
        {!user.id && <Redirect to={'/login'}/> }
        <Switch>
          <Route path="/wish_lists/:wish_list_ID?" component={WishList}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/signup'} component={() => <Login signup={true}/>}/>
          <Route path={'/mainpage/:id?'} component={WishListsMain}/>
        </Switch>

      </>
  );
}



export default App
