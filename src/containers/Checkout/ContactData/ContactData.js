import "./ContactData.css";
import Axios from "../../../order-axios";
import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Fill Your Name...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Fill Your address...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Fill Your Street...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Fill ZIP Code...",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Fill Your Country...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Fill Your Email...",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    spinner: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ spinner: true });
    let formData = {};
    for (let elementModifier in this.state.orderForm) {
      formData[elementModifier] = this.state.orderForm[elementModifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };
    Axios.post("/orders.json", order)
      .then((response) => {
        this.setState({ spinner: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ spinner: false }));
  };

  checkvalidify = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputElementHandler = (event, inputModifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedElementForm = {
      ...updatedOrderForm[inputModifier],
    };

    updatedElementForm.value = event.target.value;
    updatedElementForm.valid = this.checkvalidify(
      updatedElementForm.value,
      updatedElementForm.validation
    );
    updatedElementForm.touched = true;
    updatedOrderForm[inputModifier] = updatedElementForm;

    let formIsValid = true;

    for (let inputModifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputModifier].valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            changed={(event) => this.inputElementHandler(event, formElement.id)}
          />
        ))}
        <Button disabled={!this.state.formIsValid} btnType="Success">
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
