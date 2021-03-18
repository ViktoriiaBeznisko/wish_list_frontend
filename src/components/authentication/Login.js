import React,{useState} from 'react'
import { connect } from 'react-redux'
import { toggleSignup, handleLoginFormChange, sendSignup, sendLogin ,setWishLists} from '../../redux/actionCreators'
import {Redirect} from 'react-router-dom';
import classes from './Login.module.css';
const Login = (props) => {
  const { signup, toggleSignup, form, handleLoginFormChange, sendSignup, sendLogin } = props
  const { username, password, passwordConfirmation } = form
  const [errors,setErrors] = useState('')
  if (props.username){
    return <Redirect to={'/mainpage'}/>
  }
  const onSubmit = async e => {
    e.preventDefault()
    if (signup){
      if (password == passwordConfirmation){
        const response = await sendSignup({username: username, password: password})
        setErrors('User exists')

      }
    }
    else {
      const response = await sendLogin({username: username, password: password})
      setErrors('Wrong username or password')
    }
  }
  const toggle  = (e) => {
    e.preventDefault()
    toggleSignup()
  }

  return(
    <>
      <form onSubmit={ onSubmit } className={classes.main}>
        <h2 className={classes.title+' '+classes.titleFirst}>{!signup ? 'Hello.' : null}</h2>
        <h2 className={classes.title}>{!signup ? 'Welcome back' : 'Register'}</h2>
        <div className={classes.loginBlock}>
          <h4 className={classes.inputTitle}>Name:</h4>
          <input type="text" name="username" value={username} onChange={handleLoginFormChange} className={classes.input} autoComplete={'off'}  />
          <h4 className={classes.inputTitle}>Password:</h4>
          <input type="password" name="password" value={password} onChange={handleLoginFormChange} className={classes.input} autoComplete={'off'} />
          {signup && <h4 className={classes.inputTitle}> Password Confirmation:</h4>}
          {signup &&
          <input type="password" name="passwordConfirmation"
                                          value={passwordConfirmation} onChange={handleLoginFormChange}
                                          className={classes.input} autoComplete={'off'}/>}
          <button onClick={toggle} className={classes.orSignUp}>{signup ? "Login" : "Register"}</button>
          <input type="submit" value={!signup ? "Login" : "Register"} className={!signup ? classes.loginButton : classes.registerButton} />
          {errors && <span className={classes.error}>{errors}</span>}
        </div>
      </form>
      <br/>
      <br/>
    </>
  )
}

const mapStateToProps = (state) => ({
  signup: state.user.signup,
  form: state.user.loginForm,
  username : state.user.username
})

export default connect(mapStateToProps, { toggleSignup, handleLoginFormChange, sendSignup, sendLogin ,setWishLists})(Login)