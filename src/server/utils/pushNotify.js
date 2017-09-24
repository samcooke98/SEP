require('dotenv').config();
var webpush = require('web-push')

webpush.setVapidDetails(
    'mailto:info@samcooke.com.au',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

const pushSubscription = {
    endpoint: "https://fcm.googleapis.com/fcm/send/cB3avRLbhFs:APA91bEZhwRGN8hJbZTzmkg8HwVO8-GoTwBKK7treLrjsuHjCkDNdUL0kGJV26HBru8V6o7656FExDkScSTF8gNlJxWfLS8M-DUE7104UCLsUbzjMzMdJXeK0lzISqsD8roV_kjrs9e1",
    keys: {
        "p256dh": "BLpYoH1pztTDQKeCa5jhhA0tDUBM3el5SMv3pAbQCuEEQ4r6I8Okfoe623KiPr3cC0X4uvA5-85sDaWBDB4tjBg=", "auth": "L5p3q50QiaHU0uDzkWg9BA=="
    }
}


export function notifySimple( title, body, url, pushDetails) { 
    webpush.sendNotification(pushDetails, JSON.stringify({
        title: title,
        body: body,
        data: { 
            url: url
        }
    }))
}