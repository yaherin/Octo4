// JavaScript source code
var turn = true; // -> true - Player 1 turn, false - Player 2 turn
var AudioWin = new Audio('sounds/win.wav');
var FirstClick = true; 
var legalMove = false;
var numofeatenpieces1 = 0;
var numofeatenpieces2 = 0;
var names = true;
var p1name;
var p2name;


function SetPlayersNames() {
    p1name = prompt("Player 1, please enter your name:");
    p2name = prompt("Player 2, please enter your name:");
    if (p1name != "" && p2name != "") {
        names = false;
        document.getElementById("turns").innerHTML = "<img src='img/p1.jpg' width='30' height='30'>" + "It's your turn, " + p1name + "<img src='img/p1.jpg' width='30' height='30'>";
    }
    else {
        alert("You must enter your names!");
        SetPlayersNames();
    }

}

var firstThis;
var images = ["img/light.jpg", "img/empty.jpg", "img/p1.jpg", "img/p2.jpg", "img/king1.jpg","img/king2.jpg"];
var damka =
    [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [3, 0, 3, 0, 3, 0, 3, 0],
        [0, 3, 0, 3, 0, 3, 0, 3],
        [3, 0, 3, 0, 3, 0, 3, 0],

    ];


function changeBackground(color) { //פונקציה לצבע רקע
    document.body.style.background = color;
}
window.addEventListener("load", function () { changeBackground('teal'); });

function BuildBoard() {
    //var clr = "";

    var num = 0;
    var textImgTag = "";
    var text = "<table border='1' align='center'style='background-color:brown'>";
    var sh, am;
    for (sh = 0; sh < damka.length; sh++) {
        text = text + "<tr>";
        for (am = 0; am < damka.length; am++) {
            textImgTag = "<img src='" + images[damka[sh][am]] + "' />";
            text = text + "<td id='" + num + "' onclick='SwitchPic(this);'>" + textImgTag + "</td>";
            num++;
        }
        text = text + "</tr>";

    }
        text = text + "</table>";
        document.getElementById("Start").innerHTML = text;
   
    if (names == true)
        SetPlayersNames();



}
function King(secondClickElement) {
    var secondCurrentId = secondClickElement.id;
    var secondRow = Math.floor(secondCurrentId / 8);
    var secondCol = secondCurrentId % 8;
    if (damka[secondRow][secondCol] == 2 && secondRow == 7)
        damka[secondRow][secondCol] = 4;
    if (damka[secondRow][secondCol] == 3 && secondRow == 0)
        damka[secondRow][secondCol] = 5;

}

function SwitchPic(currentThis) {
    var CurrentId = currentThis.id;
    var CurrentRow = Math.floor(CurrentId / 8);
    var CurrentCol = CurrentId % 8;
    if (FirstClick) {
        if ((isTherePlaceToMove(currentThis) || IsTherePlaceToMoveQueen(currentThis)) &&
            (turn && (damka[CurrentRow][CurrentCol] == 2 || damka[CurrentRow][CurrentCol] == 4) ||
                !turn && (damka[CurrentRow][CurrentCol] == 3 || damka[CurrentRow][CurrentCol] == 5))) {
            firstThis = currentThis;
            FirstClick = !FirstClick;
        }
        else {
            alert("Wrong first click! Choose again");
        }
     
    }
    else {
        if (IsLegalMove(firstThis, currentThis) || isLegalMoveQueen(firstThis, currentThis)) {

            FirstClick = !FirstClick;
            turn = !turn;
            if (turn) 
                document.getElementById("turns").innerHTML = "<img src='img/p1.jpg' width='30' height='30'>" + "It's your turn, " + p1name + "<img src='img/p1.jpg' width='30' height='30'>";
            else
                document.getElementById("turns").innerHTML = "<img src='img/p2.jpg' width='30' height='30'>" + "It's your turn, " + p2name + "<img src='img/p2.jpg' width='30' height='30'>";
            King(currentThis);
            IsWin();
        }
        else {
            alert("Wrong second click! Choose again");
        }
        
        
    }
}

