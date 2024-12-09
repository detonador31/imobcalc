package com.example.navigationbarplugin;

import android.app.Activity;
import android.os.Build;
import android.view.Window;

import com.getcapacitor.Plugin;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.PluginMethod;

@CapacitorPlugin(name = "NavigationBarPlugin")
public class NavigationBarPlugin extends Plugin {

    @PluginMethod
    public void setColor(PluginCall call) {
        String color = call.getString("color");
        if (color == null) {
            call.reject("Color not provided");
            return;
        }

        Activity activity = getActivity();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = activity.getWindow();
            window.setNavigationBarColor(android.graphics.Color.parseColor(color));
            call.resolve();
        } else {
            call.reject("Not supported on this Android version");
        }
    }
}
