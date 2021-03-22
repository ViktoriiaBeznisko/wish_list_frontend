export const LoginVal = isReg => values => {
    const errors = {};
    if (!values.username) errors.error = 'Username is required'
    if (!values.password) errors.error = 'Password is required';
    if (isReg && values.passwordConfirmation!==values.password) errors.error = 'Passwords does not match'
    return errors
}