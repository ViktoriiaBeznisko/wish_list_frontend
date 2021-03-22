import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { sendSignup, sendLogin} from '../../redux/actionCreators'
import {NavLink, Redirect} from 'react-router-dom';
import classes from './Login.module.css';
import {useFormik} from "formik";
import {LoginVal} from "../../validators";
const Login = ({signup}) => {
  const onSubmit = async data => {
    const callback = signup ? sendSignup : sendLogin
    const response = await dispatch(callback(data))
    if (response) setErrors(signup ? 'User exists' : 'Wrong username or password' )
  }
  const initialValues = {username: '',password : '',passwordConfirmation : ''}
  const {handleSubmit,handleChange,values,errors} = useFormik({initialValues,onSubmit,
    validate : LoginVal(signup)})
  const {id} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [requestErr,setErrors] = useState('')
  if (id) return <Redirect to={'/mainpage'}/>
  return(
      <>
        <div>
          <h2 className={classes.title+' '+classes.titleFirst}>{!signup ? 'Hello.' : null}</h2>
          <h2 className={classes.title}>{!signup ? 'Welcome back' : 'Register'}</h2>
          <div className={classes.loginBlock}>
            <h4 className={classes.inputTitle}>Name:</h4>
            <input type="text" name="username" value={values.username} onChange={handleChange}
                   className={classes.input} autoComplete={'off'}  />
            <h4 className={classes.inputTitle}>Password:</h4>
            <input type="password" name="password" value={values.password}
                   onChange={handleChange} className={classes.input} autoComplete={'off'} />
            {signup && <h4 className={classes.inputTitle}> Password Confirmation:</h4>}
            {signup &&
            <input type="password" name="passwordConfirmation"
                   value={values.passwordConfirmation} onChange={handleChange}
                   className={classes.input} autoComplete={'off'}/>}
            <NavLink to={signup ? '/login' : 'signup'}>
              <button  className={classes.orSignUp}>
                {signup ? "Login" : "Register"}</button></NavLink>
            <button className={!signup ? classes.loginButton : classes.registerButton} onClick={handleSubmit}>
              {!signup ? "Login" : "Register"}
            </button>
            <span className={classes.error}>{requestErr || errors.error}</span>
          </div>
        </div>
        <br/>
        <br/>
      </>
  )
}


export default Login