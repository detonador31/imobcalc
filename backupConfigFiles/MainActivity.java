package com.finan.finanapp;

import com.getcapacitor.BridgeActivity;

import android.os.Bundle; // required for onCreate parameter

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(com.getcapacitor.community.admob.AdMob.class);
    }
}
