import React, { useReducer, useEffect } from 'react';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, filter } from 'rxjs/operators';
import socketIOClient from "socket.io-client";
import config from './../../config';
import tokenFunc from './../../utils/token';
import LeftSidebar from './../LeftSidebar/LeftSidebar';
import './Home.css';
import Products from './Products/Products';
import reducer from './reducer';
import actions from './actions';

const socket = socketIOClient(config.serverUrl);

const Home = () => {
    const token = tokenFunc.getAuthDataFromLocalStorage();
    const email = tokenFunc.decodeJWTFromLocalStorageAndReturnData().email
    const [state, dispatch] = useReducer(reducer, {
        cart: [],
        products: []
    });

    const products$ = ajax.getJSON(config.serverUrl + "/api/products", { 'Authorization': `Bearer ${token.idToken}` })
        .pipe(
            catchError(val => of(`I caught: ${val}`)),
            map((data) => data.products)
        );

    const userCart$ = ajax.getJSON(`${config.serverUrl}/api/user/cart`,
        tokenFunc.getHeaderWithToken(tokenFunc.getAuthDataFromLocalStorage())
    )
        .pipe(
            catchError(val => of(`I caught: ${val}`)),
            filter(data => data && data.usersShoppingCart),
            map((data) => data.usersShoppingCart)
        )

    useEffect(() => {
        socket.on("cart_changed_" + email, (cart) => {
            console.log(`SOCKET on cart_changed_email `, cart)
            //dispatch event to change products
            dispatch({
                type: actions.SET_CART,
                payload: {
                    ...state,
                    cart: [...cart]
                }
            })
        });

        const sub = userCart$.subscribe(cart => {
            console.log(cart)
            dispatch({
                type: actions.SET_CART,
                payload: {
                    cart
                }
            })
        }, err => {
            console.error(err);
        })

        return () => {
            sub.unsubscribe();
            socket.close();
        }
    }, []);

    useEffect(() => {
        socket.on('products_changed', products => {
            console.log(`SOCKET on vproducts_changed `, products)
            //dispatch event to change products
            dispatch({
                type: actions.SET_PRODUCTS,
                payload: {
                    ...state,
                    products
                }
            })
        });

        const sub = products$.subscribe((products) => {
            console.log(products)
            dispatch({
                type: actions.SET_PRODUCTS,
                payload: {
                    ...state,
                    products
                }
            })
        }, (err) => {
            console.error(err);
            if (err.status == 401) {
                alert(err.message);
            }
        });

        return () => {
            sub.unsubscribe()
            socket.close()
        };
    }, []);

    const addToCart = (productId) => {
        //dispatch event to add product to cart
        dispatch({
            type: actions.ADD_TO_CART,
            payload: {
                productId
            }
        })
    }

    const removeFromCart = (productId) => {
        dispatch({
            type: actions.REMOVE_FROM_CART,
            payload: {
                productId
            }
        })
    }

    return (
        <div className='col-md-12 d-flex justify-content-between m-t-20'>
            <div className='col-md-4'>
                <LeftSidebar removeFromCart={removeFromCart} userCart={state.cart} />
            </div>
            <div className='col-md-8'>
                <Products products={state.products} addToCart={addToCart} />
            </div>
        </div>
    );
};

export default Home;