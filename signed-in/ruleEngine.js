class Subject {
    constructor(name, difficultyLevel, chapterCount, timePerChapter) {
        this.name = name;
        this.difficultyLevel = difficultyLevel;
        this.chapterCount = chapterCount;
        this.timePerChapter = timePerChapter;
        this.totalTime = this.chapterCount * this.timePerChapter;
    }

    getTotalTime() {
        return this.totalTime;
    }
}

function runRuleEngine(){   
    var subjects = calculateTotalNoOfHours();
    var targetDate = document.getElementById("target-date").value;
    var eachDayTime = document.getElementById("time-each-day-input").value;

    var totalHours = 0;
    for (const t in subjects) {
        const subjectObj = subjects[t];
        totalHours += subjectObj.totalTime;
    }
    console.log(totalHours);
    var daysToCompleteSyllabus = totalHours / eachDayTime;
    if (totalHours % eachDayTime > 0) {
        daysToCompleteSyllabus += 1;
    }
    console.log(daysToCompleteSyllabus);

    var d = Date.parse("2021-09-24");

    //var startDate = 

}

function calculateTotalNoOfHours() {
    var subjects = [];
    for (const r in choseSubjects) {
        const subject = choseSubjects[r];
        var chTime = document.getElementById("time-for-each-ch-" + subject).value;
        var chCount = document.getElementById("no-of-ch-" + subject).value;
        var difficultyLevel = 3;
        var difficultyLevelElements = document.getElementsByName("rating-" + subject);
        for (const s in difficultyLevelElements) {
            var difficultyLevelElement = difficultyLevelElements[s];
            if (difficultyLevelElement.checked) {                
                console.log(difficultyLevelElement.value);
                difficultyLevel = difficultyLevelElement.value;
                break;
            }
        }
        var subjectObj = new Subject(subject, difficultyLevel, chCount, chTime);
        console.log(subjectObj.totalTime);
        subjects.push(subjectObj);
    }
    console.log(subjects);
    return subjects;
}