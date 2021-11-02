var animationStarted = false;
var plottedPlanData = false;

/* We could also have used auth.onStateChanged, but that doesn't get called in disconnections
*/

checkConnectionEvery2Seconds();

function checkConnectionEvery2Seconds() {
    setTimeout(function () {
        checkConnectionEvery2Seconds();
    }, 1000);

    if (canvas) {
        canvas.width = window.outerWidth - 100;

        var connectedRef = database.ref(".info/connected");
        connectedRef.on("value", function (snap) {
            if (snap.val()) {
                animationStarted = false;
                canvas.elt.hidden = true;
                if (document.getElementById("logout-btn")) document.getElementById("logout-btn").hidden = false;
                if (document.getElementById("dnlad-btn")) document.getElementById("dnlad-btn").hidden = false;
                if (!plottedPlanData) {
                    getMyPlans();
                }
                if (!auth.currentUser) location.href = "https://peeyush0106.github.io/Silicon-Valley-Challenge/index.html";
            }
            else if (!animationStarted && !snap.val()) {
                setContinuousLoadingAnim();
                animationStarted = true;
                canvas.elt.hidden = false;
            }
        });
    }
}

function getMyPlans() {
    if (auth.currentUser) {
        database.ref("Users/" + auth.currentUser.uid + "/Plans").once("value", function (data) {
            if (data.exists()) {
                plottedPlanData = true;
                plotMyPlans(data);
            }
            else location.href = "https://peeyush0106.github.io/Silicon-Valley-Challenge/index.html";
        });
    }
}

function plotMyPlans(data) {
    if (!document.getElementById("main-plan-table")) {
        createPlanTable();
    }
    var allPlans = data.val();
    for (const u in allPlans) {
        const planData = allPlans[u].planData;
        console.log(planData);
        tableMade = true;
        var planDataLoops = 0;
        for (const v in planData) {
            planDataLoops += 1;
            const subjectData = planData[v];
            if (planDataLoops !== planData.length) {
                console.log(subjectData);
                plotPlanData(subjectData);
            }
            else break;
        }
    }
}

function setContinuousLoadingAnim() {
    setTimeout(function () {
        if (animationStarted) {
            showLoadingAnim();
            setContinuousLoadingAnim();
        }
    }, 30);
}