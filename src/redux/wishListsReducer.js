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
  wishes: [],
  selectedWishLists: nullWishLists,
  wishForm: nullWishForm,
  wishListName : 'DEFAULT_NAME'
}


const wishListsReducer = (state=initialState, action) => {
  console.log(action.type)
  // debugger
  switch (action.type){
    case "ADD_WISH_LIST":
      return {...state, wishLists : [...state.wishLists, action.payload]}
    case "SET_WISH_LISTS":
      return {...state, wishLists :action.payload}

    case "SET_SELECTED_WISH_LIST":
      return {...state, selectedWishLists: action.payload}
    case "UNSET_WISH_LIST":
      return {...state, selectedWishLists: nullWishLists}
    case "WISH_LIST_CHANGE":
      return {...state, selectedWishLists: action.payload}
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
      return {
        ...state,
        selectedWishLists: {
          ...state.selectedWishLists,
          wishes: 
          [...state.selectedWishLists.wishes.filter(item => item.id!==action.id), action.payload], 
      },
    }
    case "ADD_WISH":
        return {
          ...state,
          selectedWishLists: {
            ...state.selectedWishLists,
            wishes: [...state.selectedWishLists.wishes, action.payload]
          },
      wishForm: nullWishForm
    }
    case 'REMOVE_WISH_LIST':
      return {...state, wishLists: state.wishLists.filter(item => item.id !== action.id)}

      case 'REMOVE_WISH':
      return {
        ...state,
        selectedWishLists: {
          ...state.selectedWishLists,
          wishes: 
          [...state.selectedWishLists.wishes.filter(item => item.id!==action.id)], 
      },
    }

    case "CLEAR_SELECTED_WISH_LIST":
      return {...state,selectedWishLists:  nullWishLists}
    default:
      return state
  }
}

export default wishListsReducer