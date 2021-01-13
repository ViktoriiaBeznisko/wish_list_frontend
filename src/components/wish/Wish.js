import React, { useState } from 'react';
import WishForm from './WishForm';
import { RiCloseCircleLine, RiContactsBookLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Wish = ({ wishes, completeWish, removeWish, updateWish }) => {
  const [edit, setEdit] = useState({
    id: null,
    text: '',
    link: ''
  });

  const submitUpdate = value => {
    console.log(value)
    updateWish(edit.id, value.text, value.link);
    setEdit({
      id: null,
      text: '',
      link: ''
    });
  };

  if (edit.id) {
    return <WishForm edit={edit} onSubmit={submitUpdate} />;
  }

  return wishes.map((wish, index) => (
    <div
      className={wish.isComplete ? 'wish-row complete' : 'wish-row'}
      key={index}
    >
      <div key={wish.id} onClick={() => completeWish(wish.id)}>
        {wish.text} &nbsp; 
        <a href="{wish.link}" target="_blank">link</a>
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeWish(wish.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: wish.id, value1: wish.text, value2: wish.link  })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Wish;