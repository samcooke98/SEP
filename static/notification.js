/**
 * Notification using the HTML  Push API  (ServiceWorker) 
 * https://developer.mozilla.org/en-US/docs/Web/API/Push_API
 * Broadly speaking, we register a shared service worker (always runs) 
 * https://serviceworke.rs/push-payload_demo.html
 * ^^^ Basically stolen from here
 */

self.addEventListener('push', function (event) {
    var payload = event.data ? event.data.json() : "No payload text";

    var result = self.registration.showNotification(payload.title, {
        onclick: (evt) => { window.open(payload.url) },
        ...payload
    })
    event.waitUntil(result)
})

self.onnotificationclick = function (e) {
    e.notification.close();
    return clients.openWindow(e.notification.data.url);
}

self.addEventListener('message', function(event){

})