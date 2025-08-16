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

public class FilePickerModule extends ReactContextBaseJavaModule {
    private static final int FILE_PICKER_REQUEST = 1;
    private Promise mPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == FILE_PICKER_REQUEST) {
                if (mPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPromise.reject("cancelled", "User cancelled");
                    } else if (resultCode == Activity.RESULT_OK) {
                        Uri uri = intent.getData();
                        if (uri != null) {
                            WritableMap result = Arguments.createMap();
                            result.putString("uri", uri.toString());
                            result.putString("name", uri.getLastPathSegment());
                            mPromise.resolve(result);
                        } else {
                            mPromise.reject("error", "No file selected");
                        }
                    }
                    mPromise = null;
                }
            }
        }
    };

    public FilePickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "FilePickerModule";
    }

    @ReactMethod
    public void pickFile(Promise promise) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            promise.reject("error", "Activity doesn't exist");
            return;
        }

        mPromise = promise;

        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("application/pdf");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.putExtra(Intent.EXTRA_LOCAL_ONLY, true);
        
        try {
            currentActivity.startActivityForResult(Intent.createChooser(intent, "Select PDF File"), FILE_PICKER_REQUEST);
        } catch (android.content.ActivityNotFoundException e) {
            mPromise.reject("no_app", "No app available to handle PDF files");
            mPromise = null;
        } catch (SecurityException e) {
            mPromise.reject("permission", "Permission denied to access files");
            mPromise = null;
        } catch (Exception e) {
            mPromise.reject("error", "Failed to open file picker: " + e.getClass().getSimpleName());
            mPromise = null;
        }
    }
}