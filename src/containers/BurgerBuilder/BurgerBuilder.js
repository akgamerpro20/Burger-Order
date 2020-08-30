import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../order-axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorMessage from "../../hoc/WithErrorMessage/WithErrorMessage";

const INGREDIENT_PRICE = {
  salad: 0.4,
  bacon: 0.6,
  cheese: 0.7,
  meat: 0.8,
};

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    ingredients: null,
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
    spinner: false,
    error: null,
  };

  componentDidMount() {
    Axios.get("https://react-my-burger-ae5a6.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  checkPurchase(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  purchasing = () => {
    this.setState({ purchasing: true });
  };

  purchasingCancel = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.setState({ spinner: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice.toFixed(2),
    //   customer: {
    //     name: "Aung Khant",
    //     address: {
    //       street: "Bawga Park 3 Street",
    //       zipCode: "123456",
    //       country: "Myanmar (Burma)",
    //     },
    //     email: "aungkhant@gmail.com",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // Axios.post("/orders.json", order)
    //   .then((response) => this.setState({ spinner: false, purchasing: false }))
    //   .catch((error) => this.setState({ spinner: false }));
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice.toFixed(2));
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const ingredientPrice = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + ingredientPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.checkPurchase(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const ingredientPrice = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - ingredientPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.checkPurchase(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredient doesn't exist.</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredients={this.addIngredientHandler}
            removeIngredients={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            purchase={this.purchasing}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice.toFixed(2)}
          purchaseCanceled={this.purchasingCancel}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
        />
      );
    }

    if (this.state.spinner) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal click={this.purchasingCancel} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorMessage(BurgerBuilder, Axios);
