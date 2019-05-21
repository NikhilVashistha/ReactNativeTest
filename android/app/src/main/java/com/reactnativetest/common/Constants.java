package com.reactnativetest.common;

import java.util.LinkedHashSet;
import java.util.Set;


public class Constants {

    /* The configuration values to change across the app */
    public static class Config {

        /* The payment brands for Ready-to-Use UI and Payment Button */
        public static final Set<String> PAYMENT_BRANDS;

        static {
            PAYMENT_BRANDS = new LinkedHashSet<>();

            PAYMENT_BRANDS.add("VISA");
            PAYMENT_BRANDS.add("MASTER");
            PAYMENT_BRANDS.add("PAYPAL");
        }

        /* The default payment brand for payment button */
        public static final String PAYMENT_BUTTON_BRAND = "VISA";

        /* The default amount and currency */
        public static final String AMOUNT = "49.99";
        public static final String CURRENCY = "EUR";

        /* The card info for SDK & Your Own UI*/
        public static final String CARD_BRAND = "VISA";
        public static final String CARD_HOLDER_NAME = "JOHN DOE";
        public static final String CARD_NUMBER = "4200000000000000";
        public static final String CARD_EXPIRY_MONTH = "07";
        public static final String CARD_EXPIRY_YEAR = "21";
        public static final String CARD_CVV = "123";
    }

    public static final int CONNECTION_TIMEOUT = 5000;

    public static final String BASE_URL = "http://52.59.56.185";

    public static final String LOG_TAG = "msdk.demo";

    public static final int PAYMENT_REQUEST_CODE = 215;

    public static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    public static final String E_PAYMENT_CANCELLED = "E_PAYMENT_CANCELLED";
    public static final String E_PAYMENT_ERROR = "E_PAYMENT_ERROR";

    public static final String INTENT_PAYMENT_CHECKOUT_ID = "INTENT_PAYMENT_CHECKOUT_ID";
    public static final String INTENT_PAYMENT_CARD_HOLDER_NAME = "INTENT_PAYMENT_CARD_HOLDER_NAME";
    public static final String INTENT_PAYMENT_CARD_NUMBER = "INTENT_PAYMENT_CARD_NUMBER";
    public static final String INTENT_PAYMENT_CARD_EXPIRY_MONTH = "INTENT_PAYMENT_CARD_EXPIRY_MONTH";
    public static final String INTENT_PAYMENT_CARD_EXPIRY_YEAR = "INTENT_PAYMENT_CARD_EXPIRY_YEAR";
    public static final String INTENT_PAYMENT_CARD_CVV = "INTENT_PAYMENT_CARD_CVV";

}
