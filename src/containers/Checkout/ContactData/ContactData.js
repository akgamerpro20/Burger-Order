import "./ContactData.css";
import Axios from "../../../order-axios";
import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    spinner: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ spinner: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Aung Khant",
        address: {
          street: "Bawga Park 3 Street",
          zipCode: "123456",
          country: "Myanmar (Burma)",
        },
        email: "aungkhant@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    Axios.post("/orders.json", order)
      .then((response) => {
        this.setState({ spinner: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ spinner: false }));
  };

  render() {
    let form = (
      <form>
        <input
          className="Input"
          type="text"
          name="name"
          placeholder="Enter Name"
        />
        <input
          className="Input"
          type="text"
          name="email"
          placeholder="Enter Mail"
        />
        <input
          className="Input"
          type="text"
          name="street"
          placeholder="Enter Street"
        />
        <input
          className="Input"
          type="text"
          name="postal"
          placeholder="Enter Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.spinner) {
      form = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Fill Your Information</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
