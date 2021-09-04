var schedule;

class Subject {
    constructor(name, difficultyLevel, chapterCount, timePerChapter) {
        this.name = name;
        this.difficultyLevel = difficultyLevel;
        this.chapterCount = chapterCount;
        this.timePerChapter = timePerChapter;
        this.totalTime = this.chapterCount * this.timePerChapter;
        this.daysCount;
        this.startDate;
        this.endDate;
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
    var totalDays = 0;
    for (const t in subjects) {
        const subjectObj = subjects[t];
        totalHours += subjectObj.totalTime;
        subjectObj.daysCount = Math.ceil(subjectObj.totalTime / eachDayTime);
        totalDays += subjectObj.daysCount;
    }
    console.log(totalHours);
    var daysToCompleteSyllabus = Math.ceil(totalHours / eachDayTime);
    
    console.log(daysToCompleteSyllabus);

    var targetDateObj = Date.parse(targetDate);
    // var days = 1000 * 60 * 60 * 24;
    // var daysSince1970 = Math.round(d / days);
    // var startDateInDays = daysSince1970 - daysToCompleteSyllabus + 1;
    // var startDate = new Date(startDateInDays * 86400 * 1000);
    var startDate = addDaysToDate(targetDateObj, 1 - totalDays);
    console.log(startDate);

    var runningStartDate = startDate;

    for(const x in subjects) {
        const subjectObj = subjects[x];
        subjectObj.startDate = runningStartDate;
        subjectObj.endDate = addDaysToDate(runningStartDate, subjectObj.daysCount - 1);
        runningStartDate = addDaysToDate(runningStartDate, subjectObj.daysCount);
    }
    console.log(subjects);
    schedule = subjects;
}

function addDaysToDate(dateObj, days) {
    //var d = Date.parse(date);
    const daysConst = 1000 * 60 * 60 * 24;
    var daysSince1970 = Math.round(dateObj / daysConst);
    var updatedDateInDays = daysSince1970 + days;
    return new Date(updatedDateInDays * 86400 * 1000);
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