package com.medgoplus;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class SimpleFilePicker extends ReactContextBaseJavaModule {
    private static final int FILE_REQUEST = 1;
    private Promise mPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == FILE_REQUEST) {
                if (mPromise != null) {
                    if (resultCode == Activity.RESULT_OK && intent != null) {
                        Uri uri = intent.getData();
                        if (uri != null) {
                            WritableMap result = Arguments.createMap();
                            result.putString("uri", uri.toString());
                            result.putString("name", uri.getLastPathSegment());
                            mPromise.resolve(result);
                        } else {
                            mPromise.reject("error", "No file selected");
                        }
                    } else {
                        mPromise.reject("cancelled", "User cancelled");
                    }
                    mPromise = null;
                }
            }
        }
    };

    public SimpleFilePicker(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "SimpleFilePicker";
    }

    @ReactMethod
    public void pickFile(Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject("error", "No activity");
            return;
        }

        mPromise = promise;

        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("application/pdf");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        
        currentActivity.startActivityForResult(Intent.createChooser(intent, "Select PDF"), FILE_REQUEST);
    }
}