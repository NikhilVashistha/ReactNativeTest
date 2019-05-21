/**
 * Project : React Native Test App
 * This is the top level component in the app which will contain AppNavigator for navigation.
 */

import React, { Component } from "react";
import { Button, View } from "react-native";

import PeachPayment from "./PeachPayment";

export default class PeachPaymentSdk extends Component {
  async startPayment() {
    const paymentDetails = {
      checkoutId: "",
      cardHolder: "JOHN DOE",
      cardNumber: "4200000000000000",
      cardExpiryMonth: "07",
      cardExpiryYear: "21",
      cardCVV: "123",
      saveCardDetails: false
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
  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 30 }}>
        <Button title="Pay using Peach Payments" onPress={this.startPayment} />
      </View>
    );
  }
}
