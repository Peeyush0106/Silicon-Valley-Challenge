document.getElementById("initial-form").addEventListener("submit", (e) => {
    e.preventDefault();
});

function addChosenSubjectsToArray(eltId) {
    document.getElementById(eltId).addEventListener("click", () => {
        var checkbox = document.getElementById(eltId);

        if (checkbox.checked) {
            choseSubjects.push(allCheckBoxes[parseInt(checkbox.id.slice(8))].labels[0].innerText);
        }
        else {
            for (const o in allCheckBoxes) {
                const checkBox_local = allCheckBoxes[o];
                 
            }
        }
        console.log(choseSubjects);
    });
}