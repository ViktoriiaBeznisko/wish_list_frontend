import React from 'react'
import { connect } from 'react-redux'
import { toggleSignup, handleLoginFormChange, sendSignup, sendLogin } from '../../redux/actionCreators'

const Login = (props) => {
  const { signup, toggleSignup, form, handleLoginFormChange, sendSignup, sendLogin } = props
  const { username, password, passwordConfirmation } = form

  const onSubmit = (e) => {
    e.preventDefault()
    if (signup){
      if (password == passwordConfirmation){
        sendSignup({username: username, password: password})
      } else {
        alert("Passwords don't match!")
      }
    } else {
      sendLogin({username: username, password: password})
    }
  }

  return(
    <>
      <h3>{signup ? "Sign up!" : "Login!"} </h3>
      <form onSubmit={ onSubmit }>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={handleLoginFormChange} />
        </label><br/>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={handleLoginFormChange} />
        </label><br/>
        {signup &&
          <>
            <label>
              Password Confirmation:
              <input type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={handleLoginFormChange} />
            </label>
          </>
        }
        <br/>
        <input type="submit" value="Submit" />
      </form>
      <br/>
      <br/>
      <button onClick={toggleSignup}>Or... {signup ? "Login!" : "Sign up!"}</button>
    </>
  )
}

const mapStateToProps = (state) => ({
  signup: state.user.signup,
  form: state.user.loginForm
})

export default connect(mapStateToProps, { toggleSignup, handleLoginFormChange, sendSignup, sendLogin })(Login)