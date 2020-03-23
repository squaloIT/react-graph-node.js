import React, { useState, useEffect } from 'react';
import tokenFunc from './../../utils/token';

export const RootContext = React.createContext();

export default ({ children }) => {
    const prevAuthData = JSON.parse(window.localStorage.getItem("shopping_app_token_info")) || null;
    const [authData, setAuthData] = useState(prevAuthData);

    useEffect(
        () => {
            localStorage.setItem("shopping_app_token_info", JSON.stringify(authData));
            return tokenFunc.cleanAuthDataFromLocalStorage;
        },
        [authData]
    )

    const defaultContext = {
        authData,
        setAuthData
    };

    return (
        <RootContext.Provider value={defaultContext}>
            {children}
        </RootContext.Provider>
    );
}