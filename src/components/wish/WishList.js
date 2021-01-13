import React, { useState } from 'react';
import WishForm from './WishForm';
import Wish from './Wish';
import { connect } from 'react-redux'
import { submitWishList, wishListChange, setWishLists, unsetWishList, setSelectedWishlists, updateWishList, deleteWishList, submitWish, wishChange, setWishes, setSelectedWish, updateWish, deleteWish, unsetWish } from '../../redux/actionCreators'

function WishList() {
  const [wishes, setWishes] = useState([]);

  const addWish = wish => {
    if (!wish.text || /^\s*$/.test(wish.text)) {
      return;
    }
    // pass wish to the array
    const newWishes = [wish, ...wishes];

    // setting value to the new wish
    setWishes(newWishes);
    // console.log(...wishes);
  };

  const updateWish = (wishId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setWishes(prev => prev.map(item => (item.id === wishId ? newValue : item)));
  };

    // checking in an actual array 
  const removeWish = id => {
    const removedArr = [...wishes].filter(wish => wish.id !== id);

    setWishes(removedArr);
  };

  const completeWish = id => {
    let updatedWishes = wishes.map(wish => {
      if (wish.id === id) {
        // true or faults
        wish.isComplete = !wish.isComplete;
      }
      return wish;
    });
    setWishes(updatedWishes);
  };

  return (
    <>
      <h1>Baby shower wish list</h1>
      <WishForm onSubmit={addWish} />
      <Wish
        wishes={wishes}
        completeWish={completeWish}
        removeWish={removeWish}
        updateWish={updateWish}
      />
    </>
  );  
}

const mapStateToProps = (state) => ({
  ...state.wishLists.getWishLists,
  user: state.user
})

export default connect(mapStateToProps, { submitWishList, wishListChange, setWishLists, unsetWishList, setSelectedWishlists, updateWishList, deleteWishList, submitWish, wishChange, setWishes, setSelectedWish, updateWish, deleteWish, unsetWish })(WishList)


// export default WishList;