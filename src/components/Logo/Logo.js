import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const Logo = () => (
    <div className="Logo">
        <img src={BurgerLogo} alt="MyBurger" />
    </div>
);

export default Logo;