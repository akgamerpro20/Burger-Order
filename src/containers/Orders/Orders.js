import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Axios from "../../order-axios";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    const FetchOrders = [];
    Axios.get("/orders.json")
      .then((res) => {
        for (let key in res.data) {
          FetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: FetchOrders });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    );
  }
}

export default Orders;
