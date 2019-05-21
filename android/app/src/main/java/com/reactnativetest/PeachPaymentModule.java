package com.reactnativetest;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativetest.activity.PaymentActivity;
import com.reactnativetest.common.Constants;

public class PeachPaymentModule extends ReactContextBaseJavaModule {


    private Promise mPaymentPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == Constants.PAYMENT_REQUEST_CODE) {
                if (mPaymentPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPaymentPromise.reject(Constants.E_PAYMENT_CANCELLED, "Payment has been cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {

//                        if (intent.getData() == null) {
//                            mPaymentPromise.reject(Constants.E_PAYMENT_ERROR, "An error occurred!");
//                        } else {
                        mPaymentPromise.resolve("Callback : Greetings from Java");
//                        }
                    }

                    mPaymentPromise = null;
                }
            }
        }
    };

    public PeachPaymentModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native

        // Add the listener for `onActivityResult`
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "PeachPayment";
    }

    @ReactMethod
    public void startPayment(final ReadableMap readableMap, final Promise promise) {

        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(Constants.E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when picker returns data
        mPaymentPromise = promise;

        try {

            Intent intent = new Intent(getReactApplicationContext(), PaymentActivity.class);
            intent.putExtra(Constants.INTENT_PAYMENT_CHECKOUT_ID, readableMap.getString("checkoutId"));
            intent.putExtra(Constants.INTENT_PAYMENT_CARD_HOLDER_NAME, readableMap.getString("cardHolder"));
            intent.putExtra(Constants.INTENT_PAYMENT_CARD_NUMBER, readableMap.getString("cardNumber"));
            intent.putExtra(Constants.INTENT_PAYMENT_CARD_EXPIRY_MONTH, readableMap.getString("cardExpiryMonth"));
            intent.putExtra(Constants.INTENT_PAYMENT_CARD_EXPIRY_YEAR, readableMap.getString("cardExpiryYear"));
            intent.putExtra(Constants.INTENT_PAYMENT_CARD_CVV, readableMap.getString("cardCVV"));
            currentActivity.startActivityForResult(intent, Constants.PAYMENT_REQUEST_CODE);

        } catch (Exception e) {
            mPaymentPromise.reject(Constants.E_PAYMENT_ERROR, e.getMessage());
            mPaymentPromise = null;
        }
    }
}