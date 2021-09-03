var choseSubjects = [];
var allCheckBoxes = [];

function createSubjectSelector() {
    for (var i in commonSubjects) {
        /*
            IMPORTANT: 
            -----> We could have used the below code, but the label.for doesn't work.
            -----> I even tried it using docuemnt.getElementId(<<label-id>>).for = ...;
            -----> but that too didn't work.
            -----> So I am defining the html structure in the uncommented way.
            
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "checkbox" + parseInt(i);
            label = document.createElement("label");
            label.for = checkbox.id;
            label.id = "label" + label.for;
            label.innerText = commonSubjects[i];
        */

        // Making all the elements
        var subject = commonSubjects[i];
        var id = "checkbox" + parseInt(i);
        var div = document.createElement('div');
        div.id = "div-check" + i;
        div.innerHTML = `
            <label for="` + id + `" class="checkbox-elt">
            ` + subject + `
            </label>
            <input type="checkbox" id=` + id + ` class="checkbox-elt">
        `;
        document.getElementById("select-sbjcts").appendChild(div);
        document.getElementById("select-sbjcts").appendChild(document.createElement("br"));
        allCheckBoxes.push(document.getElementById(id));

        if (parseInt(i) + 1 === commonSubjects.length) {
            createOtherBtn();
            document.body.appendChild(removableBr1);
            document.body.appendChild(removableBr2);
            createSubmitSbjctsBtn();
        }
    }
}

function createOtherBtn() {
    otherBtn = document.createElement("input");
    otherBtn.type = "button";
    otherBtn.value = "Add other subject";
    otherBtn.addEventListener("click", () => {
        if (!addedOtherInptBoxShown) {
            var info = document.createElement("p");
            info.innerText = "You can leave the boxes blank if you wish to change your mind for adding another subject";
            document.body.appendChild(info);
            addedOtherInptBoxShown = true;
        }
        showOtherInputSubjectBox(otherBtn, submitSbjctsBtn);
    });
    document.body.appendChild(otherBtn);
}

function createSubmitSbjctsBtn() {
    submitSbjctsBtn = document.createElement("input");
    submitSbjctsBtn.type = "submit";
    submitSbjctsBtn.value = "Submit";
    submitSbjctsBtn.addEventListener("click", () => {
        var noOfCheckBoxes = 0;
        for (const l in allCheckBoxes) {
            const chkBox = allCheckBoxes[l];
            console.log(chkBox, commonSubjects[l]);
            if (chkBox.checked) {
                choseSubjects.push(chkBox.labels[0].innerText);
                noOfCheckBoxes += 1;
            }
        }
        if ((choseSubjects[0] !== undefined && choseSubjects[0] !== "") || noOfCheckBoxes > 0) {
            for (const m in inputSubjectBoxes) {
                const searchBox = inputSubjectBoxes[m];
                choseSubjects.push(searchBox.value);
            }
            createSubjectRatingTable(choseSubjects);
        }
        else alert("Please choose at least one subject");
    });
    document.body.appendChild(submitSbjctsBtn);
}

