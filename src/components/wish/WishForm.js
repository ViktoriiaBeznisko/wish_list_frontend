import React, { useState } from 'react';
import { connect } from 'react-redux'
// import { submitWishList, wishListChange, setWishLists, unsetWishList, setSelectedWishlists, updateWishList, deleteWishList, submitWish, wishChange, setWishes, setSelectedWish, updateWish, deleteWish, unsetWish } from '../../redux/actionCreators'


function WishForm(props) {

  // console.log(props.edit)
  // update value, 'props.edit ?.... - saved previos state (name) of wish
  const [input1, setInput1] = useState(props.edit ? props.edit.value1 : '');
  const [input2, setInput2] = useState(props.edit ? props.edit.value2 : '');

  const handleChange = e => {
    if (e.target.name === "text"){
      setInput1(e.target.value);
    } else {
      setInput2(e.target.value);
    }
    // console.log(e.target)
  };

  // prevent refresh of this page
  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
    // generate random number for id 
      id: Math.floor(Math.random() * 10000),
      text: input1,
      link: input2
    });
    setInput1('');
    setInput2('');
  };

  return (
    <form onSubmit={handleSubmit} className='wish-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your wish'
            value={input1}
            onChange={handleChange}
            name='text'
            className='wish-input edit'
          />
          <input
            placeholder='Update link'
            value={input2}
            onChange={handleChange}
            name='link'
            className='link-input edit'
          />
          <button onClick={handleSubmit} className='wish-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a wish'
            value={input1}
            onChange={handleChange}
            name='text'
            className='wish-input'
          />
          <input
            placeholder='Add a link'
            value={input2}
            onChange={handleChange}
            name='link'
            className='link-input'
          />
          <button onClick={handleSubmit} className='wish-button'>
            Add wish
          </button>
        </>
      )}
    </form>
  );
}




// export default connect(mapStateToProps, { submitWishList, wishListChange, setWishLists, unsetWishList, setSelectedWishlists, updateWishList, deleteWishList, submitWish, wishChange, setWishes, setSelectedWish, updateWish, deleteWish, unsetWish })(WishForm)
export default WishForm;