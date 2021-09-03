var userName, submitSbjctsBtn;
var inputSubjectBoxes = [];
var commonSubjects = ["English", "हिन्दी", "Science", "Social Studies", "Information Technology (Computers)", "Deutsch (German)", "Français (French)"];
var addedOtherInptBoxShown = false;
var planTypeAnswers = [
    "Aggressive Start, Light End (Recommended)",
    "Even Plan, stays equal effort everyday",
    "Light Start, Aggressive End",
    "Random",
    "Aggressive + Light - One day tough, next day easy"
];
var defaultNoOfDaysLeft = 21;

// These elements won't be seen until we appendChild it in th body.
var removableBr1 = document.createElement("br");
removableBr1.id = "r-br1";
var removableBr2 = document.createElement("br");
removableBr2.id = "r-br2";

function showOtherInputSubjectBox() {
    var exisitingInputBoxIsEmpty;

    for (const j in inputSubjectBoxes) exisitingInputBoxIsEmpty = inputSubjectBoxes[j].value === "";

    if (!exisitingInputBoxIsEmpty) {
        var inputSubjectBox = document.createElement("input");
        inputSubjectBox.type = "text";
        inputSubjectBox.placeholder = "| Add Other Subject |";
        inputSubjectBoxes.push(inputSubjectBox);

        // Remving some elements because we have to put them after the input box, and we won't be able to position them exactly as html does, so, we remove them and add another one.
        for (const k in arguments) document.body.removeChild(arguments[k]);

        document.body.removeChild(removableBr1);
        document.body.removeChild(removableBr2);

        // Adding all the elements to the body
        document.body.appendChild(inputSubjectBox);
        // Adding OtherBtn and Submit Button
        document.body.appendChild(removableBr1);
        document.body.appendChild(removableBr2);
        createOtherBtn();

        document.body.appendChild(document.createElement("br"));
        document.body.appendChild(document.createElement("br"));
        createSubmitSbjctsBtn();
    }
    // Higlighting the already existing input box
    inputSubjectBoxes[inputSubjectBoxes.length - 1].focus();
}

function showWelcome() {
    userName = document.getElementById("inpt-name").value;
    if (userName) {
        document.getElementById("initial-form").hidden = true;
        document.getElementById("my-name").innerText = "Welcome, " + userName;
        document.getElementById("sbjct-info").hidden = false;
        createSubjectSelector();
    }
    else alert("Please enter a valid name.");
}

// var star = document.createElement("img");
// star.src = "star.jpg";
// star.width = 20;
// star.alt = "star";