function isLegalMoveQueen(firstClickElement, secondClickElement) {
    var firstId = firstClickElement.id;
    var secondId = secondClickElement.id;
    var firstRow = Math.floor(firstId / 8);
    var firstCol = firstId % 8;
    var secondRow = Math.floor(secondId / 8);
    var secondCol = secondId % 8;
    if ((damka[firstRow][firstCol] == 4 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol - 1 || secondCol == firstCol + 1) && (secondRow == firstRow - 1 || secondRow == firstRow + 1)) ||
        damka[firstRow][firstCol] == 5 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol - 1 || secondCol == firstCol + 1) && (secondRow == firstRow - 1 || secondRow == firstRow + 1)){
        var temp = damka[firstRow][firstCol];
        damka[firstRow][firstCol] = damka[secondRow][secondCol];
        damka[secondRow][secondCol] = temp;
        return true;
    }
    //אכילות
    if (damka[firstRow][firstCol] == 4) {
        if (firstRow != 7 && (damka[firstRow + 1][firstCol + 1] == 3 || damka[firstRow + 1][firstCol + 1] == 5) && secondRow == firstRow + 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow + 1][firstCol + 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces2++;
            return true;
        }
        if (firstRow != 7 && (damka[firstRow + 1][firstCol - 1] == 3 || damka[firstRow + 1][firstCol - 1] == 5) && secondRow == firstRow + 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow + 1][firstCol - 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces2++;
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol + 1] == 3 || damka[firstRow - 1][firstCol + 1] == 5) && secondRow == firstRow - 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow - 1][firstCol + 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces2++;
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol - 1] == 3 || damka[firstRow - 1][firstCol - 1] == 5) && secondRow == firstRow - 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow - 1][firstCol - 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces2++;
            return true;
        }
    }
    if (damka[firstRow][firstCol] == 5) {
        if (firstRow != 7 && (damka[firstRow + 1][firstCol + 1] == 2 || damka[firstRow + 1][firstCol + 1] == 4) && secondRow == firstRow + 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow + 1][firstCol + 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces1++;
            return true;
        }
        if (firstRow != 7 && (damka[firstRow + 1][firstCol - 1] == 2 || damka[firstRow + 1][firstCol - 1] == 4) && secondRow == firstRow + 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow + 1][firstCol - 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces1++;
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol + 1] == 2 || damka[firstRow - 1][firstCol + 1] == 4) && secondRow == firstRow - 2 && secondCol == firstCol + 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow - 1][firstCol + 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces1++;
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol - 1] == 2 || damka[firstRow - 1][firstCol - 1] == 4) && secondRow == firstRow - 2 && secondCol == firstCol - 2 && damka[secondRow][secondCol] == 1) {
            var temp = damka[firstRow][firstCol];
            damka[firstRow][firstCol] = 1;
            damka[firstRow - 1][firstCol - 1] = 1;
            damka[secondRow][secondCol] = temp;
            numofeatenpieces1++;
            return true;
        }
    }
 
    return false;
}
function IsLegalMove(firstClickElement, secondClickElement) {
    var firstId = firstClickElement.id;
    var secondId = secondClickElement.id;
    var firstRow = Math.floor(firstId / 8);
    var firstCol = firstId % 8;
    var secondRow = Math.floor(secondId / 8);
    var secondCol = secondId % 8;
    if (damka[firstRow][firstCol] == 2 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol - 1 || secondCol == firstCol + 1) && secondRow == firstRow + 1
        ||
        damka[firstRow][firstCol] == 3 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol - 1 || secondCol == firstCol + 1) && secondRow == firstRow - 1 ) { // בדיקות תזוזה
        var temp = damka[firstRow][firstCol];
        damka[firstRow][firstCol] = damka[secondRow][secondCol];
        damka[secondRow][secondCol] = temp;
        return true;
    }
    else { //בדיקות אכילה
        if (damka[firstRow][firstCol] == 2 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol + 2 || secondCol == firstCol - 2) && secondRow == firstRow + 2) {

            if (secondCol == firstCol + 2 && (damka[firstRow + 1][firstCol + 1] == 3 || damka[firstRow + 1][firstCol + 1] == 5)) {
                var temp = damka[firstRow][firstCol];
                damka[firstRow][firstCol] = 1;
                damka[firstRow + 1][firstCol + 1] = 1;
                damka[secondRow][secondCol] = temp;
                numofeatenpieces2++;
                return true;
            }
            if (secondCol == firstCol - 2 && (damka[firstRow + 1][firstCol - 1] == 3 || damka[firstRow + 1][firstCol - 1] == 5)) {
                var temp = damka[firstRow][firstCol];
                damka[firstRow][firstCol] = 1;
                damka[firstRow + 1][firstCol - 1] = 1;
                damka[secondRow][secondCol] = temp;
                numofeatenpieces2++;
                return true;
            }
        }
        else if (damka[firstRow][firstCol] == 3 && damka[secondRow][secondCol] == 1 && (secondCol == firstCol + 2 || secondCol == firstCol - 2) && secondRow == firstRow - 2) {

            if (secondCol == firstCol + 2 && (damka[firstRow - 1][firstCol + 1] == 2 || damka[firstRow - 1][firstCol + 1] == 4)) {
                var temp = damka[firstRow][firstCol];
                damka[firstRow][firstCol] = 1;
                damka[firstRow - 1][firstCol + 1] = 1;
                damka[secondRow][secondCol] = temp;
                numofeatenpieces1++;
                return true;
            }
            if (secondCol == firstCol - 2 && (damka[firstRow - 1][firstCol - 1] == 2 || damka[firstRow - 1][firstCol - 1] == 4)) {
                var temp = damka[firstRow][firstCol];
                damka[firstRow][firstCol] = 1;
                damka[firstRow - 1][firstCol - 1] = 1;
                damka[secondRow][secondCol] = temp;
                numofeatenpieces1++;
                return true;
            }
        }
        else
            return false;
    }
}


