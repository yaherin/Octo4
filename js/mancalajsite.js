// JavaScript source code
var numofseeds;
var pitsnum; var seednum; //משתנים שלתוכם מקליד המשתמש את מספר הגומות והגולות הרצויות
var temppits; // משתנה עזר שנועד להכיל את מספר הגומות הרצויות, וככה לא משתבש אף פעם המספר המקורי
var turn = true; // לדעת איזה תור במשחק
var names = true; var start = true; // נועדו כדי לבדוק אם הייתה כבר את ההגדרה הראשונית של המשחק
var p1name = ""; var p2name = ""; // משתנים שנועדו להכיל את השמות של השחקנים
var AudioWin = new Audio('sounds/mancwin.wav'); // צליל נצחון
var AudioTie = new Audio('sounds/manctie.mp3'); // צליל תיקו
var mancala = []; // מערך מנקלה
var countpits; //נועד כדי לדעת באיזה גומה נמצאים כאשר מכניסים את הכדורים


function SetGameStart() { // פונקציה שבונה את מערך המשחק לפי רצון המשתמש
    pitsnum = prompt("How many pits do you want for each row? (3-8)");
    seednum = prompt("How many seeds do you want for each pit? (3-8)");
    if (pitsnum < 3 || pitsnum > 8 || seednum < 3 || seednum > 8 || pitsnum === "" || seednum === "") {
        alert("You must enter a number between 3 to 8");
        SetGameStart();
    }
    else {
        for (var row = 0; row < 2; row++) {
            var temp = [];
            temppits = Number(pitsnum);
            for (var col = 0; col < (temppits + 1); col++) {
                if ((row === 0 && col === temppits) || (row === 1 && col === 0))
                    temp.push(Number(0));
                else
                    temp.push(Number(seednum));
            }
            mancala.push(temp);
        }
        start = false;
    }
}



function SetPlayersNames() { // פונקציה שנותנת לשחקנים להקליד את שמם
    p1name = prompt("Player 1, please enter your name:");
    p2name = prompt("Player 2, please enter your name:");
    if (p1name != "" && p2name != "") {
        names = false;
        document.getElementById("turns").innerHTML = "It's your turn, " + p1name;
    }
    else {
        alert("You must enter your names!");
        SetPlayersNames();
    }

}

function changeBackground(color) { //פונקציה לצבע רקע
    document.body.style.background = color;
}
window.addEventListener("load", function () { changeBackground('lavender'); });


function BuildBoard() { // פונקציה שבונה את לוח המשחק
    if (start === true)
    SetGameStart();

    if (names === true)
        SetPlayersNames();

    var num = 0;
    //var textImgTag = "";
    var textspecial = "<div class='board'> <div class='player1name'>" + p1name + "</div>";
    var text = "";
   
  
    for (var row = 0; row < 2; row++) {
        text = text + "<div class='row'>";
        for (var col = 0; col < (temppits + 1); col++) {
            if ((row === 0 && col === temppits) || (row === 1 && col === 0)) {
                if (row === 0 && col === temppits) {
                    textspecial = textspecial + "<div class='containerStore'>" + "<div class='storep1' id='" + num + "' ; onclick='StartGame(this);'> <div class='label'>" + mancala[row][col] + " </div> </div> " + "</div>";

                }
                else if (row === 1 && col === 0) {
                    textspecial = textspecial + "<div class='containerStore'>" + "<div class='storep2' id='" + num + "' ; onclick='StartGame(this);'> <div class='label'>" + mancala[row][col] + "</div>  </div > " + "</div>";
                }
                num++;
            }
            else {
                text = text + "<div class='pit' id='" + num + "' ;' onclick='StartGame(this);'> <div class='label'>" + mancala[row][col] + "</div> </div > ";
                num++;
            }

            

        }
        text = text + "</div>";

    }
    text = text + "<div class='player2name'>" + p2name + "</div>" + "</div>";
    document.getElementById("Start").innerHTML = textspecial + text;

    var whichseed = 0; // משתנה שנועד לזיהוי כל גולה וגולה
    var i = 0; // משתנה שנועד לזיהוי כל גומה וגומה
    // פועל בעצם כמו num למעלה
    for (var row = 0; row < 2; row++) {
        for (var col = 0; col < (temppits + 1); col++) {
            var tempnum = mancala[row][col]; // משתנה לדעת כמה גולות יש בגומה ספציפית
            if (tempnum != 0) {
                AddSeed(tempnum, i, whichseed);
                whichseed += tempnum;
            }
            i++;

        }
    }


}



