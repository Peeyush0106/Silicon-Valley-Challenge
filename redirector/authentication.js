var animationStarted = false;

/* We could also have used auth.onStateChanged, but that doesn't get called in disconnections
*/

checkConnectionEvery2Seconds();

function checkConnectionEvery2Seconds() {
    setTimeout(function () {
        checkConnectionEvery2Seconds();
    }, 1000);

    var connectedRef = database.ref(".info/connected");
    connectedRef.on("value", function (snap) {
        console.log(snap);
        if (snap.val()) {
            if (auth.currentUser) location.href = "/signed-in/index.html";
            else location.href = "/signin/index.html";
        }
    });
}