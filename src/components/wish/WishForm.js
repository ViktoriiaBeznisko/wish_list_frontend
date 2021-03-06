import React, { useState } from 'react';
// import { connect } from 'react-redux'
// import {Field,reduxForm} from "redux-form";
import classes from './wish_form.module.css';



function WishForm(props) {
  const [input1, setInput1] = useState(props.edit ? props.edit.value1 : '');
  const [input2, setInput2] = useState(props.edit ? props.edit.value2 : '');
  const handleChange = e => {
    if (e.target.name === "text"){
      setInput1(e.target.value);
    } else {
      setInput2(e.target.value);
    }
  };

  // prevent refresh of this page
  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      // id: Math.floor(Math.random() * 10000),
      text: input1,
      link: input2,
    });
    setInput1('');
    setInput2('');
  };
  return (
    <form onSubmit={handleSubmit} className={classes.main}>
      <h2 className={classes.title}>{props.edit ? 'Change Wish Name:' : 'Add wish:'}</h2>
      {props.edit ? (

          <div className={classes.addBlock}>
            <div className={classes.row1}>
              <input
                  placeholder='Update your wish'
                  value={input1}
                  onChange={handleChange}
                  name='text'
                  className={classes.input}
                  autoComplete={'off'}
              />
              <input
                  placeholder='Update link'
                  value={input2}
                  onChange={handleChange}
                  name='link'
                  className={classes.input}
                  autoComplete={'off'}
              /></div>
            <div className={classes.row2}>
              <button onClick={handleSubmit} className={classes.button}>
                Update
              </button>
            </div>
          </div>
      ) : (
        <div className={classes.addBlock}>
          <div className={classes.row1}>
          <input
            placeholder='Add a wish'
            value={input1}
            onChange={handleChange}
            name='text'
            className={classes.input}
            autoComplete={'off'}
          />
          <input
            placeholder='Add a link'
            value={input2}
            onChange={handleChange}
            name='link'
            className={classes.input}
            autoComplete={'off'}
          /></div>
          <div className={classes.row2}>
          <button onClick={handleSubmit} className={classes.button}>
            Add wish
          </button>
          </div>
        </div>


      )}
    </form>
  );
}



export default WishForm;