function AddSeed(seed, whichpit, whichseed) { // פונקציה שמוסיפה את מספר הגולות שאמורות להיות בגומה
    for (var i = 0; i < seed; i++) {

        var pitwidth = document.getElementById(whichpit).clientWidth;
        var pitheight = document.getElementById(whichpit).clientHeight;

        document.getElementById(whichpit).innerHTML += "<div class='seed' id='s" + whichseed + "'></div>"; // הוספה של גולה 

        document.getElementById("s" + whichseed).style.top = getRandomNumber(40, pitheight-50) + "px"; // הגדרת המיקום של הגולה באופן רנדומלי
        document.getElementById("s" + whichseed).style.left = getRandomNumber(15, pitwidth - 50) + "px"; // הגדרת המיקום של הגולה באופן רנדומלי

        document.getElementById("s" + whichseed).style.backgroundColor = "rgb(" + getRandomNumber(0, 255) + "," + getRandomNumber(0, 255) + "," + getRandomNumber(0, 255) + ")";
        // הגדרת הצבע של הגולה באופן רנדומלי
        document.getElementById("s" + whichseed).style.zIndex = i; // נועד בשביל שהגולות יוכלו לשבת אחת על השנייה
        
        whichseed++;


    }
}

function getRandomNumber(low, high) { // פונקציה שמחזירה ערך רנדומלי בתחום מוגדר של מספרים (כולל)
    var r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
}



function StartGame(currentThis) { //המשחק
    var CurrentId = currentThis.id;
    var CurrentRow = Math.floor(CurrentId / (temppits+1));
    var CurrentCol = CurrentId % (temppits + 1);

    if (turn && mancala[CurrentRow][CurrentCol] != 0 && CurrentRow == 0 && CurrentCol != temppits) { 
        TurnPlayer1(CurrentId); //תור שחקן 1
        turn = !turn; // העברת תור לאחר מכן


    }
    else if (!turn && mancala[CurrentRow][CurrentCol] != 0 && CurrentRow == 1 && CurrentCol != 0) {
        TurnPlayer2(CurrentId); // תור שחקן 2
        turn = !turn; // העברת תור לאחר מכן

    }
    IsEndGame(); // בדיקה אם נגמר המשחק לפי הכללים

}

function TurnPlayer1(CurrentId) { // תור שחקן 1
    document.getElementById("turns").innerHTML = "It's your turn, " + p2name;
    var CurrentRow = Math.floor(CurrentId / (temppits+1));
    var CurrentCol = CurrentId % (temppits+1);
    var tempseed = mancala[CurrentRow][CurrentCol]; // משתנה שמכיל את מספר הגולות בגומה שנלחצה
    var numseedend = 0; //משתנה שנועד לעלות באחד כדי לדעת מתי לסיים את ההעברה של האבנים
    mancala[CurrentRow][CurrentCol] = 0; // איפוס הגומה שנלחצה
    while (numseedend != tempseed) {
        while (CurrentCol < temppits) { //התקדמות לעבר הקופה
            CurrentCol++;
            mancala[CurrentRow][CurrentCol] += 1;
            numseedend++;
            if (numseedend === tempseed) {
                if (mancala[CurrentRow][CurrentCol] - 1 == 0 && mancala[CurrentRow + 1][CurrentCol + 1] != 0 && CurrentCol != temppits) {
                    mancala[0][temppits] += mancala[CurrentRow + 1][CurrentCol+1] + 1;
                    mancala[CurrentRow][CurrentCol] = 0;
                    mancala[CurrentRow + 1][CurrentCol+1] = 0;
                   // בדיקה אם הייתה העברה של גולה למקום ריק. אם כן תתבצע אכילה של הגולות של השחקן השני שנמצאות בצד שלו 'באותה' העמודה
                }
                break;
            }
        }

        if (numseedend == tempseed && CurrentCol != 6) 
            break;
        

        if (CurrentCol === temppits) { // הגעה לקופה
            if (numseedend == tempseed) { // השחקן יקבל תור נוסף אם הגולה האחרונה שלו נפלה בקופה
                turn = !turn;
                alert(p1name + " gets another turn!");
                document.getElementById("turns").innerHTML = "It's your turn, " + p1name;
                break;
            }
            CurrentRow++;

            while (CurrentCol > 0) {//התקדמות נגד הקופה
                mancala[CurrentRow][CurrentCol] += 1;
                CurrentCol--;
                numseedend++;
                if (numseedend == tempseed)
                    break;
            }
        }

        if (CurrentCol == 1) { // חזרה לשורה הראשונה, שהיא בעצם ה"צד" של השחקן הראשון
            CurrentCol = CurrentCol - 2;
            CurrentRow--;
        }

    }
    
}

