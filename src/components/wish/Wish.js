import React, { useState,useRef } from 'react';
import WishForm from './WishForm';
import { RiCloseCircleLine, RiContactsBookLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import {NavLink} from "react-router-dom";
import classes from './ALL_wishs.module.css';
import {BiInfoCircle} from "react-icons/all";

const Wish = ({ wishes, completeWish, removeWish, updateWish,...props }) => {
  const [edit, setEdit] = useState({
    id: null,
    text: '',
    link: ''
  });
  const submitUpdate = value => {
    console.log(value)
    updateWish(edit.id, {text : value.text, link : value.link});
    setEdit({
      id: null,
      text: '',
      link: ''
    });
  };

  if (edit.id) {
    return <WishForm edit={edit} onSubmit={submitUpdate} />;
  }


  if (props.url){
    console.log(wishes)
    // console.log(wishes[props.url])
    return <WishItem main={wishes[props.url]} index={props.url}
                     completeWish = {completeWish} removeWish={removeWish} updateWish={updateWish} />
  }
  //__main__
  return wishes.map((wish, index) => (
    // wishItem(wish,index)
      <WishItem main={wish} index={index} key={index}
                completeWish = {completeWish} removeWish={removeWish} updateWish={updateWish} setEdit={setEdit}/>
  ));
};

const WishItem = (wish) => {
  const inputRef = useRef(null)
  function copytext() {
    inputRef.current.select()
    document.execCommand("copy");
  }
  const createLink = (index) => {
    console.log(index+"CREATE_LINK")
    return `localhost:3000/wish_lists/${index}`
  }
  return(
      <div
          className={classes.wish_ITEM}
          key={wish.index}
      >
        <div key={wish.id} >
          {/*onClick={() => completeWish(wish.id)}*/}
          <div className={classes.wish_ITEM_titleBlock}>
          <h4 className={classes.wish_ITEM_text}>{wish.main.text} </h4>
          {/*&nbsp;*/}
          <a href={wish.main.link} target="_blank" className={classes.wish_ITEM_link}>{wish.main.link}</a></div>

        </div>
        <div className={classes.wish_ITEM_text_icons}>
          <div className={classes.wish_ITEM_text_icons_copyBlock}>
          <span onClick={copytext} className={classes.item_copy}>Copy link</span>
          {/*hidden input for copy value, dont touch*/}
          <input type="text" className={classes.none_display} value={createLink(wish.index)} ref={inputRef} readOnly/>
          </div>
          <div className={classes.wish_ITEM_text_icons_innerBlock}>
          <NavLink to={`/wish_lists/${wish.index}`}><BiInfoCircle className={classes.wish_ITEM_text_icons_editIcon} /></NavLink>

          <TiEdit
              onClick={() => wish.setEdit({ id: wish.main.id, value1: wish.main.text, value2: wish.main.link  })}
              className={classes.wish_ITEM_text_icons_editIcon}
          />
          <RiCloseCircleLine
            onClick={() => wish.removeWish(wish.main.id)}
            className={classes.wish_ITEM_text_icons_deleteIcon}
        /></div>


        </div>
      </div>
  )
}

export default Wish;