import {useDispatch, useSelector} from "react-redux";
import {addWishList, deleteWishList, logout, setSelectedWishlists} from "../../redux/actionCreators";
import React,{useState,useRef} from 'react'
import {ChangeList} from "../wish/WishList";
import {RiCloseCircleLine} from "react-icons/ri";
import {Button, ClicableDiv, Close, CopyInput, CopyTitle, HelloUser, Title, WishList, WishTitle} from "./List.styles";
import {Redirect} from 'react-router-dom'
import classes from "../wish/ALL_wishs.module.css";
import {useLocation} from 'react-router-dom'

const exists = data => data!==undefined && data!==null

const WishListsMain = () => {
    const _host = process.env.BASE_URL || 'http://localhost:3000' 
    const {username,id} = useSelector(state => state.user),
    dispatch = useDispatch(),
    {wishLists : items,selectedWishLists : selected} = useSelector(state => state.wish_lists),
    elements = items.map((q, index) => <Item name={q.name} key={index} remove={() => dispatch(deleteWishList(q.id))}
    select={() => dispatch(setSelectedWishlists(q.id))} link={`${_host}/mainpage/${q.id}`}/>),
    [isAdd,showAdd] = useState(false)
    const location = useLocation()
    const wish_id = +location.pathname.split('/')[2]
    if (exists(selected.id)) return <Redirect to={'/wish_lists'} />
    // if (exists(selected.id)) return <Redirect to={'/wish_lists/' + selected.id} />
    if (!id) return <Redirect to={'/login'} />
    console.log(wish_id)
    const simpleElem = elements[items.findIndex(item => item.id===wish_id)]
    return <>
        <HelloUser>Hello, {username}</HelloUser>
        <button onClick={() => dispatch(logout())} className={classes.logout}>Logout!</button>
        <Title>Wish lists:</Title>
        {simpleElem ||
        (elements.length>0 ? elements : <Title color={'#c5c7c9'}>There is no wish lists</Title>)}
        <Button onClick={() => showAdd(!isAdd)}>Add</Button>
        {isAdd && <ChangeList send={value => dispatch(addWishList({name : value}))} />}
    </>
}
const Item = ({name,remove,select,link}) => {
    const copyInp = useRef(null)
    const copy = () => {
        copyInp.current.select()
        document.execCommand('copy')
    }
    return <WishList >
        <ClicableDiv onClick={select}>
            <WishTitle>{name}</WishTitle>
        </ClicableDiv>
        <Close onClick={remove} as={RiCloseCircleLine}/>
        <CopyInput value={link} ref={copyInp} readOnly />
        <CopyTitle onClick={copy}>Copy link</CopyTitle>
    </WishList>
}



export default WishListsMain