function createSubjectRatingTable(allSubjects) {
    var tableDiv = document.createElement("div");
    tableDiv.innerHTML = `
        <table border="2px">
            <thead>
                <tr>
                    <th>
                        Subject
                    </th>
                    <th>
                        Ratings
                    </th>
                    <th>
                        All details
                    </th>
                </tr>
            </thead>
            <tbody id="body-of-rating-table"></tbody>
        </table>
    `;
    document.body.appendChild(tableDiv);

    console.log(allSubjects);
    for (const n in allSubjects) {
        const subject = allSubjects[n];
        if (subject === "") continue;

        var subjectTrDiv = document.createElement("tr");
        subjectTrDiv.id = subject + "-tr";
        subjectTrDiv.innerHTML = `
            <td>
                ` + subject + `
                <br>
                <button id="cancelBtn-` + subject + `" style="border: none; background: none"> </button>
            </td>
            <td>
                <table border="2px" style="background-color: yellow; color: red">
                    <thead>
                        <tr>
                            <th>
                                Difficulty
                            </th>
                            <th>
                                Star
                            </th>
                        </tr>
                    </thead>
                    <tbody style="background-color: black">
                        <tr style="color: lawngreen">
                            <td>
                                1. No worries..
                            </td>
                            <td>
                                <input type="radio" name="rating-` + subject + `">
                            </td>
                        </tr>
                        <tr style="color: lightcyan">
                            <td>
                                2. Easy
                            </td>
                            <td>
                                <input type="radio" name="rating-` + subject + `">
                            </td>
                        </tr>
                        <tr style="color: yellow;" >
                            <td>
                                3. Normal
                            </td>
                            <td>
                                <input type="radio" name="rating-` + subject + `" checked="true">
                            </td>
                        </tr>
                        <tr style="color: darkorange">
                            <td>
                                4. Difficult
                            </td>
                            <td>
                                <input type="radio" name="rating-` + subject + `">
                            </td>
                        </tr>
                        <tr style="color: orangered">
                            <td>
                                5. Impossible!! <br> (We'll make it possible)
                            </td>
                            <td>
                                <input type="radio" name="rating-` + subject + `">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>
                <label for="no-of-ch-` + subject + `">
                    No of ch. in syllabus:
                </label>
                <input type="number" min=1 id="no-of-ch-` + subject + `" value=5 />
                <br><br>
                <label for="time-for-each-ch-` + subject + `">
                    No of hours in average for each chapter:
                </label>
                <input type="number" min=1 id="time-for-each-ch-` + subject + `" value=2 />
            </td>
        `;

        var cancelImg = document.createElement("img");
        cancelImg.src = "delete.png ";
        cancelImg.width = 30;

        document.getElementById("body-of-rating-table").appendChild(subjectTrDiv);
        document.getElementById("cancelBtn-" + subject).appendChild(cancelImg);
    }
    createSubmitRatingBtn();
}

function createSubmitRatingBtn() {
    submitRtngBtn = document.createElement("input");
    submitRtngBtn.type = "submit";
    submitRtngBtn.value = "Submit";
    submitRtngBtn.addEventListener("click", () => {
        askForWhenIsTheExam();
        choosePlanType();
    });
    document.body.appendChild(submitRtngBtn);
}

function askForWhenIsTheExam() {
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createElement("br"));

    var info = document.createElement("p");
    info.innerText = "Select the date for when you want to complete your target. Default is set to 3 wks after.";

    var dateSelector = document.createElement("input");
    dateSelector.type = "date";

    document.body.appendChild(info);
    document.body.appendChild(dateSelector);
    dateSelector.id = "a";
    defaultDate = new Date(Date.now() + defaultNoOfDaysLeft * 24 * 60 * 60 * 1000);
    var year, month, date;
    // No Of Days Left For The Exam * hrs/pd * mins/ph * secs/pm * millis/ps

    year = defaultDate.getFullYear();
    month = defaultDate.getMonth();
    date = defaultDate.getDate();

    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    dateSelector.value = year + "-" + month + "-" + date;
}

function choosePlanType() {
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createElement("br"));

    var info = document.createElement("p");
    info.innerText = "Choose the type of the plan you want.";
    document.body.appendChild(info);

    for (var p in planTypeAnswers) {
        var radioForPlanType = document.createElement("div");
        radioForPlanType.innerHTML = `
            <input type="radio" name="choose-plan-type" id="choose-plan-type-` + p + `" />
            <label for="choose-plan-type-` + p + `">` + planTypeAnswers[p] + `</label>
            <br>
        `;
        document.body.appendChild(radioForPlanType);
        console.log(p, parseInt(p), parseInt(p) === 0);
        if (parseInt(p) === 0) document.getElementById("choose-plan-type-0").checked = true;
    }

    lableFor_firstExamLastCheckBox = document.createElement("input");
    lableFor_firstExamLastCheckBox.innerText = "Study the first exam";
    document.body.appendChild(lableFor_firstExamLastCheckBox);

    firstExamLastCheckBox = document.createElement("input");
    firstExamLastCheckBox.type = "checkbox";
    document.body.appendChild(firstExamLastCheckBox);
}