function isTherePlaceToMove(firstClickElement) { //פונקציה שבודקת אם יש בכלל מקום לעבור אליו
    var firstId = firstClickElement.id;          
    var firstRow = Math.floor(firstId / 8);
    var firstCol = firstId % 8;
    if (damka)
    if ((damka[firstRow][firstCol] == 2 &&
        (damka[firstRow + 1][firstCol - 1] == 1 || damka[firstRow + 1][firstCol + 1] == 1)) || 
        (damka[firstRow][firstCol] == 3 &&
        (damka[firstRow - 1][firstCol - 1] == 1 || damka[firstRow - 1][firstCol + 1] == 1))) {
        return true;
    }
    else if (damka[firstRow][firstCol] == 2 &&
        (((damka[firstRow + 1][firstCol + 1] == 3 || damka[firstRow + 1][firstCol + 1] === 5) && damka[firstRow + 2][firstCol + 2] === 1)
            ||
        ((damka[firstRow + 1][firstCol - 1] === 3 || damka[firstRow + 1][firstCol-1] === 5) && damka[firstRow + 2][firstCol - 2] === 1)))
        return true;
    else if (damka[firstRow][firstCol] === 3 && (((damka[firstRow - 1][firstCol + 1] === 2 || damka[firstRow - 1][firstCol + 1] === 4) && damka[firstRow - 2][firstCol + 2] === 1)
        ||
        ((damka[firstRow - 1][firstCol - 1] === 2 || damka[firstRow - 1][firstCol-1] === 4) && damka[firstRow - 2][firstCol - 2] === 1)))
        return true;
   
    return false;

}
function IsTherePlaceToMoveQueen(firstClickElement) {
    var firstId = firstClickElement.id;
    var firstRow = Math.floor(firstId / 8);
    var firstCol = firstId % 8;
    if (damka[firstRow][firstCol] == 4 || damka[firstRow][firstCol] == 5) {
        if (firstRow == 0 && (damka[firstRow + 1][firstCol + 1] == 1 || damka[firstRow + 1][firstCol - 1] == 1))
            return true;
        if (firstRow == 7 && (damka[firstRow - 1][firstCol + 1] == 1 || damka[firstRow - 1][firstCol - 1] == 1))
            return true;
        if (firstRow != 7 && firstRow!=0 && (damka[firstRow + 1][firstCol + 1] == 1 || damka[firstRow + 1][firstCol - 1] == 1 ||
            damka[firstRow - 1][firstCol + 1] == 1 || damka[firstRow - 1][firstCol - 1] == 1))
            return true;
    }
    if (damka[firstRow][firstCol] == 4) {
        if (firstRow != 7 && (damka[firstRow + 1][firstCol + 1] == 3 || damka[firstRow + 1][firstCol + 1] == 5) && damka[firstRow + 2][firstCol + 2] == 1) {
            return true;
        }
        if (firstRow != 7 && (damka[firstRow + 1][firstCol - 1] == 3 || damka[firstRow + 1][firstCol - 1] == 5) && damka[firstRow + 2][firstCol - 2] == 1) {
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol + 1] == 3 || damka[firstRow - 1][firstCol + 1] == 5) && damka[firstRow - 2][firstCol + 2] == 1) {
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol - 1] == 3 || damka[firstRow - 1][firstCol - 1] == 5) && damka[firstRow - 2][firstCol - 2] == 1) {
            return true;
        }
    }
    if (damka[firstRow][firstCol] == 5) {
        if (firstRow != 7 && (damka[firstRow + 1][firstCol + 1] == 2 || damka[firstRow + 1][firstCol + 1] == 4) && damka[firstRow + 2][firstCol + 2] == 1) {
            return true;
        }
        if (firstRow != 7 && (damka[firstRow + 1][firstCol - 1] == 2 || damka[firstRow + 1][firstCol - 1] == 4) && damka[firstRow + 2][firstCol - 2] == 1) {
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol + 1] == 2 || damka[firstRow - 1][firstCol + 1] == 4) && damka[firstRow - 2][firstCol + 2] == 1) {
            return true;
        }
        if (firstRow != 0 && (damka[firstRow - 1][firstCol - 1] == 2 || damka[firstRow - 1][firstCol - 1] == 4) && damka[firstRow - 2][firstCol - 2] == 1) {
            return true;
        }
    }
    return false;
}



