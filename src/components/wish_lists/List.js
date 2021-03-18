import {useDispatch, useSelector} from "react-redux";
import {addWishList, deleteWishList, setSelectedWishlists} from "../../redux/actionCreators";
import React,{useState} from 'react'
import {ChangeList} from "../wish/WishList";
import {RiCloseCircleLine} from "react-icons/ri";
import {Button, ClicableDiv, Close, HelloUser, Title, WishList, WishTitle} from "./List.styles";
import {Redirect} from 'react-router-dom'

const exists = data => data!==undefined && data!==null

const WishListsMain = () => {
    const username = useSelector(state => state.user.username),
    dispatch = useDispatch(),
    {wishLists : items,selectedWishLists : selected} = useSelector(state => state.wish_lists),
    elements = items.map(q => <Item name={q.name} remove={() => dispatch(deleteWishList(q.id))}
    select={() => dispatch(setSelectedWishlists(q.id))}/>),
    [isAdd,showAdd] = useState(false)
    if (exists(selected.id)) return <Redirect to={'/wish_lists'} />
    // addWishList
    return <>
        <HelloUser>Hello, {username}</HelloUser>
        <Title>Wish lists:</Title>
        {elements.length>0 ? elements : <Title color={'#c5c7c9'}>There is no wish lists</Title>}
        <Button onClick={() => showAdd(!isAdd)}>Add</Button>
        {isAdd && <ChangeList send={value => dispatch(addWishList(value))} />}
    </>
}
const Item = ({name,remove,select}) => {
    return <WishList >
        <ClicableDiv onClick={select}>
            <WishTitle>{name}</WishTitle>
        </ClicableDiv>
        <Close onClick={remove} as={RiCloseCircleLine}/>
    </WishList>
}



export default WishListsMain