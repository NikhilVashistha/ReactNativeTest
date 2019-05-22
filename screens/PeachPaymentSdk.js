/**
 * Project : React Native Test App
 * This is the top level component in the app which will contain AppNavigator for navigation.
 */

import React, { Component } from "react";
import { Button, View, Text } from "react-native";

import PeachPayment from "./PeachPayment";
import Axios from "axios";

export default class PeachPaymentSdk extends Component {
  baseUrl = "http://52.59.56.185";

  constructor(props) {
    super(props);
    this.state = {
      checkoutUrl:
        this.baseUrl +
        "/token?" +
        "amount=" +
        "49.99" +
        "&currency=" +
        "EUR" +
        "&paymentType=PA" +
        "&notificationUrl=http://52.59.56.185:80/notification",
      paymentStatusUrl: this.baseUrl + "/status?resourcePath=",
      checkoutId: ""
    };
  }

  startPayment = async () => {
    const paymentDetails = {
      checkoutId: this.state.checkoutId,
      cardHolder: "JOHN DOE",
      cardNumber: "4200000000000000",
      cardExpiryMonth: "07",
      cardExpiryYear: "2021",
      cardCVV: "123",
      saveCardDetails: false
    };

    PeachPayment.startPayment(paymentDetails)
      .then(resourcePath => {
        this.getPaymentStatus(resourcePath);
      })
      .catch(e => {
        console.log(e);
      });
  };

  startPaymentAndSaveCardDetails = async () => {
    const paymentDetails = {
      checkoutId: this.state.checkoutId,
      cardHolder: "JOHN DOE",
      cardNumber: "4200000000000000",
      cardExpiryMonth: "07",
      cardExpiryYear: "2021",
      cardCVV: "123",
      saveCardDetails: true
    };

    PeachPayment.startPayment(paymentDetails)
      .then(resourcePath => {
        this.getPaymentStatus(resourcePath);
      })
      .catch(e => {
        console.log(e);
      });
  };

  startPaymentWithStoredCards = async () => {
    const paymentDetails = {
      checkoutId: this.state.checkoutId,
      cardToken: "8ac7a49f6ac55628016adecb0ca64773",
      cardCVV: "123",
      cardBrand: "VISA"
    };

    PeachPayment.startPayment(paymentDetails)
      .then(resourcePath => {
        this.getPaymentStatus(resourcePath);
      })
      .catch(e => {
        console.log(e);
      });
  };

  storeCardDetails = async () => {
    const paymentDetails = {
      checkoutId: this.state.checkoutId,
      cardHolder: "JOHN DOE",
      cardNumber: "4200000000000000",
      cardExpiryMonth: "07",
      cardExpiryYear: "2021",
      cardCVV: "123"
    };

    PeachPayment.storeCardDetails(paymentDetails)
      .then(resourcePath => {
        this.getPaymentStatus(resourcePath);
      })
      .catch(e => {
        console.log(e);
      });
  };

  /**
   * It will be called after first rendering.
   */
  componentDidMount() {}

  getCheckoutId = () => {
    Axios.get(this.state.checkoutUrl)
      .then(response => {
        if (response && response.status == 200) {
          this.setState({ checkoutId: response.data.checkoutId });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getPaymentStatus = resourcePath => {
    console.log("getPaymentStatus", JSON.stringify(resourcePath));
    Axios.get(this.state.paymentStatusUrl + resourcePath)
      .then(response => {
        console.log("getPaymentStatus", JSON.stringify(response));
        if (response && response.status == 200) {
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
        <Text>{"checkoutId : " + this.state.checkoutId}</Text>
        <Text>
          {"cardNumber: 4200000000000000\n" +
            "cardExpiryMonth: 07\n" +
            "cardExpiryYear: 2021\n" +
            "cardCVV: 123"}
        </Text>
        <Button title="Get Checkout Id" onPress={this.getCheckoutId} />
        <Button title="Pay" onPress={this.startPayment} />
        <Button
          title="Pay and Store Card"
          onPress={this.startPaymentAndSaveCardDetails}
        />
        <Button title="Store Card" onPress={this.storeCardDetails} />
        <Button
          title="Pay using Stored Card"
          onPress={this.startPaymentWithStoredCards}
        />
      </View>
    );
  }
}
