/**
 * Project : React Native Test App
 * This is the top level component in the app which will contain AppNavigator for navigation.
 */

import React, { Component } from "react";
import { Button, View, Text } from "react-native";

import PeachPayment from "./PeachPayment";

export default class PeachPaymentSdk extends Component {
  async startPayment() {
    const paymentDetails = {
      checkoutId: "",
      cardHolder: "JOHN DOE",
      cardNumber: "4200000000000000",
      cardExpiryMonth: "07",
      cardExpiryYear: "2021",
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

  async startPaymentWithStoredCards() {
    const paymentDetails = {
      checkoutId: "",
      cardToken: "",
      cardCVV: "123"
    };

    PeachPayment.startPayment(paymentDetails)
      .then(status => {
        console.log(status);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async storeCardDetails() {
    const paymentDetails = {
      checkoutId: "",
      cardHolder: "JOHN DOE",
      cardNumber: "4200000000000000",
      cardExpiryMonth: "07",
      cardExpiryYear: "2021",
      cardCVV: "123"
    };

    PeachPayment.storeCardDetails(paymentDetails)
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
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          marginHorizontal: 30
        }}
      >
        <Text>Peach Payments</Text>
        <Text>
          {"cardNumber: 4200000000000000\n" +
            "cardExpiryMonth: 07\n" +
            "cardExpiryYear: 2021\n" +
            "cardCVV: 123"}
        </Text>
        <Button title="Store Card" onPress={this.storeCardDetails} />
        <Button
          title="Pay using Stored Card"
          onPress={this.startPaymentWithStoredCards}
        />
        <Button title="Pay" onPress={this.startPayment} />
      </View>
    );
  }
}
