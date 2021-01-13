import './App.css';
import WishList from './components/wish/WishList';
import Login from './components/authentication/Login';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setWishLists, autoLogin, logout } from './redux/actionCreators';
import { Switch, Route } from 'react-router-dom'


// function App() {
//   return (

//     <div className="wish-list">
//       <WishList />
//     </div>
//   );
// }

// export default App;



class App extends Component  {

  componentDidMount(){
    localStorage.token && this.props.autoLogin()
    this.props.setWishLists()
  }

  render(){
    return (
      <>
        <h1> WISH LISTS COLLECTION </h1>
        {this.props.user.id
        ?
          <>
          <button onClick={this.props.logout}>Logout!</button>
          <Switch>
            <Route path="/wish_lists" component={WishList}/>
            {/* need ro add link to WISH LIST  so user can create ne one */}
          </Switch>


          </>
        :
          <Login/>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({user: state.user})

export default connect(mapStateToProps, { setWishLists, autoLogin, logout })(App);


