import actions from './actions'
import tokenFunctions from './../../utils/token';
import config from './../../config';
import axios from 'axios'
import jwt from 'jsonwebtoken'

const reducer = (state, action) => {
  if (action.type === actions.ADD_TO_CART) {
    const token = tokenFunctions.getAuthDataFromLocalStorage()
    const userData = jwt.decode(token.idToken);

    try {
      axios.post(`${config.serverUrl}/api/products/add`, {
        user_id: userData.id,
        product_id: action.payload.productId
      }, {
        headers: tokenFunctions.getHeaderWithToken(token)
      })
        .then(res => console.log(res))
        .catch(err => console.error(err))

      return {
        ...state,
        cart: [...state.cart, state.products.find(p => p.id == action.payload.productId)]
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (action.type === actions.SET_PRODUCTS) {
    console.log(`SET_PRODUCTS`, action.payload)
    console.log({
      ...state,
      products: [...action.payload.products]
    })

    return {
      ...state,
      products: [...action.payload.products]
    }
  }

  if (action.type === actions.SET_CART) {
    console.log(`SET_CART`, action.payload)
    console.log({
      ...state,
      cart: [...action.payload.cart]
    })

    return {
      ...state,
      cart: [...action.payload.cart]
    }
  }

  if (action.type === actions.REMOVE_FROM_CART) {
    axios.delete(`${config.serverUrl}/api/user/delete-item/${action.payload.productId}`, {
      headers: tokenFunctions.getHeaderWithToken(tokenFunctions.getAuthDataFromLocalStorage())
    })
      .then(res => console.log(res))
      .catch(error => console.log(error))

    return state //Mozda greska
  }

  return state;
}

export default reducer;