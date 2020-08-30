import React from "react";
import Burger from "../../Burger/Burger";
import "./CheckoutSummary.css";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1>We hope it tastes well!</h1>
      <div style={{ margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
