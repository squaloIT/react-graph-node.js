import React, { useContext } from 'react';
import { Redirect } from '@reach/router'
import { RootContext } from './../context/RootContext';

export default ({ component: Component, ...rest }) => {
    const { authData } = useContext(RootContext);
    return (
        authData != null ?
            <Component {...rest} />
            : <Redirect to='/' exact noThrow />
    );
}
