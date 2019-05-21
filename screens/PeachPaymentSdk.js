/**
 * Project : React Native Test App
 * This is the top level component in the app which will contain AppNavigator for navigation.
 */

import React, { Component } from "react";

import PeachPayment from "./PeachPayment";

export default class PeachPaymentSdk extends Component {
  async startPayment() {
    const paymentDetails = {
      checkoutId: "",
      cardHolder: "",
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
      cardCVV: ""
    };

    PeachPayment.startPayment(paymentDetails)
      .then(status => {
        console.log(status);
      })
      .catch(e => {
        console.log(e);
      });
  }

  /**
   * It will be called after first rendering.
   */
  componentDidMount() {
    this.startPayment();
  }

  render() {
    return null;
  }
}
