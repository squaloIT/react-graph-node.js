import React from 'react';
import Nav from './Nav/Nav';

const Header = () => {
    return (
        <div className='container-fluid'>
            <div className='row d-flex justify-content-between'>
                <Nav />
            </div>
        </div>
    );
};

export default Header;