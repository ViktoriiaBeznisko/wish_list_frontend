const API = "http://localhost:3000"

// thunk allows us to return a function that takes in the argument of dispatch, instead of a plain object representing the action

export const setWishLists= () => {
  return dispatch => {
    fetch(API + "/wish_lists")
    .then(res => res.json())
    .then(data => dispatch({
      type: "SET_WISH_LISTS",
      payload: data
    })
  )}
}

export const setSelectedWishlists = (id) => {
  return dispatch => {
    fetch(API + "/wish_lists/" + id)
    .then(res => res.json())
    .then(wish_list => dispatch({
      type: "SET_SELECTED_WISH_LIST",
      payload: wish_list
    })
  )}
}

export const setWishes = () => {
  return dispatch => {
    fetch(API + "/wishes")
    .then(res => res.json())
    .then(data => dispatch({
      type: "SET_WISHES",
      payload: data
    })
  )}
}

export const setSelectedWish = (id) => {
  return dispatch => {
    fetch(API + "/wish/" + id)
    .then(res => res.json())
    .then(wish=> dispatch({
      type: "SET_SELECTED_WISH",
      payload: wish
    })
  )}
}

export const updateWish = (id) => {
  return dispatch => {
    fetch(API + "/wishes" + id, {
      method: 'PATCH',
      headers: {
        'Authorization': localStorage.token,
      },
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
      type: "SET_WISHES",
      payload: {wish: response.wish}
    })
  })
  }
}

export const updateWishList = (id) => {
  return dispatch => {
    fetch(API + "/wish_lists" + id, {
      method: 'PATCH',
      headers: {
        'Authorization': localStorage.token,
      },
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
      type: "SET_WISH_LISTS",
      payload: {wish_list: response.wish_list}
    })
  })
  }
}

export const deleteWish = (id) => {
  return dispatch => {
    fetch(API + "/wishes" + id, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.token,
      },
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
      type: "SET_WISHES",
      payload: {wish: response.wish}
    })
  })
  }
}

export const deleteWishList = (id) => {
  return dispatch => {
    fetch(API + "/wish_lists" + id, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.token,
      },
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
      type: "SET_WISH_LISTS",
      payload: {wish_list: response.wish_list}
    })
  })
  }
}


export const unsetWish= () => ({type: "UNSET_WISH"})
export const unsetWishList= () => ({type: "UNSET_WISH_LIST"})

export const toggleSignup = () => ({type: "TOGGLE_SIGNUP"})

export const handleLoginFormChange = (e) => ({
  type: "LOGIN_FORM_CHANGE",
  // payload: {name: "username", value: "V"}
  // payload: {name: "username", value: "VI"}
  payload: {name: e.target.name, value: e.target.value}
})

export const sendSignup = (userData) => {
  return dispatch => {
    // localhost:3000/users
    fetch(API + "/users", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(response => {
      localStorage.token = response.token
      dispatch({
      type: "SET_USER",
      payload: {user: response.user}
    })
  })
  }
}

export const sendLogin = (userData) => {
  return dispatch => {
    // localhost:3000/users
    fetch(API + "/login", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(response => {
      localStorage.token = response.token
      dispatch({
      type: "SET_USER",
      payload: {user: response.user}
    })
  })
  }
}

export const autoLogin = () => {
  return dispatch => {
    fetch(API + "/autologin", {
      method: 'POST', // or 'PUT'
      headers: {
        'Authorization': localStorage.token,
      },
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
      type: "SET_USER",
      payload: {user: response.user}
    })
  })
  }
}

export const wishChange = (e) => ({
  type: "WISH_CHANGE",
  payload: {text: e.target.text, link: e.target.link}
})

export const wishListChange = (value) => {
  return {
    type: "WISH_LIST_CHANGE",
    value
  }}

export const submitWish = (wishData) => {
  return dispatch => {
    fetch(API + "/wishes", {
      method: 'POST', // or 'PUT'
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishData)
    })
    .then(res=> res.json())
    .then(wish => dispatch({
      type: "SET_WISHES",
      payload: wish
    }))
  }
}

export const submitWishList = (wishListData) => {
  return dispatch => {
    fetch(API + "/wish_lists", {
      method: 'POST', // or 'PUT'
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishListData)
    })
    .then(res=> res.json())
    .then(wish => dispatch({
      type: "SET_WISH_LISTS",
      payload: wish
    }))
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.clear("token")
    dispatch({type: "LOGOUT"})
  }
}