function TurnPlayer2(CurrentId) { // שחקן 2
    document.getElementById("turns").innerHTML = "It's your turn, " + p1name;
    var CurrentRow = Math.floor(CurrentId / (temppits+1));
    var CurrentCol = CurrentId % (temppits+1);
    var tempseed = mancala[CurrentRow][CurrentCol];
    mancala[CurrentRow][CurrentCol] = 0;
    var numseedend = 0;
    while (numseedend != tempseed) {
        while (CurrentCol > 0) { //התקדמות לעבר הקופה
            CurrentCol--;
            mancala[CurrentRow][CurrentCol] += 1;
            numseedend++;
            if (numseedend == tempseed) {
                if (mancala[CurrentRow][CurrentCol] - 1 == 0 && mancala[CurrentRow - 1][CurrentCol-1] != 0 && CurrentCol != 0) {
                    mancala[1][0] += mancala[CurrentRow - 1][CurrentCol-1] + 1;
                    mancala[CurrentRow][CurrentCol] = 0;
                    mancala[CurrentRow - 1][CurrentCol-1] = 0;
                    // בדיקה אם הייתה העברה של גולה למקום ריק. אם כן תתבצע אכילה של הגולות של השחקן השני שנמצאות בצד שלו 'באותה' העמודה
                }
                break;
            }
        }

        if (numseedend == tempseed && CurrentCol != 0) 
            break;

        if (CurrentCol == 0) { // הגעה לקופה
            if (numseedend == tempseed) { // אם הגולה האחרונה נפלה בקופה השחקן מקבל תור נוסף
                turn = !turn;
                alert(p2name + " gets another turn!");
                document.getElementById("turns").innerHTML = "It's your turn, " + p2name;
                break;
            }
            CurrentRow--;
            while (CurrentCol < (temppits-1)) {//התקדמות נגד הקופה
                mancala[CurrentRow][CurrentCol] += 1;
                CurrentCol++;
                numseedend++;
                if (numseedend == tempseed)
                    break;
            }
        }

        if (CurrentCol == (temppits-1)) { // חזרה לצד שלו
            CurrentCol = CurrentCol + 2;
            CurrentRow++;
        }


    }
}

function IsEndGame() { // בדיקה האם נגמר המשחק
    var nonep1 = true; // האם נגמרו לשחקן הראשון כל הגולות בצד שלו
    var nonep2 = true;// האם נגמרו לשחקן השני כל הגולות בצד שלו
    var i, k;
    for (i = 0; i < 2; i++) {
        for (k = 0; k < (temppits+1); k++) {
            if (i == 0 && k != temppits && mancala[i][k] != 0)
                nonep1 = false;
            if (i == 1 && k != 0 && mancala[i][k] != 0)
                nonep2 = false;
        }
    }
    if (nonep1 || nonep2) {
        if (nonep1) {
            for (i = 1; i < (temppits+1); i++) {
                mancala[1][0] += mancala[1][i];
                mancala[1][i] = 0;
            }
        }
        else if (nonep2) {
            for (i = 0; i < temppits; i++) {
                mancala[0][temppits] += mancala[0][i];
                mancala[0][i] = 0;
            }
        }

        if (mancala[0][temppits] > mancala[1][0]) { // נצחון שחקן 1
            alert("Player 1 won!");
            document.getElementById("turns").innerHTML = "<div class='winner'> Hurray! " + p1name + " won! </div>";
            AudioWin.play();
            document.getElementById("Start").outerHTML = " ";
            document.getElementById("End").outerHTML += "</br> <div class='containerend'>" + "<div class='endfont'>  <div class='player2name'>" + p2name + "</div>" + " captured " + mancala[1][0] + " seeds </div>" + "</div>";
            document.getElementById("End").outerHTML += "</br> <div class='containerend'>" + "<div class='endfont'>  <div class='player1name'>" + p1name + "</div>" + " captured " + mancala[0][temppits] + " seeds </div>" + "</div>";

            
        }
        else if (mancala[0][temppits] == mancala[1][0]) { // תיקו
            alert("Tie!");
            document.getElementById("turns").innerHTML = "<div class='winner'> Oh! We have a tie! </div>";
            AudioTie.play();
            document.getElementById("Start").outerHTML = "  ";
            document.getElementById("End").outerHTML += "<h1 style='text-align:center; color:purple'> Both of you captured " + mancala[0][temppits] + " seeds </h1 > ";
        }
        else { // נצחון שחקן 2
            alert("Player 2 won!");
            document.getElementById("turns").innerHTML = "<div class='winner'> Hurray! " + p2name + " won! </div>";
            AudioWin.play();
            document.getElementById("Start").outerHTML = "  ";
            document.getElementById("End").outerHTML += "</br> <div class='containerend'>" + "<div class='endfont'>  <div class='player1name'>" + p1name + "</div>" + " captured " + mancala[0][temppits] + " seeds </div>" + "</div>";
            document.getElementById("End").outerHTML += "</br> <div class='containerend'>" + "<div class='endfont'>  <div class='player2name'>" + p2name + "</div>" + " captured " + mancala[1][0] + " seeds </div>" + "</div>";
       
        }
            


    }

}