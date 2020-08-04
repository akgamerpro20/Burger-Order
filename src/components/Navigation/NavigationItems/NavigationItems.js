import React from "react";
import './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="https://akgamerpro20.github.io/Burger-Order/" active>Burger Builder</NavigationItem>
        <NavigationItem link="https://akgamerpro20.github.io/Burger-Order/">Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;
