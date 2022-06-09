package com.tomaho.mobile.enterprise;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.List;

public class FirebaseService extends FirebaseMessagingService {

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onMessageSent(@NonNull String s) {
        super.onMessageSent(s);
    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }

    @Override
    public void onDeletedMessages() {
        // Log.e("test", "deleted");
        super.onDeletedMessages();
    }



    @Override
    public void onMessageReceived(RemoteMessage message) {
        // Intent intent = new Intent(this, MainActivity.class);
        // Log.e("intent", intent.toString());
        // Log.e("intent", MainActivity.class.toString());
        // intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        // PendingIntent pendingIntent = PendingIntent.getActivity(
        // this,
        // 0,
        //     intent,
        //     PendingIntent.FLAG_CANCEL_CURRENT
        // );
        // super.onMessageReceived(message);
        // NotificationCompat.Builder notification = new NotificationCompat.Builder(this, "ERP_TOMAHO_ENTERPRISE")
        //     .setContentTitle("Tin nhắn mới")
        //     .setContentText("Tin nhắn mới")
        //     .setSmallIcon(R.mipmap.ic_launcher_round)
        //     .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        //     .setContentIntent(pendingIntent)
        //     .setAutoCancel(true);

        // NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        //     NotificationChannel channel = new NotificationChannel("ERP_TOMAHO_ENTERPRISE",
        //     "Channel human readable title",
        //     NotificationManager.IMPORTANCE_DEFAULT);
        //     notificationManager.createNotificationChannel(channel);
        // }
        // notificationManager.notify(0 /* ID of notification */, notification.build());
    }
}