function IsWin() {
    if (numofeatenpieces1 == 12) {
        document.getElementById("turns").innerHTML = "<div class='checkerswin'>" + p2name + " won!" + " </br> <img src='img/wincrown.png' />"+ "</div>";
        document.getElementById("Start").outerHTML = "";
        AudioWin.play();
    }
    if (numofeatenpieces2 == 12) {
        document.getElementById("turns").innerHTML = "<div class='checkerswin'>" + p1name + " won! " + " </br> <img src='img/wincrown.png' />"+ "</div>";
        document.getElementById("Start").outerHTML = "";
        AudioWin.play();
    }
    else {
        var noplacetomovep1 = true;
        var noplacetomovep2 = true;
        for (var i = 0; i < 8; i++) {
            for (var k = 0; k < 8; k++) {
                if ((damka[i][k] == 2 && isTherePlaceToMoveWin(i, k)) || (damka[i][k] == 4 && IsTherePlaceToMoveWinQueen(i, k)))
                    noplacetomovep1 = false;
                if ((damka[i][k] == 3 && isTherePlaceToMoveWin(i, k)) || (damka[i][k] == 5 && IsTherePlaceToMoveWinQueen(i, k)))
                    noplacetomovep2 = false;
            }
        }
        if (noplacetomovep1) {
            document.getElementById("turns").innerHTML = "<div class='checkerswin'>" + p2name + " won!" + " </br> <img src='img/wincrown.png' />" + "</div>";
            document.getElementById("Start").innerHTML = "";
            AudioWin.play();
           
        }
        if (noplacetomovep2) {
            document.getElementById("turns").innerHTML = "<div class='checkerswin'>" + p1name + " won!" + " </br> <img src='img/wincrown.png' />" + "</div>";
            document.getElementById("Start").innerHTML = "";
            AudioWin.play(); 
          
        }
    }

}

