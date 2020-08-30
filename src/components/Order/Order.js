import React from "react";
import "./Order.css";

const Order = (props) => {
  const ingredientData = [];

  for (let ingredientName in props.ingredients) {
    ingredientData.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredientData.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className="Order">
      <h4>Ingredients: {ingredientOutput}</h4>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
