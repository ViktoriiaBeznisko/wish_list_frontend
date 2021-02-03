import React, { useState,useRef } from 'react';
import WishForm from './WishForm';
import Wish from './Wish';
import { connect } from 'react-redux'
import {
  submitWishList,
  wishListChange,
  setWishLists,
  unsetWishList,
  setSelectedWishlists,
  updateWishList,
  deleteWishList,
  submitWish,
  wishChange,
  setWishes,
  setSelectedWish,
  updateWish,
  deleteWish,
  unsetWish,
  logout
} from '../../redux/actionCreators'
import {NavLink, Redirect, withRouter} from 'react-router-dom';
import {useEffect} from 'react';
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import classes from './ALL_wishs.module.css';

//ALL_REDUCER_MODULE

function WishList(props) {
  console.log(props)
  // debugger
  //match.params.wish_list_ID
  const [changeList,openChangeList] = useState(false);
  const [wishes, setWishes] = useState(props.wishLists);
  useEffect(mount,[])
  // debugger
  if (!props.user.id){
    return <Redirect to={'/login'} />
  }
  function mount(){
    props.setWishLists()
  }

  const addWish = wish => {
    if (!wish.text || /^\s*$/.test(wish.text)) {
      return;
    }
    // pass wish to the array
    // debugger
    const newWishes = [...wishes,wish];
    submitWish(newWishes)
    // setting value to the new wish
    setWishes(newWishes);
    // console.log(...wishes);
  };

  const updateWish = (wishId, newValue) => {
    // debugger
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    // debugger

    const newArray = wishes.map(item => {
      console.log(item)
      //ITEM ID debug
      if (item.id == wishId){
        return {...item,...newValue}
      }
      return item
    })

    // console.log(newArray)
    setWishes(newArray)
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
  console.log('TRUE')
  const send_change_list_value = (value) => {
    props.wishListChange(value)
    openChangeList(false)
  }
  return (
    <>
      <div className={classes.firstBlock}>
      <button onClick={props.logout} className={classes.logout}>Logout!</button>
      <h1 className={classes.title}> WISH LISTS COLLECTION </h1>
    </div>
      <h1 className={classes.listNAME}>{props.list_name}</h1>
      <button onClick={() => openChangeList(!changeList)} className={classes.changelist}>Change list name</button>
      {changeList && <ChangeList send={send_change_list_value}/>}
      <div className={classes.wishBlockImportant}>
      <Wish
        wishes={wishes}
        completeWish={completeWish}
        removeWish={removeWish}
        updateWish={updateWish}
        url={props.match.params.wish_list_ID}
      /> </div>
      <WishForm onSubmit={addWish}/>

    </>
  );  
}

const ChangeList = (props) => {
  const ref = useRef()
  const send = () => {
    props.send(ref.current.value)
  }
  return (
     <div className={classes.changeInput}>
       <h4 className={classes.changeInput_title}>Name:</h4>
       <input type="text" ref={ref} className={classes.changeInput_input}
       placeholder={'Name'}/>
       <button onClick={send} className={classes.changeInput_send}>Change!</button>
     </div>
  )
}

const mapStateToProps = (state) => ({
  wishLists : state.wish_lists.wishLists,
  user: state.user,
  list_name : state.wish_lists.wishListName
  // list_name : state.wish_lists.name
})

export default compose(connect(mapStateToProps, { submitWishList
  , wishListChange, setWishLists, unsetWishList, setSelectedWishlists,
  updateWishList, deleteWishList, submitWish, wishChange,
  setWishes, setSelectedWish, updateWish, deleteWish,
  unsetWish ,logout}),withRouter)(WishList)


// export default WishList;