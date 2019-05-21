package com.reactnativetest.activity;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.Nullable;

import com.oppwa.mobile.connect.exception.PaymentError;
import com.oppwa.mobile.connect.exception.PaymentException;
import com.oppwa.mobile.connect.payment.BrandsValidation;
import com.oppwa.mobile.connect.payment.CheckoutInfo;
import com.oppwa.mobile.connect.payment.ImagesRequest;
import com.oppwa.mobile.connect.payment.PaymentParams;
import com.oppwa.mobile.connect.payment.card.CardPaymentParams;
import com.oppwa.mobile.connect.provider.Connect;
import com.oppwa.mobile.connect.provider.ITransactionListener;
import com.oppwa.mobile.connect.provider.Transaction;
import com.oppwa.mobile.connect.provider.TransactionType;
import com.oppwa.mobile.connect.service.ConnectService;
import com.oppwa.mobile.connect.service.IProviderBinder;
import com.reactnativetest.R;
import com.reactnativetest.common.Constants;

/**
 * ================================================
 * <pre>
 *     Created by    : nikhil on 21 May 2019 4:44 PM
 *     Contact me on : <a href="mailto:vh9s@ymail.com">vh9s@ymail.com</a>
 *     Follow me on  : <a href="https://github.com/NikhilVashistha" target="_blank">https://github.com/NikhilVashistha</a>
 *     project       : ReactNativeTest
 *     desc          :
 * </pre>
 * ================================================
 */

public class PaymentActivity extends BasePaymentActivity implements ITransactionListener {

    private String checkoutId;

    private String cardHolder;
    private String cardNumber;
    private String cardExpiryMonth;
    private String cardExpiryYear;
    private String cardCVV;

    private IProviderBinder providerBinder;
    private ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            /* we have a connection to the service */
            providerBinder = (IProviderBinder) service;
            providerBinder.addTransactionListener(PaymentActivity.this);

            try {
                providerBinder.initializeProvider(Connect.ProviderMode.TEST);
            } catch (PaymentException ee) {
                showErrorDialog(ee.getMessage());
            }
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            providerBinder = null;
        }
    };

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_payment);

        Intent intent = getIntent();
        if(intent == null) {
            showErrorDialog(getString(R.string.error_message));
            return;
        }

        checkoutId = intent.getStringExtra(Constants.INTENT_PAYMENT_CHECKOUT_ID);
        cardHolder = intent.getStringExtra(Constants.INTENT_PAYMENT_CARD_HOLDER_NAME);
        cardNumber = intent.getStringExtra(Constants.INTENT_PAYMENT_CARD_NUMBER);
        cardExpiryMonth = intent.getStringExtra(Constants.INTENT_PAYMENT_CARD_EXPIRY_MONTH);
        cardExpiryYear = intent.getStringExtra(Constants.INTENT_PAYMENT_CARD_EXPIRY_YEAR);
        cardCVV = intent.getStringExtra(Constants.INTENT_PAYMENT_CARD_CVV);

        if (providerBinder != null && checkFields()) {
            if (checkoutId != null) {
                requestCheckoutInfo(checkoutId);
                return;
            }
        }

        showErrorDialog(getString(R.string.error_message));
    }

    @Override
    protected void onStart() {
        super.onStart();

        Intent intent = new Intent(this, ConnectService.class);

        startService(intent);
        bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);
    }

    @Override
    protected void onStop() {
        super.onStop();

        unbindService(serviceConnection);
        stopService(new Intent(this, ConnectService.class));
    }

    private boolean checkFields() {
        if (cardHolder.length() == 0 ||
                cardNumber.length() == 0 ||
                cardExpiryMonth.length() == 0 ||
                cardExpiryYear.length() == 0 ||
                cardCVV.length() == 0) {
            showAlertDialog(R.string.error_empty_fields);

            return false;
        }

        return true;
    }

    private void requestCheckoutInfo(String checkoutId) {
        if (providerBinder != null) {
            try {
                providerBinder.requestCheckoutInfo(checkoutId);
                showProgressDialog(R.string.progress_message_checkout_info);
            } catch (PaymentException e) {
                showAlertDialog(e.getMessage(), new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Intent intent = new Intent();
                        setResult(Activity.RESULT_CANCELED, intent);
                        finish();
                    }
                });
            }
        }
    }

    private void pay(String checkoutId) {
        try {
            PaymentParams paymentParams = createPaymentParams(checkoutId);
            paymentParams.setShopperResultUrl(getString(R.string.custom_ui_callback_scheme) + "://callback");
            Transaction transaction = new Transaction(paymentParams);

            providerBinder.submitTransaction(transaction);
            showProgressDialog(R.string.progress_message_processing_payment);
        } catch (PaymentException e) {
            showErrorDialog(e.getError());
        }
    }

    private PaymentParams createPaymentParams(String checkoutId) throws PaymentException {

        return new CardPaymentParams(
                checkoutId,
                Constants.Config.CARD_BRAND,
                cardNumber,
                cardHolder,
                cardExpiryMonth,
                "20" + cardExpiryYear,
                cardCVV
        );
    }

    @Override
    public void brandsValidationRequestSucceeded(BrandsValidation brandsValidation) {

    }

    @Override
    public void brandsValidationRequestFailed(PaymentError paymentError) {
        showErrorDialog(paymentError);
    }

    @Override
    public void imagesRequestSucceeded(ImagesRequest imagesRequest) {

    }

    @Override
    public void imagesRequestFailed() {

    }

    @Override
    public void paymentConfigRequestSucceeded(final CheckoutInfo checkoutInfo) {
        hideProgressDialog();

        if (checkoutInfo == null) {
            showErrorDialog(getString(R.string.error_message));

            return;
        }

        /* Get the resource path from checkout info to request the payment status later. */
        resourcePath = checkoutInfo.getResourcePath();

        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                pay(checkoutId);
            }
        });
    }

    @Override
    public void paymentConfigRequestFailed(PaymentError paymentError) {
        hideProgressDialog();
        showErrorDialog(paymentError);
    }

    @Override
    public void transactionCompleted(Transaction transaction) {
        hideProgressDialog();

        if (transaction == null) {
            showErrorDialog(getString(R.string.error_message));

            return;
        }

        if (transaction.getTransactionType() == TransactionType.SYNC) {
            /* check the status of synchronous transaction */
            requestPaymentStatus(resourcePath);
        } else {
            /* wait for the callback in the onNewIntent() */
            showProgressDialog(R.string.progress_message_please_wait);
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(transaction.getRedirectUrl())));
        }
    }

    @Override
    public void transactionFailed(Transaction transaction, PaymentError paymentError) {
        hideProgressDialog();
        showErrorDialog(paymentError);
    }

    private void showErrorDialog(final String message) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                showAlertDialog(message, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        Intent intent = new Intent();
                        setResult(Activity.RESULT_CANCELED, intent);
                        finish();
                    }
                });
            }
        });
    }

    private void showErrorDialog(PaymentError paymentError) {
        showErrorDialog(paymentError.getErrorMessage());
    }
}