function isTherePlaceToMoveWin(i, k) { 
    if ((damka[i][k] == 2 && i != damka.length - 1 && k != 0 && damka[i + 1][k - 1] == 1)) {
        return true;
    }
    if ((damka[i][k] == 2 && i != damka.length - 1 && k != damka.length - 1 && damka[i + 1][k + 1] == 1)) {
        return true;
    }
    if ((damka[i][k] == 3 && i != 0 && k != damka.length - 1 && damka[i - 1][k + 1] == 1)) {
        return true;
    }
    if ((damka[i][k] == 3 && i != 0 && k != 0 && damka[i - 1][k - 1] == 1)) {
        return true;
    }
    if ((damka[i][k] == 2 && i != damka.length - 2 && i != damka.length - 1 &&
        k != 1 && k != 0 && (damka[i + 1][k - 1] == 3 || damka[i + 1][k - 1] == 5) &&
        damka[i + 2][k - 2] == 1))
        return true;
    if ((damka[i][k] == 2 && i != damka.length - 2 && i != damka.length - 1 &&
        k != damka.length - 2 && k != damka.length - 1 &&
        (damka[i + 1][k + 1] == 3 || damka[i + 1][k + 1] == 5) &&
        damka[i + 2][k + 2] == 1))
        return true;
    if ((damka[i][k] == 3 && i != 1 && i != 0 &&
        k != damka.length - 2 && k != damka.length - 1 &&
        (damka[i - 1][k + 1] == 3 || damka[i - 1][k + 1] == 5) &&
        damka[i - 2][k + 2] == 1))
        return true;
    if ((damka[i][k] == 3 && i != 1 && i != 0 &&
        k != 1 && k != 0 &&
        (damka[i - 1][k - 1] == 3 || damka[i - 1][k - 1] == 5) &&
        damka[i - 2][k - 2] == 1))
        return true;
    return false;

}
function IsTherePlaceToMoveWinQueen(i, k) {
    if (damka[i][k] == 4 || damka[i][k] == 5) {
        if (i != damka.length - 1 && k != damka.length - 1 && damka[i + 1][k + 1] === 1)
            return true;
        if (i != damka.length - 1 && k != 0 && damka[i + 1][k - 1] === 1)
            return true;
        if (i != 0 && k != damka.length - 1 && damka[i - 1][k + 1] === 1)
            return true;
        if (i != 0 && k != 0 && damka[i - 1][k - 1]===1)
            return true;

    }
    if (damka[i][k] == 4) {
        if (i != damka.length - 2 && i != damka.length - 1 && k != damka.length - 1 && k != damka.length-2 && (damka[i + 1][k + 1] == 3 || damka[i + 1][k + 1] == 5) && damka[i + 2][k + 2] == 1) {
            return true;
        }
        if (i != damka.length - 2 && i != damka.length - 1 && k != 0 && k != 1 && (damka[i + 1][k - 1] == 3 || damka[i + 1][k - 1] == 5) && damka[i + 2][k - 2] == 1) {
            return true;
        }
        if (i != 0 && i != 1 && k != damka.length - 1 && k != damka.length - 2 && (damka[i - 1][k + 1] == 3 || damka[i - 1][k + 1] == 5) && damka[i - 2][k + 2] == 1) {
            return true;
        }
        if (i != 0 && i != 1 && k != 0 && k != 1 && (damka[i - 1][k - 1] == 3 || damka[i - 1][k - 1] == 5) && damka[i - 2][k - 2] == 1) {
            return true;
        }
    }
    if (damka[i][k] == 5) {
        if (i != damka.length - 2 && i != damka.length - 1 && k != damka.length - 1 && k != damka.length - 2 && (damka[i + 1][k + 1] == 2 || damka[i + 1][k + 1] == 4) && damka[i + 2][k + 2] == 1) {
            return true;
        }
        if (i != damka.length - 2 && i != damka.length - 1 && k != 0 && k != 1 && (damka[i + 1][k - 1] == 2 || damka[i + 1][k - 1] == 4) && damka[i + 2][k - 2] == 1) {
            return true;
        }
        if (i != 0 && i != 1 && k != damka.length - 1 && k != damka.length - 2 && (damka[i - 1][k + 1] == 2 || damka[i - 1][k + 1] == 4) && damka[i - 2][k + 2] == 1) {
            return true;
        }
        if (i != 0 && i != 1 && k != 0 && k != 1 && (damka[i - 1][k - 1] == 2 || damka[i - 1][k - 1] == 4) && damka[i - 2][k - 2] == 1) {
            return true;
        }
    }
    return false;
}








































//הסברים:

//תנאים שמופיעים בבדיקה של האם יש אפשרות למהלך חוקי:
// - הלחיצה הראשונה היא שחקן והשנייה היא משבצת שחורה
// - הלחיצה אכן באלכסון ורק במקום חוקי

// פונקציה שבודקת אם יש מקום לזוז אליו:
// * הסבר לתנאי האחרון: ישנה בעייתיות בבחירת שחקן שנמצא למשל בתוך מקום שסביבו יש שחקנים אחרים. 

//פונקציה נוספת שבודקת אם אכילה היא חוקית, ואם לא אז זה חוזר ללחיצה הראשונה

