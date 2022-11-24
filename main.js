let wordList=['מטפלת', 'רופאה', 'אבירה', 'קופים', 'תלמיד', 'לכתוב', 'רשימה', 'תרשים', 'ברחתי', 'עבודה', "שריפה", "מפלצת", "למידה", "השלמה", "כפתור", 'מקפיא', 'מעלית', 'מסכים', 'גלידה', 'שמיכה'];
let row = 1;
let col = 5;

const buttonArr = document.querySelectorAll('button');
const wordRows = document.querySelectorAll('.word-row');

let wordForGame = wordList[Math.floor(Math.random()*wordList.length)];
let chosenWord = convert(wordForGame);
let gameOver = false;




buttonArr.forEach((e) => {
   e.addEventListener('click', function () {
       keyEvent(e.attributes["data-key"].value)
   });
});

function convert(word) {
    let reversed = '';

    for (let i = 4; i >= 0; i--){
        reversed += word[i];
    }

    return reversed;
}
function checkWord() {
    const words = wordRows[row - 1].querySelectorAll('.word');
    let correctLetters = 0;

    words.forEach((e,index) => {
        const indexOfChosenWord = chosenWord.indexOf(e.innerText);
        console.log(indexOfChosenWord + " = index1");
            if (indexOfChosenWord === index) {
                e.classList.add('correct-word');
                correctLetters++;
            } else if (indexOfChosenWord >= 0) {
                e.classList.add('present-word');
            } else {
                e.classList.add('incorrect-word');
            }
    });

    if (correctLetters === 5){
        gameOver = true;
        let winLabel = document.querySelector("label");
        winLabel.innerText = "זכית!"
    } else if (row === 6) {
        gameOver = true;
        let label = document.querySelector("label");
        label.innerText = "הפסדת!, המילה הייתה: " + wordForGame;

    }
}


function isWordValid() {
    let label = document.querySelector("label");

    if (col > 0) {
        label.innerText = "המילה פחות מ-5 תווים"
        setTimeout(function () {
            label.innerText = '';
        },1000);
    } else {
        checkWord();
        row += 1;
        col = 5;

    }
}

function enterLetter(key) {
    if (col > 0) {
        wordRows[row - 1].querySelectorAll('.word')[col - 1].innerText = key;
        col -= 1;
    }
}


function deleteLetter() {
   const letterSearch= wordRows[row - 1].querySelectorAll('.word');
    for (let i = 0; i < letterSearch.length; i++){
        const letterIndex = letterSearch[i];
        if (letterIndex.innerText !== ''){
            letterIndex.innerText = '';
            col+= 1;
            break;
        }
    }
}


function keyEvent(key) {
    if (!gameOver) {
        if (key.toLowerCase() === 'enter') {
            isWordValid();
        } else if (key.toLowerCase() === 'del') {
            deleteLetter();
        } else {
            enterLetter(key);
        }
    } else {
        let finish = document.querySelector("label");
        finish.innerText = '.' + 'המשחק נגמר';
    }
}