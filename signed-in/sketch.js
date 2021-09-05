/*                                              
                        |   |
                        |---| |--| | |  __
                        |   | |--| | | |  |
                        |   | |___ | | |__|

Hello !!!

This it the Ultimate Exam Planner.

This app is a very basic prototype version until now.
This just includes the must-haves.
The newer version will come soon.

The full-fledge version of this app includes a lot more features than this one.
It will also include study related tools like Shared Canvas (for team work with friends), To-do manager (For task management), File Sharers (Sharing study files with a team), etc.

Hope this helps you in your daily-life and lessens your issues !!

Thanks for veiwing The Ultimate Exam Planner.
Hope you will like it.



*/


var userName, submitSbjctsBtn;
var inputSubjectBoxes = [];
var commonSubjects = ["English", "हिन्दी", "Science", "Social Studies", "Information Technology (Computers)", "Deutsch (German)", "Français (French)"];
var addedOtherInptBoxShown = false;
var planTypeAnswers = [
    "Aggressive Start, Light End (Recommended)",
    "Even Plan, stays equal effort everyday",
    "Light Start, Aggressive End <br> (Not recommended for people who find difficulty in studying)",
    "Random",
    "Aggressive + Light - One day tough, next day easy"
];
var defaultNoOfDaysLeft = 21;
var directlyAtHome = false;

// These elements won't be seen until we appendChild it in th body.
var removableBr1 = document.createElement("br");
removableBr1.id = "r-br1";
var removableBr2 = document.createElement("br");
removableBr2.id = "r-br2";

var currentFormInfo = document.createElement("p");
currentFormInfo.id = "current-form-info";
currentFormInfo.hidden = true;
currentFormInfo.innerHTML = "Click on each subject that you wish to add to your plan. <br> You need not click on the checkbox, you can easily click on the name";
document.body.appendChild(currentFormInfo);

showHTMLAnimation();

function showOtherInputSubjectBox() {
    var exisitingInputBoxIsEmpty;

    for (const j in inputSubjectBoxes) exisitingInputBoxIsEmpty = inputSubjectBoxes[j].value === "";

    if (!exisitingInputBoxIsEmpty) {
        var inputSubjectBox = document.createElement("input");
        inputSubjectBox.type = "text";
        inputSubjectBox.placeholder = "| Add Other Subject |";
        inputSubjectBoxes.push(inputSubjectBox);

        // Remving some elements because we have to put them after the input box, and we won't be able to position them exactly as html does, so, we remove them and add another one.
        for (const k in arguments) subjectSelectorDiv.removeChild(arguments[k]);

        subjectSelectorDiv.removeChild(removableBr1);
        subjectSelectorDiv.removeChild(removableBr2);

        // Adding all the elements to the body
        subjectSelectorDiv.appendChild(inputSubjectBox);
        // Adding OtherBtn and Submit Button
        subjectSelectorDiv.appendChild(removableBr1);
        subjectSelectorDiv.appendChild(removableBr2);
        createOtherBtn();

        subjectSelectorDiv.appendChild(document.createElement("br"));
        subjectSelectorDiv.appendChild(document.createElement("br"));
        createSubmitSbjctsBtn();
    }
    // Higlighting the already existing input box
    inputSubjectBoxes[inputSubjectBoxes.length - 1].focus();
}

function showWelcome() {
    database.ref("Users/" + auth.currentUser.uid + "/name").get().then((data) => {
        if (data.exists()) {
            userName = data.val();

            document.getElementById("my-name").innerText = "Welcome, " + userName;
            currentFormInfo.hidden = false;
            createSubjectSelector();
        }
    });
}

function showHTMLAnimation() {
    setTimeout(function () {
        document.body.style.transition = ".6s";
        document.body.style.transform = "scale(1.6)";
    }, 100);
}