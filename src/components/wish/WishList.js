import React, { useState,useRef } from 'react';
import WishForm from './WishForm';
import Wish from './Wish';
import {connect, useDispatch, useSelector} from 'react-redux'
import {
  wishListChange,
  setWishLists,
  unsetWishList,
  setSelectedWishlists,
  deleteWishList,
  submitWish,
  wishChange,
  setWishes,
  setSelectedWish,
  updateWish,
  deleteWish,
  unsetWish,
  logout,
  setAllWishes, clearSelectedWishLists
} from '../../redux/actionCreators'
import {NavLink, Redirect, withRouter} from 'react-router-dom';
import {useEffect} from 'react';
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import classes from './ALL_wishs.module.css';

//ALL_REDUCER_MODULE

function WishList(props) {

  const [changeList,openChangeList] = useState(false);
  const [wishes, setWishes] = useState(props.wishLists);
  useEffect(mount,[])
  const dispatch = useDispatch()
  const selected = useSelector(state => state.wish_lists.selectedWishLists)
  // const selected = useSelector(state => state.wish_lists.setSelectedWish)
  if (!props.user.id){
    return <Redirect to={'/login'} />
  }
  function mount()
  {
    // props.setWishLists()
  }

  const addWish = wish => {
    if (!wish.text || /^\s*$/.test(wish.text)) {
      return;
    }
    // pass wish to the array
    const newWishes = [...wishes,wish];
    
    props.submitWish(newWishes)
    // setting value to the new wish
    setWishes(newWishes);
  };


  const updateWish = (wishId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const newArray = wishes.map(item => {
      //ITEM ID debug
      if (item.id == wishId){
        return {...item,...newValue}
      }
      return item
    })
    setWishes(newArray)
  };
    // checking in an actual array 
  const removeWish = id => {
    const removedArr = [...wishes].filter(wish => wish.id !== id);
    dispatch(setAllWishes(removedArr))
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
  const changeWishList = (value) => {
    // debugger
    props.wishListChange({name : value}, selected.id)
    openChangeList(false)
  }
  if (!selected.id && selected.id!==0) return <Redirect to={'/mainpage'} />
  return (
    <>
      <div className={classes.firstBlock}>
      <button onClick={props.logout} className={classes.logout}>Logout!</button>
      <button onClick={() => dispatch(clearSelectedWishLists())} className={classes.logout}>Exit!</button>
      <h1 className={classes.title}> Details:</h1>
    </div>
      <h1 className={classes.listNAME}>{props.list_name}</h1>
      <button onClick={() => openChangeList(!changeList)} className={classes.changelist}>Change list name</button>
      {changeList && <ChangeList send={changeWishList}/>}
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

export const ChangeList = ({send}) => {
  const ref = useRef()
  return (
     <div className={classes.changeInput}>
       <h4 className={classes.changeInput_title}>Name:</h4>
       <input type="text" ref={ref} className={classes.changeInput_input}
       placeholder={'Name'}/>
       <button onClick={() => send(ref.current.value)} className={classes.changeInput_send}>Done</button>
     </div>
  )
}

const mapStateToProps = (state) => ({
  wishLists : state.wish_lists.wishLists,
  user: state.user,
  list_name : state.wish_lists.selectedWishLists.name
  // list_name : state.wish_lists.name
})

export default compose(connect(mapStateToProps, { wishListChange,
  setWishLists, unsetWishList, setSelectedWishlists,
  deleteWishList, submitWish, wishChange,
  setWishes, setSelectedWish, updateWish, deleteWish,
  unsetWish ,logout}),withRouter)(WishList)

