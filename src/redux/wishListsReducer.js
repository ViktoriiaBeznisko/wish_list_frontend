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
    wishForm: nullWishForm 
  }
  
  const wishListsReducer = (state=initialState, action) => {
    switch (action.type){

      case "SET_WISH_LISTS":
        return {...state, ...action.payload}
      case "SET_SELECTED_WISH_LIST":
        return {...state, selectedWishLists: action.payload}
      case "UNSET_WISH_LIST":
        return {...state, selectedWishLists: nullWishLists}
      case "WISH_LIST_CHANGE":
        return {...state, wishList: {
          ...state.wishList,
          // content key in the wishList in state with the new payload value
          [action.payload.name]: action.payload.value
        }}
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
        default:
        return {...state}
    } 
  }
  
  export default wishListsReducer