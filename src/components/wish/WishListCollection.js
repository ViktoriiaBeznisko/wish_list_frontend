// container
// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import WishForm from './WishForm';
// import Wish from './Wish';
// import WishList from './WishList';
// import { setSelectedWishList, unsetWishList } from '../../redux/actionCreators'

// import WishList from "./WishList"



// class WishListCollection extends Component {

// componentDidMount(){
//     // get the id from the route (i.e. grab 1 from "/wish_list/1")
//     // we give this.props.match.params a key of id when we define "/wish_list/:id" in our Route path in App.js
//     const id = this.props.match.params.id
//     this.props.setSelectedWishList(id)
// }

// componentWillUnmount(){
//     this.props.unsetWishList()
//   }




// renderPage = () => {
//     const { name, link, wishes } = this.props
//     return (
//       <>
//         <h1><a href={ link }>{ link }</a></h1>
//         <p>{ name }</p>
//         <p>{ address }</p>
//         <div className="wishes">
//           {this.props.user.id === <WishList user_id/>}
//           {wishes.map(wish => <WishList key={wish.id}  {...wish}/>)}
//         </div>
//       </>
//     )
//   }
// }



// props.wish_lists.map((wish_list, index) => {
//     return <WishList wish_list={wish_list} key={wish_list.id} index={index} />
// })




// export default connect( mapStateToProps, { setSelectedWishList, unsetWishList } )(WishListCollection)