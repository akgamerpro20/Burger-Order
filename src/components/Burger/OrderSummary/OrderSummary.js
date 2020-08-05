import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const OrderIngredients = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
        {props.ingredients[igkey]}
      </li>
    );
  });

  return (
    <Aux>
      <h1>Your Order</h1>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{OrderIngredients}</ul>
      <p>
        <strong>Total Price: {props.price}</strong>
      </p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;
