const nullWishLists = {
  id: null,
  name: "",
  url: "",
  wishes: []
}

const nullWishForm = {
  id: null,
  text: "",
  link: "",
}


const initialState = {
  wishLists: [],
  selectedWishLists: nullWishLists,
  wishForm: nullWishForm ,
  wishListName : 'DEFAULT_NAME'
}

const wishListsReducer = (state=initialState, action) => {
  console.log(action.type)
  switch (action.type){
    case "SET_WISH_LISTS":
      return {...state, ...action.payload}
    case "SET_SELECTED_WISH_LIST":
      return {...state, selectedWishLists: action.payload}
    case "UNSET_WISH_LIST":
      return {...state, selectedWishLists: nullWishLists}
    case "WISH_LIST_CHANGE":
      return {...state,wishListName: action.value}
    case 'SET_ALL_WISHES':
      return {...state,selectedWishLists: {...state.selectedWishLists,wishes : action.data}}
    case "SET_WISHES":
      return {
        ...state,
        selectedWishLists: {
          ...state.selectedWishLists,
          wishes: [...state.selectedWishLists.wishes, action.payload]
        },
        wishForm: nullWishForm
      }
    case "SET_SELECTED_WISH":
        return {...state, selectedWish: action.payload}  
    case "UNSET_WISH":
      return {...state, wishForm: nullWishForm}
    case "WISH_CHANGE":
      return {...state, wish: {
        ...state.wish,
        // content key in the wish in state with the new payload value
        [action.payload.text]: action.payload.value
    }}
    case "ADD_WISH_LIST":
      const index = state.wishLists[state.wishLists.length-1]?.id + 1
      return {...state,wishLists : [...state.wishLists,{...nullWishLists,name : action.value,id :
     !isNaN(index) ? index : 0}]}
    case 'REMOVE_WISH_LIST':
      return {...state,wishLists: state.wishLists.filter(item => item.id!==action.id)}
    case "CLEAR_SELECTED_WISH_LIST":
      return {...state,selectedWishLists:  nullWishLists}
    default:
      return state
  }
}

export default wishListsReducer