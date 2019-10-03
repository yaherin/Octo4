// JavaScript source code
var timetable = [
    ["", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    ["0", "", "Computers", "", "", ""],
    ["1", "", "Hebrew", "Civics", "Computers", "Bible Class"],
    ["2", "", "Hebrew", "Civics", "Computers", "Bible Class"],
    ["3", "Math", "Literature", "PE", "Physics", "History"],
    ["4", "Math", "Literature", "History", "Physics", "Hebrew"],
    ["5", "PE", "Computers", "Physics", "History", "Math"],
    ["6", "History", "Computers", "Physics", "History", "Math"],
    ["7", "Civics", "History", "Computers", "Homeroom", ""],
    ["8", "Physics", "Math", "Computers", "Hebrew", ""],
    ["9", "Physics", "Math", "", "Chinese", ""],
    ["10", "Physics", "", "", "Chinese", ""],
    ["11", "", "", "", "Chinese", ""],
    ["12", "", "", "", "Chinese", ""],

];
function CreateMyTimeTable() {
    var text = "<table border='1' align='center'style='background-color:blue;color:white'>";
    for (var i = 0; i < 14; i++) {
        if (i == 0)
            text = text + "<tr  style='background - color: cadetblue'>";
        for (var k = 0; k < 6; k++) {
            if (timetable[i][k] == "Sunday" || timetable[i][k] == "Monday" || timetable[i][k] == "Tuesday" || timetable[i][k] == "Wednesday" || timetable[i][k] == "Thursday") {
                text = text + "<td style = 'background-color:darkseagreen'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "0" || timetable[i][k] == "1" || timetable[i][k] == "2" || timetable[i][k] == "3" || timetable[i][k] == "4" || timetable[i][k] == "5" || timetable[i][k] == "6" || timetable[i][k] == "7" || timetable[i][k] == "8" || timetable[i][k] == "9"
                || timetable[i][k] == "10" || timetable[i][k] == "11" || timetable[i][k] == "12") {
                text = text + "<td style = 'background-color:darkseagreen'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "") {
                text = text + " <td style='background-color:cadetblue'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "Computers") {
                text = text + " <td style='background-color:indigo'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "Hebrew") {
                text = text + " <td style='background-color:crimson'>" + "<a href='https://he.wiktionary.org/wiki/עמוד_ראשי'>" +
                    timetable[i][k] +"</a>" + "</td>";
            }
            if (timetable[i][k] == "Math") {
                text = text + " <td style='background-color:lightpink'>" + "<a href='https://bagrut.gool.co.il/'>" +
                    timetable[i][k] + "</a>" + "</td>";
            }
            if (timetable[i][k] == "Chinese") {
                text = text + " <td style='background-color:palevioletred'>" + "<a href='https://www.yellowbridge.com/'>" +
                    timetable[i][k] + "</a>" + "</td>";
            }
            if (timetable[i][k] == "PE") {
                text = text + " <td style='background-color:rosybrown'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "History") {
                text = text + " <td style='background-color:darkorange'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "Civics") {
                text = text + " <td style='background-color:cornflowerblue'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "Physics") {
                text = text + " <td style='background-color:lightseagreen'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "Literature") {
                text = text + " <td style='background-color:darkgreen'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "Bible Class") {
                text = text + " <td style='background-color:slateblue'>" + timetable[i][k] + "</td>";
            }
            if (timetable[i][k] == "Homeroom") {
                text = text + " <td style='background-color:goldenrod'>" + timetable[i][k] + "</td>";
            }



            
        }
        text = text + "</tr>";
    }
    text = text + "</table>";
    document.getElementById("Start").innerHTML = text;
}
function changeBackground(color) { //פונקציה לצבע רקע
    document.body.style.background = color;
}
window.addEventListener("load", function () { changeBackground('midnightblue'); });